// Boothkeepr → Apple Calendar (iCloud). Writes each run sheet job into a "Boothkeepr jobs" calendar in the
// person's iCloud account over CalDAV, using an app-specific password they made for Boothkeepr.
// Only events Boothkeepr made are ever changed or removed. Nothing personal is printed to the log.
import crypto from 'node:crypto';
import { TZ, addDays } from './logic.mjs';
import { eventIdOf, eventFor } from './calendar.mjs';

const ROOT = 'https://caldav.icloud.com';
const CAL_NAME = 'Boothkeepr jobs';

// ---- times: Melbourne wall clock → UTC (so no time-zone block is needed in the file) ----
const fmt = new Intl.DateTimeFormat('en-AU', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
function offsetAt(ms) { const p = Object.fromEntries(fmt.formatToParts(new Date(ms)).map(x => [x.type, x.value])); return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - ms; }
export function melbToUtc(local) { // 'YYYY-MM-DDTHH:MM:SS'
  const [d, t] = local.split('T'); const [y, mo, da] = d.split('-').map(Number); const [h, mi] = t.split(':').map(Number);
  const guess = Date.UTC(y, mo - 1, da, h, mi); let ms = guess - offsetAt(guess); ms = guess - offsetAt(ms); return new Date(ms);
}
const utcStamp = dt => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = s => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
function fold(line) { const out = []; let b = Buffer.from(line, 'utf8'); while (b.length > 74) { let n = 74; while (n > 0 && (b[n] & 0xc0) === 0x80) n--; out.push(b.subarray(0, n).toString('utf8')); b = Buffer.concat([Buffer.from(' '), b.subarray(n)]); } out.push(b.toString('utf8')); return out.join('\r\n'); }
export function icsFor(j) {
  const ev = eventFor(j); const uid = eventIdOf(j) + '@boothkeepr';
  const when = ev.start.dateTime ? ['DTSTART:' + utcStamp(melbToUtc(ev.start.dateTime)), 'DTEND:' + utcStamp(melbToUtc(ev.end.dateTime))]
    : ['DTSTART;VALUE=DATE:' + ev.start.date.replace(/-/g, ''), 'DTEND;VALUE=DATE:' + ev.end.date.replace(/-/g, '')];
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Boothkeepr//Run sheet//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', 'UID:' + uid, 'DTSTAMP:' + utcStamp(new Date()), ...when,
    'SUMMARY:' + esc(ev.summary), ...(ev.location ? ['LOCATION:' + esc(ev.location)] : []), 'DESCRIPTION:' + esc(ev.description), 'TRANSP:OPAQUE', 'X-BOOTHKEEPR:1', 'END:VEVENT', 'END:VCALENDAR'];
  return { id: eventIdOf(j), hash: ev.extendedProperties.private.h, body: lines.map(fold).join('\r\n') + '\r\n' };
}

// ---- CalDAV ----
function client(appleId, pw) {
  const auth = 'Basic ' + Buffer.from(appleId + ':' + pw).toString('base64');
  return async function dav(method, url, body, headers = {}) {
    const r = await fetch(url, { method, redirect: 'follow', headers: Object.assign({ Authorization: auth, 'User-Agent': 'Boothkeepr/1.0' }, body ? { 'Content-Type': headers.ct || 'application/xml; charset=utf-8' } : {}, headers.depth != null ? { Depth: String(headers.depth) } : {}), body });
    const text = await r.text();
    if (r.status === 401 || r.status === 403) throw Object.assign(new Error('icloud ' + r.status), { code: 'icloud-auth' });
    return { status: r.status, text, url: r.url || url };
  };
}
const hrefs = (xml, tag) => [...xml.matchAll(new RegExp('<(?:[a-zA-Z0-9]+:)?' + tag + '[^>]*>\\s*<(?:[a-zA-Z0-9]+:)?href[^>]*>([^<]+)<', 'g'))].map(m => m[1].trim());
const abs = (base, h) => new URL(h, base).toString();
async function findCalendar(dav) {
  const p1 = await dav('PROPFIND', ROOT + '/', '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:current-user-principal/></d:prop></d:propfind>', { depth: 0 });
  const principal = hrefs(p1.text, 'current-user-principal')[0]; if (!principal) throw Object.assign(new Error('no principal'), { code: 'icloud-failed' });
  const pu = abs(p1.url, principal);
  const p2 = await dav('PROPFIND', pu, '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav"><d:prop><c:calendar-home-set/></d:prop></d:propfind>', { depth: 0 });
  const home = abs(pu, hrefs(p2.text, 'calendar-home-set')[0] || ''); if (!/^https:/.test(home)) throw Object.assign(new Error('no home'), { code: 'icloud-failed' });
  const p3 = await dav('PROPFIND', home, '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:displayname/><d:resourcetype/></d:prop></d:propfind>', { depth: 1 });
  for (const resp of p3.text.split(/<\/(?:[a-zA-Z0-9]+:)?response>/)) {
    const h = (resp.match(/<(?:[a-zA-Z0-9]+:)?href[^>]*>([^<]+)</) || [])[1]; const name = (resp.match(/<(?:[a-zA-Z0-9]+:)?displayname[^>]*>([^<]*)</) || [])[1];
    if (h && name && name.trim() === CAL_NAME && /<(?:[a-zA-Z0-9]+:)?calendar(?:\s[^>]*)?\/>/.test(resp)) return { url: abs(home, h), made: false };
  }
  // not there yet: make it
  const url = abs(home, 'boothkeepr-jobs-' + crypto.randomBytes(4).toString('hex') + '/');
  const mk = await dav('MKCALENDAR', url, '<?xml version="1.0"?><c:mkcalendar xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav" xmlns:a="http://apple.com/ns/ical/"><d:set><d:prop><d:displayname>' + CAL_NAME + '</d:displayname><a:calendar-color>#B0127AFF</a:calendar-color><c:supported-calendar-component-set><c:comp name="VEVENT"/></c:supported-calendar-component-set></d:prop></d:set></c:mkcalendar>');
  if (mk.status !== 201 && mk.status !== 200) throw Object.assign(new Error('mkcalendar ' + mk.status), { code: 'icloud-nocal' });
  return { url, made: true };
}

