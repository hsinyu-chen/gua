self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('web').then(function (cache) {
            return cache.addAll(
                [
                    '/',
                    '/index.html',
                    '/dist/main.css',
                    '/dist/scripts/main.js',
                    '/android-chrome-192x192.png',
                    '/android-chrome-512x512.png',
                    '/apple-touch-icon.png',
                    '/favicon.ico',
                    '/favicon-16x16.png',
                    '/favicon-32x32.png',
                    '/manifest.json',
                    '/mstile-150x150.png',
                    '/safari-pinned-tab.svg',
                ]
            );
        })
    );
});
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return true;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});