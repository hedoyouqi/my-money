const CACHE='mymoney-v5';
const FILES=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(FILES);await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith((async()=>{const url=new URL(event.request.url);if(url.origin===location.origin&&(url.pathname.endsWith('/index.html')||url.pathname==='/')){try{const response=await fetch(event.request);const cache=await caches.open(CACHE);cache.put(event.request,response.clone());return response}catch(error){return (await caches.match(event.request))||Response.error()}}return (await caches.match(event.request))||(await fetch(event.request))})())});
