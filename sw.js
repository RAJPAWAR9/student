/* BOOSTER OS 2.0V MAX — Service Worker
   Caches only the static app shell. Never caches:
   - JioSaavn API responses (copyrighted metadata/streams change & are licensed)
   - Audio stream URLs (music content — must always hit network, never stored offline
     unless the source explicitly permits it, which this API does not)
*/
const SHELL_CACHE = 'booster-shell-v1';
const SHELL_ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== SHELL_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  const isAudioOrApi = e.request.destination === 'audio'
    || url.includes('jiosaavn-api')
    || url.includes('lrclib.net')
    || url.includes('.saavncdn.com')
    || url.includes('/api/');

  // Music/API/lyrics traffic: always network, never cached (licensing + freshness).
  if (isAudioOrApi) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503, statusText: 'Offline' })));
    return;
  }

  // App shell: cache-first, fallback to network, fallback to cached index for navigations.
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (e.request.method === 'GET' && res.ok && res.type === 'basic') {
          const clone = res.clone();
          caches.open(SHELL_CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : new Response('', { status: 504 }));
    })
  );
});
