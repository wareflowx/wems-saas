import { app, BrowserWindow, Menu, MenuItemConstructorOptions, shell } from 'electron'

interface MenuOptions {
  devMode: boolean
}

/**
 * Create the application menu
 */
export function createApplicationMenu(options: MenuOptions): void {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Employee',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Navigate to new employee route
            const focusedWindow = BrowserWindow.getFocusedWindow()
            if (focusedWindow) {
              focusedWindow.webContents.send('navigate', '/employees/new')
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Settings',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow()
            if (focusedWindow) {
              focusedWindow.webContents.send('navigate', '/settings/system')
            }
          }
        },
        { type: 'separator' },
        {
          role: 'quit',
          accelerator: 'CmdOrCtrl+Q'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo', accelerator: 'CmdOrCtrl+Z' },
        { role: 'redo', accelerator: 'CmdOrCtrl+Shift+Z' },
        { type: 'separator' },
        { role: 'cut', accelerator: 'CmdOrCtrl+X' },
        { role: 'copy', accelerator: 'CmdOrCtrl+C' },
        { role: 'paste', accelerator: 'CmdOrCtrl+V' },
        { role: 'selectall', accelerator: 'CmdOrCtrl+A' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', accelerator: 'CmdOrCtrl+R' },
        { role: 'forceReload', accelerator: 'CmdOrCtrl+Shift+R' },
        { role: 'toggleDevTools', accelerator: 'CmdOrCtrl+Shift+I' },
        { type: 'separator' },
        { role: 'resetZoom', accelerator: 'CmdOrCtrl+0' },
        { role: 'zoomIn', accelerator: 'CmdOrCtrl+Plus' },
        { role: 'zoomOut', accelerator: 'CmdOrCtrl+-' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'History',
      submenu: [
        { role: 'back', accelerator: 'Alt+Left' },
        { role: 'forward', accelerator: 'Alt+Right' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://github.com/wareflowx/wems-saas')
          }
        },
        {
          label: 'Documentation',
          click: async () => {
            await shell.openExternal('https://github.com/wareflowx/wems-saas/wiki')
          }
        },
        {
          label: 'Community Discussions',
          click: async () => {
            await shell.openExternal('https://github.com/wareflowx/wems-saas/discussions')
          }
        },
        { type: 'separator' },
        {
          label: 'Search Issues',
          click: async () => {
            await shell.openExternal('https://github.com/wareflowx/wems-saas/issues')
          }
        }
      ]
    }
  ]

  // Add development menu if in dev mode
  if (options.devMode) {
    template.push({
      label: 'Development',
      submenu: [
        { role: 'toggleDevTools' },
        { type: 'separator' },
        {
          label: 'Clear Cache',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow()
            if (focusedWindow) {
              focusedWindow.webContents.session.clearCache()
            }
          }
        },
        {
          label: 'Clear Storage',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow()
            if (focusedWindow) {
              focusedWindow.webContents.session.clearStorageData()
            }
          }
        }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

/**
 * Create the context menu for text input fields
 */
export function createContextMenu(): void {
  const template: MenuItemConstructorOptions[] = [
    { role: 'undo', accelerator: 'CmdOrCtrl+Z' },
    { role: 'redo', accelerator: 'CmdOrCtrl+Shift+Z' },
    { type: 'separator' },
    { role: 'cut', accelerator: 'CmdOrCtrl+X' },
    { role: 'copy', accelerator: 'CmdOrCtrl+C' },
    { role: 'paste', accelerator: 'CmdOrCtrl+V' },
    { type: 'separator' },
    { role: 'selectall', accelerator: 'CmdOrCtrl+A' }
  ]

  const menu = Menu.buildFromTemplate(template)
  return menu
}
