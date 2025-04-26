import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, Route } from 'workbox-routing'
import { CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies'
import { BackgroundSyncPlugin } from 'workbox-background-sync'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute } from 'workbox-routing'

const backendUrl = `${import.meta.env.VITE_API_URL}`;

// Ensure the service worker takes control immediately
clientsClaim();

// Precache all assets defined in the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Clean up outdated caches during activation
self.addEventListener('activate', (event) => {
    event.waitUntil(
        cleanupOutdatedCaches()
    );
});

// Cache images with CacheFirst strategy
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            {
                cacheWillUpdate: async ({ response }) => {
                    // Only cache successful responses
                    return response.status === 200 ? response : null;
                }
            }
        ]
    })
);

// Cache API GET requests with NetworkFirst strategy
registerRoute(
    ({ url }) => url.origin === new URL(backendUrl).origin && url.pathname.startsWith('/api/v1'),
    new NetworkFirst({
        cacheName: 'api-get',
        networkTimeoutSeconds: 3,
        plugins: [
            {
                cacheWillUpdate: async ({ response }) => {
                    // Only cache successful responses
                    return response && response.status === 200 ? response : null;
                }
            }
        ]
    }),
    'GET'
);

// Background sync for write operations
const bgSyncPlugin = new BackgroundSyncPlugin('api-queue', {
    maxRetentionTime: 24 * 60, // 24 hours
    onSync: async ({ queue }) => {
        let entry;
        while (entry = await queue.shiftRequest()) {
            try {
                await fetch(entry.request);
            } catch (error) {
                await queue.unshiftRequest(entry);
                throw error;
            }
        }
    }
});

// Handle write operations with NetworkOnly + BackgroundSync
registerRoute(
    ({ url }) => url.origin === new URL(backendUrl).origin && url.pathname.startsWith('/api/v1'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    ['POST', 'PUT', 'DELETE', 'PATCH']
);

// Cache navigation routes
registerRoute(
    new NavigationRoute(
        new NetworkFirst({
            cacheName: 'navigation',
            networkTimeoutSeconds: 3
        })
    )
);

// Optional: Add offline fallback page
registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'offline-fallback',
        plugins: [
            {
                handlerDidError: async ({ request }) => {
                    return caches.match('/offline.html') || Response.error();
                }
            }
        ]
    })
);