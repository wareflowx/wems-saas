import { contextBridge, ipcRenderer } from 'electron'

/**
 * Expose protected methods that allow the renderer process to use
 * the ipcRenderer without exposing the entire object
 */
contextBridge.exposeInMainWorld('electronAPI', {
  // App information
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    getPath: (name: string) => ipcRenderer.invoke('app:getPath', name),
    getName: () => ipcRenderer.invoke('app:getName')
  },

  // Window controls
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    unmaximize: () => ipcRenderer.send('window:unmaximize'),
    close: () => ipcRenderer.send('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized')
  },

  // File system operations
  fs: {
    readDir: (path: string) => ipcRenderer.invoke('fs:readDir', path),
    readFile: (path: string) => ipcRenderer.invoke('fs:readFile', path),
    writeFile: (path: string, data: unknown) =>
      ipcRenderer.invoke('fs:writeFile', path, data),
    exists: (path: string) => ipcRenderer.invoke('fs:exists', path),
    mkdir: (path: string) => ipcRenderer.invoke('fs:mkdir', path)
  },

  // Dialogs
  dialog: {
    openFile: (options?: {
      title?: string
      filters?: Array<{ name: string; extensions: string[] }>
      properties?: string[]
    }) => ipcRenderer.invoke('dialog:openFile', options),
    saveFile: (options?: {
      title?: string
      filters?: Array<{ name: string; extensions: string[] }>
      defaultPath?: string
    }) => ipcRenderer.invoke('dialog:saveFile', options),
    openDirectory: (options?: { title?: string; properties?: string[] }) =>
      ipcRenderer.invoke('dialog:openDirectory', options)
  },

  // Notifications
  notification: {
    show: (options: { title: string; body: string }) =>
      ipcRenderer.send('notification:show', options)
  },

  // Platform info
  platform: {
    getPlatform: () => process.platform,
    getArch: () => process.arch
  }
})

// Type definitions for the exposed API
export type ElectronAPI = typeof electronAPI

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
