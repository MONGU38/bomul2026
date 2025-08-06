// 캐시 이름
const CACHE_NAME = 'treasure-box-v1';

// 캐시할 파일들
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/app_icon512.png',
  '/app_icon1024.png'
];

// Service Worker 설치
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 네트워크 요청 처리
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 캐시에 있으면 캐시에서, 없으면 네트워크에서
        return response || fetch(event.request);
      }
    )
  );
});
