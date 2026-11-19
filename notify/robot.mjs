// Boothkeepr invoice autopilot. Runs after notify.mjs when it found someone whose invoice is due (robot-due.json).
// For each person it opens the real Boothkeepr site in a headless browser, signed in with a one-off token, and lets
// the app itself build, save and share the invoice (robotRun in the app). Then it writes the result to that
// person's outbox for their iPhone Shortcut to send, and tells them. Nothing personal is printed to the log.
import fs from 'node:fs';
import admin from 'firebase-admin';
import webpush from 'web-push';
import { chromium } from 'playwright';
import { melbNow, invoiceWeekStart } from './logic.mjs';

const SITE = process.env.BOOTHKEEPR_URL || 'https://punit-code.github.io/socialkeepr-invoices/';
const VAPID_PUBLIC = 'BL4N88QauaPsao5-d21dYEzxsA1ZJ_Tk-8j8R6XrFJeEqLfQb2qHCJWft4BPxa4Mk9KI7GF6rOyYQY7HG8IreJE';
const sa = process.env.FIREBASE_SERVICE_ACCOUNT, vpriv = process.env.VAPID_PRIVATE_KEY;
if (!sa || !fs.existsSync('robot-due.json')) { console.log('Nothing for the autopilot.'); process.exit(0); }
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(sa)) });
if (vpriv) webpush.setVapidDetails('https://punit-code.github.io/socialkeepr-invoices/', VAPID_PUBLIC, vpriv);
const db = admin.firestore();
const money = n => '$' + (Math.round((Number(n) || 0) * 100) / 100).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const due = JSON.parse(fs.readFileSync('robot-due.json', 'utf8')).filter(u => /^[A-Za-z0-9]{1,128}$/.test(u)).slice(0, 20);

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let made = 0;
for (const uid of due) {
  const ref = db.collection('users').doc(uid);
  let r;
  try {
    const token = await admin.auth().createCustomToken(uid, { robot: true });
    const ctx = await browser.newContext({ timezoneId: 'Australia/Melbourne', locale: 'en-AU' });
    const page = await ctx.newPage();
    try {
      await page.goto(SITE + '#robot=' + token, { waitUntil: 'load', timeout: 90000 });
      await page.waitForFunction(() => window.__robotResult, null, { timeout: 6 * 60000 });
      r = await page.evaluate(() => window.__robotResult);
    } finally { await ctx.close(); }
  } catch (e) { r = { status: 'error', reasons: ['The invoice could not be made this time (' + String(e && e.message || e).slice(0, 80) + ').'] }; }
  const ws = r.ws || invoiceWeekStart(melbNow().iso);
  const drop = await ref.collection('private').doc('drop').get(); const outKey = drop.exists && /^[A-Za-z0-9_-]{32,64}$/.test(drop.data().out || '') ? drop.data().out : '';
  if (outKey && r.status !== 'exists') {
    await db.collection('outbox').doc(outKey).set({ status: String(r.status || 'error'), ws, no: Number(r.no) || 0, total: Number(r.total) || 0, text: String(r.text || '').slice(0, 3000),
      reasons: (r.reasons || []).slice(0, 10).map(x => String(x).slice(0, 300)), notes: (r.notes || []).slice(0, 10).map(x => String(x).slice(0, 300)), at: Date.now() });
  }
  await ref.collection('server').doc('robot').set({ ws, runAt: Date.now(), status: String(r.status || 'error'), out: outKey, sentTold: false });
  // tell the person
  const settings = (await ref.collection('private').doc('settings').get()).data() || {}; const ap = settings.autopilot || {};
  const no = r.no, tot = money(r.total), why = (r.reasons || [])[0] || '';
  const note = r.status === 'send' ? { title: 'Invoice ' + no + ' made: ' + tot, body: (r.events || 0) + ' events, ' + (r.receipts || 0) + ' receipts. It goes to your boss on WhatsApp at 9am. Tap to check it first.' }
    : r.status === 'ask' ? { title: 'Invoice ' + no + ' is ready: ' + tot, body: 'Tap to check it and send it on WhatsApp.' }
    : r.status === 'hold' ? { title: 'Invoice ' + no + ' needs a quick check', body: why + ' Tap to check it, then send with one tap.' }
    : r.status === 'exists' ? null
    : { title: 'Invoice autopilot hit a problem', body: why || 'Tap to make it by hand.' };
  if (note) {
    const key = 'autopilot-' + ws + '-' + (r.status || 'x');
    await ref.collection('notifications').doc(key.replace(/[^A-Za-z0-9_.-]/g, '_')).set({ title: note.title, body: note.body, kind: 'autopilot', view: 'autopilot', at: Date.now(), read: false });
    if (vpriv) for (const sub of (await ref.collection('push').get()).docs) {
      try { await webpush.sendNotification({ endpoint: sub.data().endpoint, keys: sub.data().keys }, JSON.stringify({ title: note.title, body: note.body, view: 'autopilot', tag: 'autopilot', kind: 'autopilot' }), { TTL: 6 * 3600, urgency: 'high' }); }
      catch (e) { if (e.statusCode === 404 || e.statusCode === 410) await sub.ref.delete(); }
    }
  }
  console.log('autopilot:', r.status || 'error'); if (r.no) made++;
}
await browser.close();
console.log('Autopilot finished: ' + made + ' invoice(s) made.');
