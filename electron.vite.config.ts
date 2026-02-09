import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'electron/main/index.ts')
      }
    },
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'electron/preload/index.ts')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: '.',
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'index.html')
      }
    },
    server: {
      host: '127.0.0.1',
      port: 8000,
      strictPort: true
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@tanstack/react-start': resolve(__dirname, 'src/tanstack-start-stub.ts')
      }
    },
    plugins: [
      viteTsConfigPaths({
        projects: ['./tsconfig.json']
      }),
      tailwindcss(),
      react()
    ]
  }
})
