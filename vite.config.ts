import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import istanbul from 'rollup-plugin-istanbul';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'polyfills/process-es6.js'),
      'readable-stream': 'vite-compatible-readable-stream',
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    svgr(),
    eslintPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        theme_color: '#B74DFF',
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
          'primary-color': 'rgba(183,77,255,1)',
          'info-color': 'rgba(0,153,255,1)',
          'text-color': 'rgba(146,147,166,1)',
          'error-color': 'rgba(251,93,71,1)',
          'input-bg': 'rgba(20,20,25,1)',
          'input-addon-bg': 'rgba(20,20,25,1)',
          'input-border-color': 'rgba(55,58,71,1)',
          'select-border-color': 'rgba(55,58,71,1)',
          'border-radius-base': '4px',
          'font-family': 'Inter, sans-serif',
          'font-size-base': '12px',
          'btn-font-size-lg': '12px',
          'btn-font-weight': 700,
        },
      },
    },
  },
}));
