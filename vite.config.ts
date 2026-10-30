import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon.svg'],
      manifest: {
        name: 'ELPrisen.nu',
        short_name: 'ELPrisen.nu',
        description: 'Se den aktuelle elpris i Danmark lige nu, samt historik og oversigt over dagens priser.',
        lang: 'da',
        start_url: '.',
        scope: '.',
        id: '.',
        display: 'standalone',
        background_color: '#201E1E',
        theme_color: '#201E1E',
        icons: [
          { src: 'pwa-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'pwa-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://www.elprisenligenu.dk',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'elpris-api-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 14,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
