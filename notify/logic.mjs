// Boothkeepr notifications: works out which reminders are due for one person right now.
// Pure functions only (no network), so they can be tested with made-up data and times.
export const TZ = 'Australia/Melbourne';
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAYNAME = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY = 1440;

export function melbNow(date = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-AU', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date).map(x => [x.type, x.value]));
  return { iso: `${p.year}-${p.month}-${p.day}`, mins: +p.hour * 60 + +p.minute };
}
export const dateOf = iso => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
export const isoOf = d => d.toISOString().slice(0, 10);
export const addDays = (iso, n) => { const d = dateOf(iso); d.setUTCDate(d.getUTCDate() + n); return isoOf(d); };
const dow = iso => dateOf(iso).getUTCDay();
export const mondayOf = iso => addDays(iso, -((dow(iso) + 6) % 7));
export const invoiceWeekStart = iso => addDays(mondayOf(iso), -7);
const dayLabel = iso => { const d = dateOf(iso); return DOW[d.getUTCDay()] + ' ' + d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()]; };
const weekLabel = ws => { const we = addDays(ws, 6); const a = dateOf(ws), b = dateOf(we); return 'Mon ' + a.getUTCDate() + (a.getUTCMonth() !== b.getUTCMonth() ? ' ' + MONTHS[a.getUTCMonth()] : '') + ' – Sun ' + b.getUTCDate() + ' ' + MONTHS[b.getUTCMonth()]; };
export const hm = m => { m = Math.round(m); m = ((m % DAY) + DAY) % DAY; let h = Math.floor(m / 60), mi = m % 60; const ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12; return h + (mi ? ':' + String(mi).padStart(2, '0') : '') + ap; };
const S = (v, n = 120) => (v == null ? '' : String(v)).replace(/\s+/g, ' ').trim().slice(0, n);
const shopKey = s => String(s || '').toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim().split(' ').slice(0, 2).join(' ');
export const jobKey = j => j.date + '|' + shopKey(j.client) + '|' + shopKey(j.venue || j.suburb);
const venueName = j => /^home\b/i.test(S(j.venue)) || !S(j.venue) ? (S(j.suburb, 40) ? first(j.client) + "'s home in " + S(j.suburb, 40) : first(j.client) + "'s home") : S(j.venue, 40);
const first = s => { const w = S(s).split(' ')[0] || ''; return w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : 'client'; };

