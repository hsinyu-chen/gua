const v = 99999;
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('web').then(function (cache) {
            return cache.addAll(
                [
                    '/gua/',
                    '/gua/index.html',
                    '/gua/dist/main.css',
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
