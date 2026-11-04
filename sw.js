// Keeps the invoice maker working with no internet.
const CACHE = 'boothkeepr-v13';
const FILES = ['./', 'index.html', 'jspdf.umd.min.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'jszip.min.js', 'pdf.min.js', 'pdf.worker.min.js', 'xlsx.full.min.js', 'fb.js', 'apple-touch-icon.png', 'apple-touch-icon-dark.png', 'icon-192-dark.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// Reminders from the Boothkeepr reminder service
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: 'Boothkeepr', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Boothkeepr', { body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag || undefined, data: { view: d.view || '' } }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close(); const view = (e.notification.data && e.notification.data.view) || '';
  const url = new URL('./' + (view ? '?go=' + encodeURIComponent(view) : ''), self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => { for (const c of list) { if ('focus' in c) { c.navigate(url).catch(() => {}); return c.focus(); } } return self.clients.openWindow(url); }));
});
// Network first so updates show up straight away; the saved copy is used when offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(m => m || caches.match('index.html'))));
});
