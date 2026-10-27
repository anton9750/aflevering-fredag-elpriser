
const CACHE_NAVN = 'elpriser-nu-cache-v1'


const BASE = new URL('./', self.location).pathname


const PRECACHE_FILER = [BASE, BASE + 'manifest.webmanifest', BASE + 'favicon.svg', BASE + 'pwa-icon-192.png', BASE + 'pwa-icon-512.png']

self.addEventListener('install', (event) => {

  self.skipWaiting()

  event.waitUntil(caches.open(CACHE_NAVN).then((cache) => cache.addAll(PRECACHE_FILER)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {

      const cacheNavne = await caches.keys()
      await Promise.all(cacheNavne.filter((navn) => navn !== CACHE_NAVN).map((navn) => caches.delete(navn)))


      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)


  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }


  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAVN)
        const cachetSvar = await cache.match(BASE)
        return cachetSvar ?? Response.error()
      }),
    )
    return
  }


  event.respondWith(
    caches.match(request).then((cachetSvar) => {
      const netværksHentning = fetch(request)
        .then((netværksSvar) => {
          if (netværksSvar.ok) {
            const kopiTilCache = netværksSvar.clone()


            event.waitUntil(caches.open(CACHE_NAVN).then((cache) => cache.put(request, kopiTilCache)))
          }
          return netværksSvar
        })

        .catch(() => cachetSvar ?? Response.error())

      return cachetSvar ?? netværksHentning
    }),
  )
})
