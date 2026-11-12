// Boothkeepr calendar sync: keeps a "Boothkeepr jobs" Google Calendar in step with the run sheet.
// The calendar belongs to the reminder service (the Firebase service account) and is shared with the person's
// Google account, so it shows in Google Calendar and in Apple Calendar once that Google account is added there.
// Nothing personal is printed to the log.
import crypto from 'node:crypto';
import { TZ, addDays, jobKey, parseClock, boothRange, hm } from './logic.mjs';

const API = 'https://www.googleapis.com/calendar/v3';
const DAY = 1440;
const S = (v, n) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n || 300);

// ---- what each job looks like in the calendar ----
const clockOf = (iso, mins) => { const d = addDays(iso, Math.floor(mins / DAY)); const m = ((mins % DAY) + DAY) % DAY; return d + 'T' + String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0') + ':00'; };
const styleOf = j => /glam/i.test(j.style || '') ? 'GLAM' : /print/i.test(j.style || '') ? 'PRINTSY' : S(j.style, 30).toUpperCase();
// Google Calendar event ids may only use a-v and 0-9
export const eventIdOf = j => 'bk' + crypto.createHash('sha1').update(jobKey(j)).digest('hex').slice(0, 30).replace(/[w-z]/g, c => String.fromCharCode(c.charCodeAt(0) - 6));
export function eventFor(j) {
  const br = boothRange(j.booth); const setup = parseClock(j.setup, true);
  const venue = S(j.venue, 120), addr = S(j.address || j.suburb, 200);
  const title = [S(j.client, 60) || 'Photo booth job', styleOf(j), S(j.event, 40)].filter(Boolean).join(' · ');
  const lines = [
    ['Booth', [styleOf(j), br ? hm(br.start) + ' – ' + hm(br.end).replace(' (next day)', '') : S(j.booth, 60)].filter(Boolean).join(', ')],
    ['Backdrop', S(j.backdrop, 80)], ['Set up from', S(j.setup, 60)], ['Guests arrive', S(j.arrival, 60)], ['Pick up', S(j.pickup, 80)],
    ['Phone', S(j.phone, 40)], ['Other contact', S(j.contact2, 120)], ['Attendant', S(j.staffNote, 60)], ['Props', S(j.props, 200)],
    ['Parking', S(j.parking, 200)], ['Album, glue & pen', S(j.album, 120)], ['Guests', S(j.guests, 60)], ['Notes', S(j.notes, 500)]
  ].filter(x => x[1]).map(x => x[0] + ': ' + x[1]);
  const ev = {
    summary: title,
    location: [venue && !/^home\b/i.test(venue) ? venue : '', addr].filter(Boolean).join(', '),
    description: lines.join('\n') + '\n\nFrom the run sheet in Boothkeepr. Changes on the run sheet show up here automatically.',
    extendedProperties: { private: { bk: '1' } }, transparency: 'opaque'
  };
  if (br) {
    // the calendar slot: an hour before the booth opens (set-up) until 30 minutes after it closes (pack-down);
    // if the venue only lets you in later than that, start then
    let start = br.start - 60; if (setup != null && setup > start && setup < br.start) start = setup;
    ev.start = { dateTime: clockOf(j.date, start), timeZone: TZ }; ev.end = { dateTime: clockOf(j.date, br.end + 30), timeZone: TZ };
  } else { ev.start = { date: j.date }; ev.end = { date: addDays(j.date, 1) }; }
  ev.extendedProperties.private.h = crypto.createHash('sha1').update(JSON.stringify([ev.summary, ev.location, ev.description, ev.start, ev.end])).digest('hex').slice(0, 16);
  return ev;
}

// ---- Google Calendar API, signed in as the service account ----
let tokenCache = null;
async function token(sa) {
  if (tokenCache && tokenCache.exp > Date.now() + 60000) return tokenCache.t;
  const now = Math.floor(Date.now() / 1000); const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = b64({ alg: 'RS256', typ: 'JWT' }) + '.' + b64({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/calendar', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 });
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(sa.private_key, 'base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + unsigned + '.' + sig });
  const d = await r.json(); if (!r.ok || !d.access_token) throw Object.assign(new Error('calendar sign-in failed'), { code: 'auth' });
  tokenCache = { t: d.access_token, exp: Date.now() + (d.expires_in || 3600) * 1000 }; return tokenCache.t;
}
async function api(sa, method, path, body) {
  const r = await fetch(API + path, { method, headers: { Authorization: 'Bearer ' + await token(sa), 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  if (r.status === 204) return null; const d = await r.json().catch(() => ({}));
  if (!r.ok) { const reason = (d.error && d.error.errors && d.error.errors[0] && d.error.errors[0].reason) || ''; const e = new Error('calendar ' + r.status + ' ' + reason); e.status = r.status; e.reason = reason; throw e; }
  return d;
}

/* Bring the person's calendar up to date.
   cfg: { on, email } from their settings; doc: what was saved last time (private/calendar); jobs: from the run sheet.
   Returns the new private/calendar doc, or null when there is nothing to save. */
export async function syncCalendar({ sa, cfg, doc, jobs, today, force }) {
  doc = doc || {};
  const email = S(cfg && cfg.email, 200).toLowerCase();
  if (!cfg || !cfg.on || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    if (doc.id) { try { await api(sa, 'DELETE', '/calendars/' + encodeURIComponent(doc.id)); } catch (e) { if (e.status !== 404 && e.status !== 410) throw e; } return { off: true, at: Date.now() }; }
    return null;
  }
  let id = doc.id, shared = doc.shareTo || '';
  try {
    let fresh = false;
    if (id) { try { await api(sa, 'GET', '/calendars/' + encodeURIComponent(id)); } catch (e) { if (e.status === 404) { id = null; shared = ''; } else throw e; } }
    if (!id) {
      const c = await api(sa, 'POST', '/calendars', { summary: 'Boothkeepr jobs', description: 'Photo booth jobs from the run sheet, kept up to date by Boothkeepr.', timeZone: TZ });
      id = c.id; fresh = true; shared = '';
    }
    // share it with the person's Google account (again if they changed the email)
    if (shared !== email) {
      if (shared) { try { await api(sa, 'DELETE', '/calendars/' + encodeURIComponent(id) + '/acl/' + encodeURIComponent('user:' + shared)); } catch (e) {} }
      await api(sa, 'POST', '/calendars/' + encodeURIComponent(id) + '/acl?sendNotifications=true', { role: 'owner', scope: { type: 'user', value: email } });
      shared = email; fresh = true;
    }
    const from = addDays(today, -14), to = addDays(today, 120);
    const want = new Map(); for (const j of jobs) if (j.date >= from && j.date <= to) { const eid = eventIdOf(j); if (!want.has(eid)) want.set(eid, eventFor(j)); }
    const hash = crypto.createHash('sha1').update([...want.keys()].sort().map(k => k + want.get(k).extendedProperties.private.h).join(',')).digest('hex').slice(0, 20);
    // nothing changed on the run sheet and the calendar was checked within 6 hours: leave it
    if (!fresh && !force && !doc.error && doc.hash === hash && doc.id === id && Date.now() - (doc.full || 0) < 6 * 3600e3) return null;
    const have = new Map(); let pageToken = '';
    do {
      const q = '?maxResults=2500&showDeleted=false&privateExtendedProperty=bk%3D1&timeMin=' + encodeURIComponent(from + 'T00:00:00Z') + '&timeMax=' + encodeURIComponent(addDays(to, 2) + 'T00:00:00Z') + (pageToken ? '&pageToken=' + pageToken : '');
      const r = await api(sa, 'GET', '/calendars/' + encodeURIComponent(id) + '/events' + q); (r.items || []).forEach(e => have.set(e.id, e)); pageToken = r.nextPageToken || '';
    } while (pageToken);
    let added = 0, changed = 0, removed = 0; const base = '/calendars/' + encodeURIComponent(id) + '/events/';
    for (const [eid, ev] of want) {
      const old = have.get(eid);
      if (!old) { try { await api(sa, 'POST', '/calendars/' + encodeURIComponent(id) + '/events', Object.assign({ id: eid }, ev)); } catch (e) { if (e.status === 409) await api(sa, 'PUT', base + eid, Object.assign({ status: 'confirmed' }, ev)); else throw e; } added++; }
      else if (((old.extendedProperties || {}).private || {}).h !== ev.extendedProperties.private.h) { await api(sa, 'PUT', base + eid, ev); changed++; }
    }
    for (const [eid, e] of have) if (!want.has(eid)) { const d = (e.start && (e.start.date || (e.start.dateTime || '').slice(0, 10))) || ''; if (d >= from && d <= to) { try { await api(sa, 'DELETE', base + eid); } catch (x) { if (x.status !== 404 && x.status !== 410) throw x; } removed++; } }
    return { id, email, shareTo: shared, hash, full: Date.now(), at: Date.now(), count: want.size, added, changed, removed, error: '' };
  } catch (e) {
    const error = e.reason === 'accessNotConfigured' || /has not been used|disabled/i.test(e.message) || (e.status === 403 && /accessNotConfigured|SERVICE_DISABLED/i.test(e.reason || '')) ? 'api-off' : e.code === 'auth' ? 'auth' : e.status === 403 ? 'denied' : 'failed';
    return Object.assign({}, doc, { id: id || null, shareTo: shared, error, at: Date.now() });
  }
}
