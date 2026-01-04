// Created: 2026-01-04 12:00:00
// Service Worker for TO DO TODAY PWA

const CACHE_NAME = 'todo-dashboard-v1';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// ============================================
// Install Event - 캐시에 파일 저장
// ============================================
self.addEventListener('install', (event) => {
    console.log('[Service Worker] 설치 중...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] 캐시 열기 완료');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[Service Worker] 모든 파일 캐싱 완료');
                return self.skipWaiting(); // 즉시 활성화
            })
            .catch((error) => {
                console.error('[Service Worker] 캐싱 실패:', error);
            })
    );
});

// ============================================
// Activate Event - 오래된 캐시 삭제
// ============================================
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] 활성화 중...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] 오래된 캐시 삭제:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] 활성화 완료');
                return self.clients.claim(); // 모든 클라이언트 제어
            })
    );
});

// ============================================
// Fetch Event - 캐시 우선, 네트워크 폴백
// ============================================
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // 캐시에 있으면 캐시 반환
                if (cachedResponse) {
                    console.log('[Service Worker] 캐시에서 반환:', event.request.url);
                    return cachedResponse;
                }

                // 캐시에 없으면 네트워크 요청
                console.log('[Service Worker] 네트워크 요청:', event.request.url);
                return fetch(event.request)
                    .then((networkResponse) => {
                        // 유효한 응답인 경우 캐시에 저장
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] 네트워크 요청 실패:', error);
                        // 오프라인 폴백 페이지 반환 가능
                    });
            })
    );
});

// ============================================
// Message Event - 캐시 업데이트 요청 처리
// ============================================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
