import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'
import { registerIPCHandlers } from './ipc/handlers'
import { createApplicationMenu } from './menu'
import { appUpdater } from './updater'

let mainWindow: BrowserWindow | null = null

const isDev = process.env.NODE_ENV === 'development'

// Register IPC handlers
registerIPCHandlers()

// Create application menu
createApplicationMenu({ devMode: isDev })

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#ffffff',
    show: false, // Don't show until ready-to-show
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false, // Required for contextBridge in some cases
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true
    }
  })

  // Set main window for updater
  appUpdater.setMainWindow(mainWindow)

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:8000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Wait for the preload script to be ready
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Preload script loaded')
  })

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// App lifecycle
app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  // Quit on all platforms except macOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Security: Prevent new window creation
app.on('web-contents-created', (_event, contents) => {
  contents.on('new-window', (event, url) => {
    event.preventDefault()
  })
})
