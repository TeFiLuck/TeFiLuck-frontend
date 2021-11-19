import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import istanbul from 'rollup-plugin-istanbul';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths(),
    ViteAliases({}),
    react(),
    eslintPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'robots.txt',
        'apple-touch-icon.png',
        'icons/*.svg',
        'fonts/*.woff2'
      ],
      manifest: {
        theme_color: '#BD34FE',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    mode === 'test' &&
      istanbul({
        include: ['src/**/*.tsx']
      })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': 'rgba(192,0,255,1)',
          'text-color': 'rgba(146,147,166,1)',
          'error-color': 'rgba(251,93,71,1)',
          'font-family': 'Inter, sans-serif',
          'font-size-base': '12px',
          'btn-font-weight': 700,
        },
      },
    },
  },
}))
