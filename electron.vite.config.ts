import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/router-plugin/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      tanstackStart(),
      react(),
      // Add tailwindcss plugin for renderer
    ]
  }
})
