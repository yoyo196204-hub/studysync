var CACHE='studysync-v2';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){self.clients.claim()});
self.addEventListener('fetch',function(e){
  e.respondWith(fetch(e.request).then(function(r){
    var c=r.clone();caches.open(CACHE).then(function(cache){cache.put(e.request,c)});return r;
  }).catch(function(){return caches.match(e.request)}));
});
