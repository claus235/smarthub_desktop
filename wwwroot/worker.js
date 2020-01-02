'user strict';

var walletCacheName = "smartcash-wallet-v1";
var walletCachePagesName = "smartcash-wallet-pages-v1";
var walletCacheObjectsName = "smartcash-wallet-objects-v1";
var walletCacheFilesName = "smartcash-wallet-files-v1";

var urlsToCache = [
    '/99347ac47f.js',
    '/ajax/libs/jquery/1.11.0/jquery.min.js',
];
var urlsApisToCache = [
    /*'/api/Login/GetClientToken',
    '/api/Wallet/Get',
    '/api/wallet/getcurrentprice',
    '/api/User/Get',
    '/qr'*/
];

var walletCacheFiles = [
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,900i',
    'css/style.default.css',
    'js/bootstrap.js',
    'js/bootstrap.min.js',
    'js/front.js',
    'js/jquery.cookie.js',
    'js/jquery.validate.min.js',
    'js/tether.min.js',
    './',
    './worker.js',
    './swRegister.js',
    './manifest.json',
    './favicon.ico',
    'img/avatar-1.jpg',
    'img/avatar-1.png',
    'img/logo.png',
    'images/img_progress_sm_black.gif',
    'images/img_progress_sm_white.gif',
    'fonts/icomoon.eot',
    'fonts/icomoon.svg',
    'fonts/icomoon.ttf',
    'fonts/icomoon.woff',
    'dist/main-client.js',
    'dist/main-client.js.map',
    'dist/vendor-manifest.json',
    'dist/vendor.css',
    'dist/vendor.js'
];

self.addEventListener('install', function (event) {
    //console.log("FROM SW: Install Event", event);
    self.skipWaiting();
    caches.open(walletCacheName)
        .then(function (cache) {
            return cache.addAll(walletCacheFiles);
        })
});

self.addEventListener('activate', function (event) {
    //console.log("FROM SW: Activate Event", event);
    self.clients.claim();
    event.waitUntil(
        caches.keys()
        .then(function (cacheKeys) {
            var deletePromisses = [];
            for (var i = 0; i < cacheKeys.length; i++) {
                if (cacheKeys[i] != walletCacheName &&
                    cacheKeys[i] != walletCachePagesName &&
                    cacheKeys[i] != walletCacheObjectsName
                ) {
                    deletePromisses.push(caches.delete(cacheKeys[i]));
                }
            }
            return Promise.all(deletePromisses);
        })
    )
});

self.addEventListener('fetch', function (event) {
    var requestUrl = new URL(event.request.url);
    var requestPath = requestUrl.pathname;
    var fileName = requestPath.substring(requestPath.lastIndexOf('/') + 1);

    if (urlsApisToCache.indexOf(requestPath) > -1 || fileName == 'worker.js') {
        event.respondWith(networkFirstStrategy(event.request));
    }
    //SE FOREM OBJETOS, vamos antes no cache.
    else if(urlsToCache.indexOf(requestPath) > -1){
        event.respondWith(cacheFirstStrategy(event.request));
    }
});

function cacheFirstStrategy(request) {
    return caches.match(request).then(function (cacheResponse) {
        return cacheResponse || fetchResquestAndCache(request);
    })
}

function networkFirstStrategy(request) {
    return fetchResquestAndCache(request).catch(function (response) {
        return caches.match(request);
    });
}

function fetchResquestAndCache(request) {
    return fetch(request).then(function (networkResponse) {
        caches.open(getCacheName(request)).then(function (cache) {
            cache.put(request, networkResponse);
        });
        return networkResponse.clone();
    });
};

function getCacheName(request) {
    var requestUrl = new URL(request.url);
    var requestPath = requestUrl.pathname;

    for (var i = 0; i < urlsToCache.length; i++) {
        var url = urlsToCache[i];
        if (requestPath == url)
            return walletCacheObjectsName;
    }
    for (var i = 0; i < urlsApisToCache.length; i++) {
        var api = urlsApisToCache[i];
        if (requestPath == api || requestPath.indexOf(api) > -1)
            return walletCachePagesName;
    }

    for (var i = 0; i < walletCacheFiles.length; i++) {
        var api = walletCacheFiles[i];
        if (requestPath == api || requestPath.indexOf(api) > -1)
            return walletCacheFilesName;
    }

    return walletCacheName;
};