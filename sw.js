const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

const clearCache = (cacheName, maxSize) =>{
    caches.open(cacheName).then((cache)=>{
        return cache.keys().then((items)=>{
            console.log(items.length);
            if(items.length>=maxSize){
                cache.delete(items[0]).then(()=>{
                    clearCache(cacheName,maxSize)
                })
            }
        })
    })
}

self.addEventListener('install',(event)=>{
    console.log('SW: Instalado');
    const respCache = caches.open('cache-v1').then((cache)=>{
        return cache.addAll([
            './',
            './index.html',
            './img/perrito.jpg',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.ttf',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js'
        ]);
    });
    event.waitUntil(respCache);
})

//only cache 
self.addEventListener('fetch',(event)=>{
    const respCache = caches.match(event.request);
    event.respondWith(respCache);
})