// ---- reading the run sheet (same rules as the app) ----
export function csvRows(t) { const rows = []; let row = [], cur = '', q = false; for (let i = 0; i < t.length; i++) { const c = t[i]; if (q) { if (c === '"') { if (t[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; } else if (c === '"') q = true; else if (c === ',') { row.push(cur); cur = ''; } else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; } else cur += c; } if (cur || row.length) { row.push(cur); rows.push(row); } return rows; }
export function parseDateText(s) {
  if (!s) return ''; s = String(s).replace(/(\d+)(st|nd|rd|th)\b/gi, '$1').replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
  const mi = m => { const i = MONTHS.findIndex(x => x.toLowerCase() === m.slice(0, 3).toLowerCase()); return i >= 0 ? i + 1 : 0; };
  const iso = (y, m, d) => { y = +y; if (y < 100) y += 2000; if (!m || d < 1 || d > 31 || m > 12) return ''; return y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0'); };
  let m;
  if ((m = s.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/))) return iso(m[1], +m[2], +m[3]);
  if ((m = s.match(/\b(\d{1,2})\s+([A-Za-z]{3,})\.?\s+(\d{2,4})\b/))) return iso(m[3], mi(m[2]), +m[1]);
  if ((m = s.match(/\b([A-Za-z]{3,})\.?\s+(\d{1,2})\s+(\d{2,4})\b/))) return iso(m[3], mi(m[1]), +m[2]);
  if ((m = s.match(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})\b/))) return iso(m[3], +m[2], +m[1]);
  return '';
}
const cellText = c => c == null ? '' : String(c).replace(/ /g, ' ').trim().slice(0, 400);
export function jobsFromGrid(grid) {
  let h = grid.findIndex(r => r.some(c => /^date$/i.test(cellText(c)))); let d;
  if (h >= 0) d = grid[h].findIndex(c => /^date$/i.test(cellText(c)));
  else { h = -1; const counts = {}; grid.forEach(r => r.forEach((c, i) => { if (parseDateText(cellText(c))) counts[i] = (counts[i] || 0) + 1; })); d = Number(Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]); if (isNaN(d)) return []; }
  const jobs = []; const at = (r, k) => cellText((r || [])[d + k]);
  for (let i = h + 1; i < grid.length; i++) {
    const r = grid[i]; const date = parseDateText(at(r, 0)); if (!date) continue;
    const r2 = grid[i + 1] && !parseDateText(at(grid[i + 1], 0)) ? grid[i + 1] : null;
    jobs.push({ date, staffNote: d > 0 ? at(r, -1) : '', client: at(r, 1).replace(/\s+/g, ' '), phone: at(r, 2), suburb: at(r, 3), style: at(r, 4), event: at(r, 5), arrival: at(r, 6), booth: at(r, 7), setup: at(r, 8), pickup: at(r, 9), contact2: at(r, 10),
      venue: at(r2, 2).replace(/\s+/g, ' '), address: at(r2, 3).replace(/\s+/g, ' '), backdrop: at(r2, 4), props: at(r2, 5), floorplan: at(r2, 6), parking: at(r2, 7), guests: at(r2, 8), album: at(r2, 9), notes: at(r2, 10) });
    if (r2) i++;
  }
  return jobs;
}
export const tabNames = (y, m) => { const ab = MONTHS[m].toUpperCase(), yy = String(y).slice(-2), full = MONTH_FULL[m].toUpperCase(), alt = m === 8 ? 'SEPT' : ab; return Array.from(new Set([ab + yy, alt + yy, ab + ' ' + yy, ab + '-' + yy, MONTHS[m] + yy, full + yy, ab + y, ab, alt, full])); };
export function parseClock(str, assumePm) {
  const s = String(str || '').toLowerCase(); const m = s.match(/(\d{1,2})(?:[:.](\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?/); if (!m) return null;
  let h = +m[1], mi = +(m[2] || 0); if (h > 23 || mi > 59) return null; let ap = m[3] || (s.match(/\b(am|pm)\b/) || [])[1] || '';
  if (/^p/.test(ap) && h < 12) h += 12; else if (/^a/.test(ap) && h === 12) h = 0; else if (!ap && assumePm && h < 9) h += 12; return h * 60 + mi;
}
export function boothRange(t) {
  const m = String(t || '').match(/(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm])?)\s*(?:-|–|to)\s*(\d{1,2}(?::\d{2})?\s*(?:[AaPp][Mm])?)/);
  if (!m) return null; const ap = (String(t).match(/[AaPp][Mm]/g) || []);
  let a = parseClock(m[1] + (/[ap]m/i.test(m[1]) ? '' : ' ' + (ap[0] || '')), true), b = parseClock(m[2] + (/[ap]m/i.test(m[2]) ? '' : ' ' + (ap[ap.length - 1] || '')), true);
  if (a == null || b == null) return null; if (b <= a) b += DAY; return { start: a, end: b };
}
const CHECK_RE = /please confirm|\?\?|\btbc\b|\btba\b|confirm/i;
const FP = ['booth', 'setup', 'pickup', 'address', 'venue', 'phone', 'staffNote', 'event', 'style', 'backdrop'];
const FP_NAMES = { booth: 'booth time', setup: 'set-up time', pickup: 'pick-up', address: 'address', venue: 'venue', phone: 'phone', staffNote: 'attendant', event: 'event', style: 'booth type', backdrop: 'backdrop' };
const fp = j => FP.map(f => S(j[f], 200)).join('¦');

export const DEFAULT_PREFS = { tomorrow: { on: true, at: 19 * 60 }, confirm: { on: true }, sheet: { on: true }, invoice: { on: true, day: 4, at: 8 * 60 }, event: { on: true, lead: 60 }, quiet: { from: 22 * 60, to: 7 * 60 } };
export function mergePrefs(p) {
  const o = JSON.parse(JSON.stringify(DEFAULT_PREFS)); if (!p || typeof p !== 'object') return o;
  const n = (v, a, b, d) => { v = +v; return isFinite(v) ? Math.min(b, Math.max(a, Math.round(v))) : d; };
  for (const k of Object.keys(o)) if (p[k] && typeof p[k] === 'object') { if ('on' in o[k]) o[k].on = p[k].on !== false; }
  o.tomorrow.at = n(p.tomorrow && p.tomorrow.at, 0, DAY - 1, o.tomorrow.at);
  o.invoice.day = n(p.invoice && p.invoice.day, 0, 6, o.invoice.day); o.invoice.at = n(p.invoice && p.invoice.at, 0, DAY - 1, o.invoice.at);
  if (o.invoice.day === 3 && o.invoice.at === 18 * 60) { o.invoice.day = 4; o.invoice.at = 8 * 60; } // the old default (Wed 6pm) moves to the Thursday draft
  o.event.lead = n(p.event && p.event.lead, 10, 240, o.event.lead);
  o.quiet.from = n(p.quiet && p.quiet.from, 0, DAY - 1, o.quiet.from); o.quiet.to = n(p.quiet && p.quiet.to, 0, DAY - 1, o.quiet.to);
  return o;
}
const inWindow = (now, at, span = 30) => now >= at && now < at + span;
const isQuiet = (now, q) => q.from === q.to ? false : q.from < q.to ? now >= q.from && now < q.to : now >= q.from || now < q.to;

