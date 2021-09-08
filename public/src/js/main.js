
var box = document.querySelector('.box');
var button = document.querySelector('button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Registered Service Worker!');
    });
}

button.addEventListener('click', function(event) {
  if (box.classList.contains('visible')) {
    box.classList.remove('visible');
  } else {
    box.classList.add('visible');
  }
});

fetch('https://httpbin.org/ip')
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data.origin);
    box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
  });


  // var url = 'https://httpbin.org/ip';
  // var networkData = false;


  // //Data from network
  // fetch(url)
  //   .then(function(res) {
  //     return res.json();
  //   })
  //   .then(function(data) {
  //     console.log("Entre al network")
  //     networkData = true;
  //     console.log(data.origin);
  //     box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
  //   });



  // //Data from cache
  // if ( 'caches' in window){
  //   caches.match(url)
  //     .then(function(resp) {
  //       if (!resp) throw Error ("No data");
  //       return resp.json();
  //     })
  //     .then(function (data) {
  //       if (!networkData) {
  //         console.log("Entre no network")
  //         console.log(data.origin);
  //         box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
  //       }
  //     })
  // }
  
