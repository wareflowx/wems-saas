/**
 * IPC Channel definitions
 * Centralized channel names to avoid typos and enable type safety
 */
export const ipcChannels = {
  // App channels
  app: {
    getVersion: 'app:getVersion',
    getPath: 'app:getPath',
    getName: 'app:getName'
  },

  // Window control channels
  window: {
    minimize: 'window:minimize',
    maximize: 'window:maximize',
    unmaximize: 'window:unmaximize',
    close: 'window:close',
    isMaximized: 'window:isMaximized'
  },

  // File system channels
  fs: {
    readDir: 'fs:readDir',
    readFile: 'fs:readFile',
    writeFile: 'fs:writeFile',
    exists: 'fs:exists',
    mkdir: 'fs:mkdir'
  },

  // Dialog channels
  dialog: {
    openFile: 'dialog:openFile',
    saveFile: 'dialog:saveFile',
    openDirectory: 'dialog:openDirectory'
  },

  // Notification channels (send only, no response expected)
  notification: {
    show: 'notification:show'
  }
} as const

// Type-safe channel names
export type IPCChannel = typeof ipcChannels
