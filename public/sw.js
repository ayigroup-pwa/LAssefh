
var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll([
          '/',
          '/offline.html',
          '/index.html',
          '/src/css/app.css',
          '/src/css/main.css',
          '/src/js/main.js',
          '/src/js/material.min.js',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});
// ------------------------- 1 -------------------------
// Cache first with network fallback

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                });
            })
            .catch(function (err) {
                return caches.open(CACHE_STATIC_NAME)
                  .then(function (cache) {
                    if (event.request.headers.get('accept').includes('text/html')) {
                      return cache.match('/offline.html');
                    }
                  });
              })
        }
      })
  );
});
// ------------------------- 1 -------------------------




// ------------------------- 2 -------------------------
// Only Network Strategy
// self.addEventListener('fetch', function(event) {
//   event.respondWith(fetch(event.request)
//     .then(function(res) {
//       return caches.open(CACHE_DYNAMIC_NAME)
//         .then(function(cache) {
//           cache.put(event.request.url, res.clone());
//           return res;
//         });
//     })
//     .catch(function (err) {
//       return caches.open(CACHE_STATIC_NAME)
//         .then(function (cache) {
//           if (event.request.headers.get('accept').includes('text/html')) {
//             return cache.match('/offline.html');
//           }
//         });
//     })
//   );
// });

// ------------------------- 2 -------------------------


// ------------------------- 3 -------------------------
// Only Cache Strategy



// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         if(response)
//           return response
//         else console.log("No se encontro la información")
//       })
//       .catch(function(err) {
//         console.log("Se ha producido un error " + err)
//       })  
//   );
// });

// ------------------------- 3 -------------------------

// ------------------------- 4 -------------------------
// "Network, cache fallback"



// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//         fetch(event.request)
//         .catch(err => {
//           return caches.match(event.request)})       
//       )
      
// });

// ------------------------- 4 -------------------------



// // ------------------------- 5 -------------------------

// // Cache, then network
// self.addEventListener ( 'fetch' , function (event) {
//   event.respondWith(    
//     fetch(event.request)
//       .then(function (res) {
//         return caches.open(CACHE_DYNAMIC_NAME)
//           .then(function (cache) {
//             cache.put(event.request.url, res.clone());
//             return res;
//           })
//       })
//       .catch(function(err) {
//         console.log("caigo en el catch")
//         return caches.match(event.request);
//       })
//       .catch(function (err) {
//         return caches.open(CACHE_STATIC_NAME)
//           .then(function (cache) {
//             if (event.request.headers.get('accept').includes('text/html')) {
//               return cache.match('/offline.html');
//             }
//           });
//       })
//   );
// })

// ------------------------- 5 -------------------------




// ------------------------- 6 --------------------------

// Routing


// self.addEventListener('fetch', function (event) {

//   var url = 'https://httpbin.org/ip';
//   if (event.request.url.indexOf(url) > -1) {
//     // Network only
//     event.respondWith(
//       fetch(event.request)
//           .then(function (res) {
//             return caches.open(CACHE_DYNAMIC_NAME)
//               .then(function (cache) {
//                 cache.put(event.request.url, res.clone());
//                 return res;
//               })
//           })
//     );
//     // Cache only
//   } else if (CACHE_STATIC_NAME.includes(event.request.url)) {  
//       event.respondWith(
//         caches.match(event.request.url)
//       );
//   } else {
//     event.respondWith(
//       // Cache with network fallback
//       caches.match(event.request)
//         .then(function (response) {
//           if (response) {
//             return response;
//           } else {
//             return fetch(event.request)
//               .then(function (res) {
//                 return caches.open(CACHE_DYNAMIC_NAME)
//                   .then(function (cache) {
//                     cache.put(event.request.url, res.clone());
//                     return res;
//                   })
//               })
//               .catch(function (err) {
//                 return caches.open(CACHE_STATIC_NAME)
//                   .then(function (cache) {
//                     if (event.request.headers.get('accept').includes('text/html')) {
//                       return cache.match('/offline.html');
//                     }
//                   });
//               });
//           }
//         })
//     );
//   }
// });