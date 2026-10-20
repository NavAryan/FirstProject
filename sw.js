const VERSION='4.0.2';
const CACHE=`mission-control-${VERSION}`;
const FILES=['./','./index.html','./styles.css?v=4.0.2','./manifest.webmanifest','./icon-192.png','./icon-512.png','./app.js?v=4.0.2','./db.js?v=4.0.2','./defaults.js?v=4.0.2','./smart.js?v=4.0.2','./planner.js?v=4.0.2','./state.js?v=4.0.2','./ui.js?v=4.0.2'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(url=>new Request(new URL(url,self.registration.scope),{cache:'reload'})))));});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('mission-control-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(request);if(cached)return cached;
 try{const response=await fetch(request);return response;}catch{if(request.mode==='navigate')return (await cache.match('./index.html'))||Response.error();return Response.error();}
 })());
});
