'use strict';

const CACHE_NAME = 'static-cache-v9';

const FILES_TO_CACHE =[
// 'pwa/public/offline.html',
'./index.html',
'./files/interstellar.png',
'./files/jurassicpark.png',
'./files/superlopez.png',
'./files/placeholder.png',
'./files/install.js',
]

self.addEventListener('install',(evnt)=>{
	console.log('[ServiceWorker] Install')
	evnt.waitUntil(
		caches.open(CACHE_NAME)
		.then((cache)=>{
			console.log('[ServiceWorker Pre-caching offile page]')
			return cache.addAll(FILES_TO_CACHE)
		})
	)
	self.skipWaiting()
})

self.addEventListener('activate',(evnt)=>{
	console.log('[ServiceWorker] activate')
	evnt.waitUntil(
		caches.keys()
		.then(keyList=>{
			return Promise.all(keyList.map(key=>{
				if (key != CACHE_NAME) {
					console.log('[ServiceWorker] Remove old cache',key)
					return caches.delete(key)
				}
			}))
		})
	)
	self.clients.claim();
})

self.addEventListener('fetch',(evnt)=>{
	console.log('[ServiceWorker] Fetch',evnt.request.url)

	// evnt.respondWith(
	// 	caches.open(CACHE_NAME)
	// 	.then((cache)=>{
	// 		return cache.match(evnt.request)
	// 		.then((response)=>{
	// 			console.log('RESP',response)
	// 			return response || fetch(evnt.request)
	// 		})
	// 	})
	// )
})