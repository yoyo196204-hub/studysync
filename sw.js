var CACHE='studysync-v9';
var PRECACHE=['./','/index.html'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(cache){
      return cache.addAll(PRECACHE);
    }).then(function(){self.skipWaiting()})
  );
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
    }).then(function(){self.clients.claim()})
  );
});

self.addEventListener('fetch',function(e){
  e.respondWith(
    fetch(e.request).then(function(r){
      var c=r.clone();
      caches.open(CACHE).then(function(cache){cache.put(e.request,c)});
      return r;
    }).catch(function(){return caches.match(e.request)})
  );
});

self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window'}).then(function(cl){
      for(var i=0;i<cl.length;i++){
        if(cl[i].url&&'focus' in cl[i])return cl[i].focus();
      }
      if(clients.openWindow)return clients.openWindow('./');
    })
  );
});
