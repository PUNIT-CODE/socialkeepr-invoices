// Boothkeepr notification sender. Runs on GitHub Actions every 10 minutes.
// Needs two repository secrets: FIREBASE_SERVICE_ACCOUNT (JSON) and VAPID_PRIVATE_KEY.
// It never prints personal details (client names, phone numbers) to the log.
import admin from 'firebase-admin';
import webpush from 'web-push';
import { melbNow, due, csvRows, jobsFromGrid, tabNames, addDays } from './logic.mjs';

const VAPID_PUBLIC = 'BL4N88QauaPsao5-d21dYEzxsA1ZJ_Tk-8j8R6XrFJeEqLfQb2qHCJWft4BPxa4Mk9KI7GF6rOyYQY7HG8IreJE';
const sa = process.env.FIREBASE_SERVICE_ACCOUNT, vpriv = process.env.VAPID_PRIVATE_KEY;
if (!sa || !vpriv) { console.log('Secrets not set yet (FIREBASE_SERVICE_ACCOUNT, VAPID_PRIVATE_KEY). Nothing sent.'); process.exit(0); }
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(sa)) });
webpush.setVapidDetails('https://punit-code.github.io/socialkeepr-invoices/', VAPID_PUBLIC, vpriv);
const db = admin.firestore();
const now = melbNow(process.env.FAKE_NOW ? new Date(process.env.FAKE_NOW) : new Date());

const sheetCache = new Map();
async function sheetJobs(link) {
  const m = String(link || '').match(/\/d\/(?:e\/)?([a-zA-Z0-9_-]{20,})/); if (!m) return null; const id = m[1];
  if (sheetCache.has(id)) return sheetCache.get(id);
  const months = []; const d0 = new Date(now.iso + 'T00:00:00Z');
  for (const k of [-1, 0, 1]) { const d = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth() + k, 1)); months.push([d.getUTCFullYear(), d.getUTCMonth()]); }
  let all = [], spill = [];
  for (const [y, mo] of months) {
    const key = y + '-' + String(mo + 1).padStart(2, '0');
    for (const tab of tabNames(y, mo)) {
      try {
        const res = await fetch('https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(tab));
        if (!res.ok) break; const jobs = jobsFromGrid(csvRows(await res.text())); const inMonth = jobs.filter(j => j.date.slice(0, 7) === key);
        if (inMonth.length && inMonth.length >= jobs.length / 2) { all = all.concat(inMonth); spill = spill.concat(jobs.filter(j => j.date.slice(0, 7) !== key)); break; }
      } catch (e) { break; }
    }
  }
  // jobs a tab lists for the neighbouring month (e.g. 1 Dec at the bottom of NOV26), unless that month's own tab has them
  const sk = j => j.date + '|' + String(j.client || '').toLowerCase().replace(/[^a-z]/g, '');
  const have = new Set(all.map(sk)); for (const j of spill) if (!have.has(sk(j))) { have.add(sk(j)); all.push(j); }
  sheetCache.set(id, all); return all;
}

let sentCount = 0, people = 0;
const users = await db.collection('users').get();
for (const u of users.docs) {
  const uid = u.id; const ref = db.collection('users').doc(uid);
  try {
    const [settingsSnap, invSnap, pushSnap, stateSnap] = await Promise.all([ref.collection('private').doc('settings').get(), ref.collection('invoices').select('weekStart').get(), ref.collection('push').get(), ref.collection('server').doc('state').get()]);
    const settings = settingsSnap.exists ? settingsSnap.data() : {};
    const jobs = await sheetJobs(settings.sheetLink); if (!jobs) continue; people++;
    const plans = {};
    for (const d of [now.iso, addDays(now.iso, -1)]) { const p = await ref.collection('private').doc('plan-' + d).get(); if (p.exists) { try { plans[d] = JSON.parse(p.data().json || 'null'); } catch (e) {} } }
    const st = stateSnap.exists ? stateSnap.data() : {};
    const out = due({ now, jobs, prefs: settings.notify, invoices: invSnap.docs.map(d => d.data()), plans, route: settings.route, state: { sent: st.sent || {}, jobs: st.jobs ? JSON.parse(st.jobs) : null } });
    // "Send me a test reminder" from the Notifications page (requested in the last 2 hours, not yet sent)
    const testAt = settings.notify && typeof settings.notify.testAt === 'number' ? settings.notify.testAt : 0;
    let testDone = st.testDone || 0;
    if (testAt > testDone && Date.now() - testAt < 2 * 3600e3) {
      const tmr = addDays(now.iso, 1); const nTmr = jobs.filter(j => j.date === tmr).length; const nToday = jobs.filter(j => j.date === now.iso).length;
      out.notes.unshift({ key: 'test-' + testAt, kind: 'test', view: 'notify', title: 'Boothkeepr test reminder',
        body: 'Reminders reach this device. Run sheet: ' + nToday + ' job' + (nToday === 1 ? '' : 's') + ' today, ' + nTmr + ' tomorrow.' });
      testDone = testAt;
    }
    for (const n of out.notes) {
      const doc = { title: n.title, body: n.body, kind: n.kind, view: n.view || '', at: Date.now(), read: false };
      await ref.collection('notifications').doc(n.key.replace(/[^A-Za-z0-9_.-]/g, '_').slice(0, 140)).set(doc);
      for (const sub of pushSnap.docs) {
        try { await webpush.sendNotification({ endpoint: sub.data().endpoint, keys: sub.data().keys }, JSON.stringify({ title: n.title, body: n.body, view: n.view || '', tag: n.kind }), { TTL: n.kind === 'event' ? 1800 : 6 * 3600, urgency: n.kind === 'event' || n.kind === 'test' ? 'high' : 'normal' }); sentCount++; }
        catch (e) { if (e.statusCode === 404 || e.statusCode === 410) await sub.ref.delete(); else console.log('push failed', e.statusCode || e.message); }
      }
    }
    await ref.collection('server').doc('state').set({ sent: out.state.sent, jobs: JSON.stringify(out.state.jobs || {}), testDone, at: Date.now() });
    // tidy: keep in-app notifications for 30 days
    const old = await ref.collection('notifications').where('at', '<', Date.now() - 30 * 864e5).limit(50).get(); for (const d of old.docs) await d.ref.delete();
  } catch (e) { console.log('person skipped:', e.message); }
}
console.log(`Checked ${people} account(s) at ${now.iso} ${Math.floor(now.mins / 60)}:${String(now.mins % 60).padStart(2, '0')} Melbourne; ${sentCount} push message(s) sent.`);
process.exit(0);
