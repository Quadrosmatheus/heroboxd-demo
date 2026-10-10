const CACHE='heroboxd-static-v3';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/manifest.json','/src/styles.css','/src/app.js'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('heroboxd-static-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin===location.origin&&u.pathname.startsWith('/api/'))return;if(e.request.method==='GET'&&u.origin===location.origin)e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)));});
