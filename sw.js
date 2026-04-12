const CACHE_NAME = 'scangol-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/styles.css',
  '/assets/js/main.js',
  '/assets/js/components.js',
  '/assets/js/data.js',
  '/assets/js/stats.js',
  '/assets/js/trivia.js',
  '/assets/js/video.js',
  '/assets/js/ar.js',
  '/assets/targets/targets.mind',
  '/assets/mundial.jpg',
  // Modelos
  '/assets/modelos/alemania/scene.glb',
  '/assets/modelos/argentina/scene.glb',
  '/assets/modelos/australia/scene.glb',
  '/assets/modelos/brasilao/scene.glb',
  '/assets/modelos/canada/scene.glb',
  '/assets/modelos/colombia/scene.glb',
  '/assets/modelos/ecuador/scene.glb',
  '/assets/modelos/espana/scene.glb',
  '/assets/modelos/francia/scene.glb',
  '/assets/modelos/mexico/scene.glb',
  // Videos
  '/assets/videos/argentina.mp4',
  '/assets/videos/brasil.mp4',
  '/assets/videos/can-belgi.mp4',
  '/assets/videos/colombia-japan.mp4',
  '/assets/videos/england-iran.mp4',
  '/assets/videos/jordan-qatara.mp4',
  '/assets/videos/morocco-koreas.mp4',
  '/assets/videos/newzealand.mp4',
  '/assets/videos/paraguay.mp4',
  '/assets/videos/tunez-australia.mp4',
  '/assets/videos/usa.mp4',
  '/assets/videos/uzbekistan-uruguay.mp4',
  // Imágenes targets
  '/assets/targets/img-originales/alemania (2).jpg',
  '/assets/targets/img-originales/alemania.jpg',
  '/assets/targets/img-originales/argentina (2).jpg',
  '/assets/targets/img-originales/argentina.jpg',
  '/assets/targets/img-originales/australia (2).jpg',
  '/assets/targets/img-originales/australia.jpg',
  '/assets/targets/img-originales/brazil (2).jpg',
  '/assets/targets/img-originales/brazil.jpg',
  '/assets/targets/img-originales/canada (2).jpg',
  '/assets/targets/img-originales/canada.jpg',
  '/assets/targets/img-originales/colombia (1).jpg',
  '/assets/targets/img-originales/colombia (2).jpg',
  '/assets/targets/img-originales/ecuador (1).jpg',
  '/assets/targets/img-originales/ecuador (2).jpg',
  '/assets/targets/img-originales/espana (1).jpg',
  '/assets/targets/img-originales/espana (2).jpg',
  '/assets/targets/img-originales/francia (2).jpg',
  '/assets/targets/img-originales/francia.jpg',
  '/assets/targets/img-originales/mexico (2).jpg',
  '/assets/targets/img-originales/mexico.jpg',
  // External scripts
  'https://aframe.io/releases/1.5.0/aframe.min.js',
  'https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js',
  'https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v7.0.0/dist/aframe-extras.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Cache new requests
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});