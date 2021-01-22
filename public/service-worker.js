const cacheVersion = 'v1';
const cacheName = `bullet-notes-${cacheVersion}`;

this.addEventListener('install', (event) => {
    console.info('Installing ServiceWorker...');
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(['index.html']);
        }),
    );
});

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(cacheName).then((cache) => {
            return cache.match(event.request).then((response) => {
                return (
                    response ||
                    fetch(event.request).then((response) => {
                        if (event.request.method === 'GET') {
                            cache.put(event.request, response.clone());
                        }
                        return response;
                    })
                );
            });
        }),
    );
});

this.addEventListener('activate', (event) => {
    console.info('Activate ServiceWorker!');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => {
                        return key.indexOf(cacheName) !== 0;
                    })
                    .map((key) => {
                        return caches.delete(key);
                    }),
            );
        }),
    );
});
