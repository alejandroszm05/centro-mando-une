// Centro de Mando · guarda la app para que abra rápido y sin señal. Los datos siempre van a Supabase.
const V='cm-une-v1';const CORE=['./','index.html','geo.json','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
  if(u.origin===location.origin&&(u.pathname.endsWith('/')||u.pathname.endsWith('.html'))){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));return}
  e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{if(r.ok&&(u.origin===location.origin||u.hostname.includes('cdn')||u.hostname.includes('fonts'))){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r})))});