/* cfg: settings.calendar; creds: {appleId, appPassword} (write-only doc); doc: private/calendar from last time.
   Returns null when nothing changed, else { result: new private/calendar doc, wipe: true when the saved password should be deleted }. */
export async function syncICloud({ cfg, creds, doc, jobs, today, force }) {
  doc = doc && doc.kind === 'icloud' ? doc : {}; const events = Object.assign({}, doc.events || {});
  const off = !cfg || !cfg.on || cfg.kind !== 'icloud';
  if (!creds || !creds.appleId || !creds.appPassword) return off ? null : { result: { kind: 'icloud', error: 'icloud-nocreds', at: Date.now(), events } };
  const dav = client(creds.appleId, creds.appPassword);
  try {
    if (off) { // turned off: take Boothkeepr's events out again (and the calendar, if Boothkeepr made it)
      if (doc.calUrl) { if (doc.made) await dav('DELETE', doc.calUrl); else for (const id of Object.keys(events)) await dav('DELETE', doc.calUrl + id + '.ics'); }
      return { result: { kind: 'icloud', off: true, at: Date.now() }, wipe: true };
    }
    const from = addDays(today, -14), to = addDays(today, 120);
    const want = new Map(); for (const j of jobs) if (j.date >= from && j.date <= to) { const x = icsFor(j); if (!want.has(x.id)) want.set(x.id, x); }
    const hash = crypto.createHash('sha1').update([...want.values()].map(x => x.id + x.hash).sort().join(',')).digest('hex').slice(0, 20);
    if (!force && !doc.error && doc.calUrl && doc.hash === hash && doc.appleId === creds.appleId) return null;
    let calUrl = doc.appleId === creds.appleId ? doc.calUrl : null, made = !!doc.made;
    if (calUrl) { const chk = await dav('PROPFIND', calUrl, '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:displayname/></d:prop></d:propfind>', { depth: 0 }); if (chk.status === 404) calUrl = null; }
    if (!calUrl) { const c = await findCalendar(dav); calUrl = c.url; made = c.made; Object.keys(events).forEach(k => delete events[k]); }
    let added = 0, changed = 0, removed = 0;
    for (const [id, x] of want) {
      if (events[id] === x.hash && !force) continue;
      const r = await dav('PUT', calUrl + id + '.ics', x.body, { ct: 'text/calendar; charset=utf-8' });
      if (r.status >= 300) throw Object.assign(new Error('put ' + r.status), { code: 'icloud-failed' });
      if (events[id]) changed++; else added++; events[id] = x.hash;
    }
    for (const id of Object.keys(events)) if (!want.has(id)) { const r = await dav('DELETE', calUrl + id + '.ics'); if (r.status < 300 || r.status === 404) { delete events[id]; removed++; } }
    return { result: { kind: 'icloud', appleId: creds.appleId, calUrl, made, events, hash, count: want.size, added, changed, removed, at: Date.now(), error: '' } };
  } catch (e) {
    return { result: Object.assign({}, doc, { kind: 'icloud', events, error: e.code || 'icloud-failed', at: Date.now() }) };
  }
}
