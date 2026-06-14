// Kill-switch service worker.
// The app registers NO service worker. This file exists only to neutralize a
// stale SW left by the previous ReBiS site (which was serving cached content
// and ignoring deploys). When the old SW does its periodic update check it
// fetches this script, installs it, and on activation it clears every cache,
// unregisters itself, and reloads open tabs — leaving the browser SW-free.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) { /* ignore */ }
    try { await self.registration.unregister(); } catch (e) { /* ignore */ }
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
