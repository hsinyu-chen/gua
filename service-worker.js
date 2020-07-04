const v = 'v1.1';
const cacheNamePrefix = 'offline-cache-';
const cacheName = `${cacheNamePrefix}${v}`;
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(
                [
                    '/gua/',
                    '/gua/index.html',
                    '/gua/data.json',
                    '/gua/dist/main.css',
                    '/gua/dist/scripts/calendar.js',
                    '/gua/dist/scripts/gua64.js',
                    '/gua/dist/scripts/time.js',
                    '/gua/dist/scripts/main.js',
                    '/gua/android-chrome-192x192.png',
                    '/gua/android-chrome-512x512.png',
                    '/gua/apple-touch-icon.png',
                    '/gua/favicon.ico',
                    '/gua/favicon-16x16.png',
                    '/gua/favicon-32x32.png',
                    '/gua/manifest.json',
                    '/gua/mstile-150x150.png',
                    '/gua/safari-pinned-tab.svg',
                ]
            );
        })
    );
});
self.addEventListener('activate', async function (event) {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys
        .filter(key => key.startsWith(cacheNamePrefix) && key !== cacheName)
        .map(key => caches.delete(key)));
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