/**
 * input: { now: {iso, mins}, jobs: [...], prefs, invoices: [{weekStart}], plans: {iso: plan}, route: {setupMins, bufferMins}, state: {sent:{}, jobs:{}|null} }
 * returns { notes: [{key, kind, title, body, view}], state }
 */
export function due(input) {
  const { now, jobs } = input; const prefs = mergePrefs(input.prefs); const route = Object.assign({ setupMins: 45, packMins: 30, bufferMins: 15 }, input.route || {});
  const state = { sent: Object.assign({}, (input.state && input.state.sent) || {}), jobs: (input.state && input.state.jobs) || null };
  const notes = []; const today = now.iso; const tomorrow = addDays(today, 1); const quiet = isQuiet(now.mins, prefs.quiet);
  const send = (key, kind, title, body, view) => { if (state.sent[key]) return; state.sent[key] = Date.now(); notes.push({ key, kind, title: S(title, 80), body: S(body, 400), view }); };
  const byStart = (a, b) => ((boothRange(a.booth) || {}).start || 0) - ((boothRange(b.booth) || {}).start || 0);
  const when = j => { const br = boothRange(j.booth); return br ? hm(br.start) : 'time not set'; };
  const place = j => S(j.suburb || j.venue, 40);

  // 1) tomorrow's jobs, at the chosen time
  if (prefs.tomorrow.on && !quiet && inWindow(now.mins, prefs.tomorrow.at)) {
    const t = jobs.filter(j => j.date === tomorrow).sort(byStart);
    if (t.length) send('tomorrow-' + tomorrow, 'tomorrow', (t.length === 1 ? '1 job' : t.length + ' jobs') + ' tomorrow (' + dayLabel(tomorrow) + ')',
      t.map(j => when(j) + ' ' + first(j.client) + ' – ' + place(j) + (j.style ? ' (' + S(j.style, 12).toUpperCase() + ')' : '')).join(' · '), 'runsheet');
  }
  // 2) things to confirm in the next two days, with the evening digest
  if (prefs.confirm.on && !quiet && inWindow(now.mins, prefs.tomorrow.at)) {
    const items = [];
    jobs.filter(j => j.date >= today && j.date <= addDays(today, 2)).sort(byStart).forEach(j => {
      const what = [['set-up time', j.setup], ['pick-up', j.pickup], ['guest arrival', j.arrival]].filter(([, v]) => v && CHECK_RE.test(v)).map(x => x[0]);
      if (what.length && !state.sent['confirm-' + jobKey(j) + '-' + what.join(',')]) { state.sent['confirm-' + jobKey(j) + '-' + what.join(',')] = Date.now(); items.push('Confirm ' + what.join(' and ') + ' with ' + first(j.client) + ' (' + dayLabel(j.date) + ')'); }
    });
    if (items.length) send('confirm-' + today + '-' + items.length + '-' + now.mins, 'confirm', items.length === 1 ? 'Something to confirm' : items.length + ' things to confirm', items.join(' · '), 'messages');
  }
  // 3) run sheet changes (checked outside quiet hours; anything overnight is reported in the morning)
  const upcoming = jobs.filter(j => j.date >= today && j.date <= addDays(today, 45));
  if (!quiet) {
    const cur = {}; upcoming.forEach(j => { cur[jobKey(j)] = { fp: fp(j), date: j.date, client: S(j.client, 60), j }; });
    if (state.jobs && prefs.sheet.on) {
      const lines = []; let nNew = 0, nChg = 0, nGone = 0;
      Object.keys(cur).forEach(k => { const o = state.jobs[k]; const c = cur[k];
        if (!o) { nNew++; lines.push('New: ' + first(c.client) + ' ' + dayLabel(c.date) + ' (' + place(c.j) + ')'); return; }
        if (o.fp !== c.fp) { const of = o.fp.split('¦'), nf = c.fp.split('¦'); const ch = FP.filter((f, i) => of[i] !== nf[i]).map(f => FP_NAMES[f]); nChg++; lines.push(first(c.client) + ' ' + dayLabel(c.date) + ': ' + ch.slice(0, 2).join(', ') + ' changed'); } });
      Object.keys(state.jobs).forEach(k => { const o = state.jobs[k]; if (!cur[k] && o.date >= today) { nGone++; lines.push('Removed: ' + first(o.client) + ' ' + dayLabel(o.date)); } });
      if (lines.length) send('sheet-' + today + '-' + now.mins, 'sheet', 'Run sheet updated' + (nNew ? ': ' + nNew + ' new booking' + (nNew === 1 ? '' : 's') : nChg ? ': ' + nChg + ' change' + (nChg === 1 ? '' : 's') : ''), lines.slice(0, 5).join(' · ') + (lines.length > 5 ? ' · and ' + (lines.length - 5) + ' more' : ''), 'runsheet');
    }
    state.jobs = {}; Object.keys(cur).forEach(k => { state.jobs[k] = { fp: cur[k].fp, date: cur[k].date, client: cur[k].client }; });
  }
  // 4) weekly invoice reminder, unless this week's invoice is already made
  if (prefs.invoice.on && !quiet && dow(today) === prefs.invoice.day && inWindow(now.mins, prefs.invoice.at)) {
    const ws = invoiceWeekStart(today);
    if (!(input.invoices || []).some(i => i.weekStart === ws)) {
      const n = jobs.filter(j => j.date >= ws && j.date <= addDays(ws, 6)).length;
      send('invoice-' + ws, 'invoice', 'Your invoice is ready to check', 'Drafted from the run sheet for ' + weekLabel(ws) + (n ? ': ' + n + ' event' + (n === 1 ? '' : 's') : ': no jobs found') + '. Tap to review it, add receipts and send.', 'invdraft');
    }
  }
  // 5) event day countdowns (these ignore quiet hours)
  if (prefs.event.on) {
    const lead = prefs.event.lead; const leadTxt = lead % 60 === 0 ? (lead / 60) + ' h' : lead >= 60 ? Math.floor(lead / 60) + ' h ' + (lead % 60) + ' min' : lead + ' min';
    for (const [day, offset] of [[today, 0], [addDays(today, -1), DAY]]) {
      const nowM = now.mins + offset; const plan = input.plans && input.plans[day];
      const r = plan && plan.result && Array.isArray(plan.result.steps) ? plan.result : null;
      if (r) {
        r.steps.forEach((st, i) => { const s = (r.stops || []).find(x => x.id === st.id); if (!s || (plan.done || []).includes(st.id)) return;
          const leaveBy = st.begin - ((st.leg && st.leg.mins) || 0); const what = (s.kind === 'pack' ? 'pack-down' : s.kind === 'setup' ? 'set-up' : 'your stop') + ' at ' + S(s.place || s.name, 40);
          if (inWindow(nowM, leaveBy - lead, 20)) send('ev-' + day + '-' + st.id + '-lead', 'event', leadTxt + ' until you leave for ' + what, 'Leave by ' + hm(leaveBy) + ' to arrive ' + hm(st.arrive) + '. ' + S(s.label, 20) + ' for ' + first(s.name) + (s.kind === 'setup' && s.boothStart != null ? ', booth starts ' + hm(s.boothStart) : '') + '.', 'route');
          if (inWindow(nowM, leaveBy, 15)) send('ev-' + day + '-' + st.id + '-go', 'event', 'Time to leave for ' + what, (st.leg ? Math.round(st.leg.mins) + ' min drive' : 'Drive') + ', arrive about ' + hm(st.arrive) + ' (' + first(s.name) + ').', 'route');
        });
      } else {
        jobs.filter(j => j.date === day).forEach(j => { const br = boothRange(j.booth); if (!br) return;
          const latest = br.start - route.setupMins - route.bufferMins;
          if (inWindow(nowM, latest - lead, 20)) send('ev-' + day + '-' + jobKey(j) + '-setup', 'event', leadTxt + ' until set-up must start at ' + venueName(j), first(j.client) + "'s booth starts " + hm(br.start) + '. Start setting up by ' + hm(latest) + (j.style ? ' (' + S(j.style, 12).toUpperCase() + (j.backdrop ? ', ' + S(j.backdrop, 30).toLowerCase() : '') + ')' : '') + '.', 'route');
          if (inWindow(nowM, br.end - 30, 20)) send('ev-' + day + '-' + jobKey(j) + '-pack', 'event', 'Pack-down at ' + venueName(j) + ' in 30 min', first(j.client) + "'s booth finishes at " + hm(br.end) + '.', 'route');
        });
      }
    }
  }
  // keep the memory small
  Object.keys(state.sent).forEach(k => { if (Date.now() - state.sent[k] > 40 * 864e5) delete state.sent[k]; });
  return { notes, state };
}
