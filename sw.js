// Master Print Service Worker - Offline-First Engine
const CACHE_NAME = 'master-print-v101';
const STATIC_ASSETS = [
  './',
  './index.html',
  './app.js',
  './ozone_pricing.js',
  './qrcode.min.js',
  './html5-qrcode.min.js',
  './logo.jpg',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

// Install: Precache Core Assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        STATIC_ASSETS.map(url =>
          fetch(url, { mode: url.startsWith('http') ? 'cors' : 'no-cors' })
            .then(response => {
              if (response && (response.ok || response.type === 'opaque')) {
                return cache.put(url, response);
              }
            })
            .catch(() => {})
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First with Cache Fallback for instant updates, completely bypassing API
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (req.url.includes('/api/')) return;

  event.respondWith(
    fetch(req).then(networkResponse => {
      if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(req);
    })
  );
});
