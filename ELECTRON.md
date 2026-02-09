# Electron Integration Guide

This document provides comprehensive information about the Electron integration in WEMS SaaS.

## Overview

WEMS SaaS now supports Electron for desktop application deployment on Windows, macOS, and Linux. The integration uses:

- **electron-vite** - Fast development and build tooling
- **electron-builder** - Multi-platform packaging and distribution
- **electron-updater** - Automatic updates via GitHub Releases
- **Type-safe IPC** - Secure communication between main and renderer processes

## Project Structure

```
wems-saas/
├── electron/                    # Electron-specific code
│   ├── main/                   # Main process
│   │   ├── index.ts           # Entry point
│   │   ├── menu.ts            # Application menu
│   │   ├── ipc/               # IPC communication
│   │   │   ├── channels.ts    # Channel definitions
│   │   │   └── handlers.ts    # IPC handlers
│   │   └── updater.ts         # Auto-updater
│   ├── preload/               # Preload scripts
│   │   └── index.ts           # Context bridge
│   └── resources/             # Native resources
│       └── icons/             # Application icons
├── src/
│   └── electron/              # Renderer-specific Electron code
│       ├── api.ts             # Typed API wrapper
│       └── types.ts           # TypeScript definitions
└── electron.vite.config.ts    # Electron Vite configuration
```

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run in development mode:**
   ```bash
   pnpm electron:dev
   ```

This will:
- Start the Vite dev server
- Launch Electron with hot reload
- Open DevTools automatically

### Building for Production

#### Build Electron App:
```bash
pnpm electron:build
```

#### Build for Specific Platforms:

**Windows:**
```bash
pnpm build:win
```
Creates: `release/WEMS Setup 1.0.0.exe` (NSIS installer)

**macOS:**
```bash
pnpm build:mac
```
Creates: `release/WEMS-1.0.0.dmg` (DMG installer)
`release/WEMS.app` (Application bundle)

**Linux:**
```bash
pnpm build:linux
```
Creates: `release/WEMS-1.0.0.AppImage` (AppImage)

### Configuration

Build configuration is in `package.json` under the `build` key:

```json
{
  "build": {
    "appId": "com.wareflowx.wems",
    "productName": "WEMS",
    "directories": {
      "output": "release"
    },
    "win": { "target": ["nsis"] },
    "mac": { "target": ["dmg"] },
    "linux": { "target": ["AppImage"] }
  }
}
```

## Electron API Usage

### Checking for Electron Environment

```typescript
import { electron } from '@/electron/api'

if (electron.isElectron()) {
  // Running in Electron
  const version = await electron.app.getVersion()
} else {
  // Running in browser
}
```

### Window Controls

```typescript
import { electron } from '@/electron/api'

// Minimize window
electron.window.minimize()

// Maximize/restore
electron.window.maximize()

// Close window
electron.window.close()

// Check if maximized
const isMaximized = await electron.window.isMaximized()
```

### File System Operations

```typescript
import { electron } from '@/electron/api'

// Read directory
const files = await electron.fs.readDir('/path/to/dir')

// Read file
const content = await electron.fs.readFile('/path/to/file.txt')

// Write file
await electron.fs.writeFile('/path/to/file.json', data)

// Check if exists
const exists = await electron.fs.exists('/path/to/file')

// Create directory
await electron.fs.mkdir('/path/to/new/dir')
```

### Native Dialogs

```typescript
import { electron } from '@/electron/api'

// Open file dialog
const result = await electron.dialog.openFile({
  title: 'Select a file',
  filters: [
    { name: 'Documents', extensions: ['pdf', 'doc', 'docx'] }
  ]
})

if (!result.canceled) {
  const filePath = result.filePaths[0]
}

// Save file dialog
const saveResult = await electron.dialog.saveFile({
  title: 'Save document',
  filters: [{ name: 'PDF', extensions: ['pdf'] }]
})

// Open directory dialog
const dirResult = await electron.dialog.openDirectory()
```

### Notifications

```typescript
import { electron } from '@/electron/api'

electron.notification.show({
  title: 'Update Available',
  body: 'A new version is ready to install'
})
```

### Auto-Updater

```typescript
import { electron } from '@/electron/api'

// Check for updates
await electron.updater.checkForUpdates()

// Download update
await electron.updater.downloadUpdate()

// Listen for update events
const unsubscribe = electron.updater.onEvent((event) => {
  switch (event.status) {
    case 'update-available':
      console.log('Update available:', event.data)
      break
    case 'download-progress':
      console.log('Progress:', event.data)
      break
    case 'update-downloaded':
      console.log('Update ready!')
      break
    case 'update-error':
      console.error('Update error:', event.data)
      break
  }
})

// Clean up listener
unsubscribe()
```

## Security

### Security Features Implemented

1. **Context Isolation** - Enabled by default
2. **Node Integration** - Disabled in renderer
3. **Context Bridge** - Secure API exposure
4. **Content Security Policy** - Web security enabled
5. **Type-Safe IPC** - Validated communication

### Security Best Practices

- Never expose Node.js APIs directly to renderer
- Validate all IPC message inputs
- Use `contextBridge` for all renderer APIs
- Keep Electron updated to latest version
- Sign your applications for distribution

## Auto-Updates

### How It Works

1. **Update Check:** App checks GitHub Releases on startup and periodically
2. **Download:** Updates downloaded automatically in background
3. **Install:** Windows/Linux install automatically; macOS requires manual quit
4. **Distribution:** Uses GitHub Releases for update hosting

### Enabling Auto-Updates

Auto-updates are enabled by default in production. To configure:

```typescript
// electron/main/updater.ts
appUpdater.enableAutoUpdate(interval: number)
```

### Publishing Updates

1. Bump version in `package.json`
2. Create a new git tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
3. Create a GitHub Release with the tag
4. Electron will auto-detect the new version

## Troubleshooting

### Common Issues

**Hot Module Replacement (HMR) not working:**
- Ensure `ELECTRON_RENDERER_URL` is set correctly
- Check that Vite dev server is running on port 3000

**Build fails on Windows:**
- Run PowerShell as Administrator
- Ensure Windows SDK is installed

**Auto-updater not working:**
- Only works in packaged builds (not dev)
- Check GitHub Releases configuration
- Verify `publish` settings in package.json

**Icons not displaying:**
- Add icons to `electron/resources/icons/`
- Windows: `icon.ico`
- macOS: `icon.icns`
- Linux: `icon.png`

### Getting Logs

**Development:**
- DevTools opens automatically
- Check console for errors

**Production:**
```bash
# Windows
WEMS.exe --enable-logging

# macOS
./WEMS.app/Contents/MacOS/WEMS --enable-logging

# Linux
./WEMS --enable-logging
```

Logs are located at:
- Windows: `%USERPROFILE%\AppData\Roaming\wems-saas\logs`
- macOS: `~/Library/Logs/wems-saas`
- Linux: `~/.config/wems-saas/logs`

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-vite Guide](https://electron-vite.github.io/guide/)
- [electron-builder](https://www.electron.build/)
- [electron-updater](https://www.electron.build/auto-update)
- [TypeScript for Electron](https://www.electronjs.org/docs/latest/tutorial/tutorial-typescript)

## Contributing

When making changes to Electron-related code:

1. Test in both web and Electron environments
2. Use `electron.isElectron()` checks where needed
3. Update TypeScript definitions if adding new APIs
4. Test on all target platforms if possible
5. Ensure security best practices are followed

## License

See LICENSE file for details.
