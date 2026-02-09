import fs from 'fs'
import path from 'path'

// Copy index.html from dist/client to dist for electron-builder
const source = path.join(process.cwd(), 'dist/client/index.html')
const target = path.join(process.cwd(), 'dist/index.html')

if (fs.existsSync(source)) {
  fs.copyFileSync(source, target)
  console.log('Copied index.html to dist/')
} else {
  console.error('dist/client/index.html not found!')
  process.exit(1)
}
