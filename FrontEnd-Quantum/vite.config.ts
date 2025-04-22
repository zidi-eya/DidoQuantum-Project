import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  base: '/',
  plugins: [
    vue()
  ],  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // ceci supprime les warnings de Sass
        quietDeps: true,
      }
    }
  }
})
