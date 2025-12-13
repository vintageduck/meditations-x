const CACHE_NAME = 'marston-scribe-v1';
const ASSETS_TO_CACHE = [
  './scribe.html',
  './index.html',
  './manifest_scribe.json',
  './quill.png',
  './icon.png'
];

// 1. Install: Cache the files immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch: Intercept requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file if found, otherwise try network
      return cachedResponse || fetch(event.request);
    })
  );
});

// 3. Activate: Clean up old caches if we update the version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
