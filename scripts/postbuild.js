import fs from 'fs'
import path from 'path'

// Copy index.html to both dist/ and dist/client/ for compatibility
const source = path.join(process.cwd(), 'index.html')
const targets = [
  path.join(process.cwd(), 'dist/index.html'),
  path.join(process.cwd(), 'dist/client/index.html')
]

if (fs.existsSync(source)) {
  targets.forEach(target => {
    const dir = path.dirname(target)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.copyFileSync(source, target)
  })
  console.log('Copied index.html to dist/ and dist/client/')
} else {
  console.error('index.html not found!')
  process.exit(1)
}
