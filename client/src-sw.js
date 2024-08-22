import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';


precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, 
    }),
  ],
});


registerRoute(
  ({ request }) => request.mode === 'navigate',
  pageCache
);


registerRoute(
  ({ request }) => {
    return (
      request.destination === 'style' ||
      request.destination === 'script'
    );
  },
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, 
      }),
    ],
  })
);
