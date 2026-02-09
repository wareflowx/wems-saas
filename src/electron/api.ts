/**
 * Type-safe Electron API wrapper for renderer process
 * Provides clean, typed access to Electron functionality from React components
 */

// Check if running in Electron
export const isElectron = () => {
  return typeof window !== 'undefined' && window.electronAPI !== undefined
}

// Get the Electron API (throws if not in Electron)
const getElectronAPI = () => {
  if (!isElectron()) {
    throw new Error('Electron API is not available. This only works in Electron context.')
  }
  return window.electronAPI
}

// App information APIs
export const appAPI = {
  getVersion: () => getElectronAPI().app.getVersion(),
  getPath: (name: string) => getElectronAPI().app.getPath(name),
  getName: () => getElectronAPI().app.getName()
}

// Window control APIs
export const windowAPI = {
  minimize: () => getElectronAPI().window.minimize(),
  maximize: () => getElectronAPI().window.maximize(),
  unmaximize: () => getElectronAPI().window.unmaximize(),
  close: () => getElectronAPI().window.close(),
  isMaximized: () => getElectronAPI().window.isMaximized()
}

// File system APIs
export const fsAPI = {
  readDir: (path: string) => getElectronAPI().fs.readDir(path),
  readFile: (path: string) => getElectronAPI().fs.readFile(path),
  writeFile: (path: string, data: unknown) => getElectronAPI().fs.writeFile(path, data),
  exists: (path: string) => getElectronAPI().fs.exists(path),
  mkdir: (path: string) => getElectronAPI().fs.mkdir(path)
}

// Dialog APIs
export const dialogAPI = {
  openFile: (options?: {
    title?: string
    filters?: Array<{ name: string; extensions: string[] }>
    properties?: string[]
  }) => getElectronAPI().dialog.openFile(options),

  saveFile: (options?: {
    title?: string
    filters?: Array<{ name: string; extensions: string[] }>
    defaultPath?: string
  }) => getElectronAPI().dialog.saveFile(options),

  openDirectory: (options?: { title?: string; properties?: string[] }) =>
    getElectronAPI().dialog.openDirectory(options)
}

// Notification APIs
export const notificationAPI = {
  show: (options: { title: string; body: string }) =>
    getElectronAPI().notification.show(options)
}

// Platform info APIs
export const platformAPI = {
  getPlatform: () => getElectronAPI().platform.getPlatform(),
  getArch: () => getElectronAPI().platform.getArch()
}

// Updater APIs
export const updaterAPI = {
  checkForUpdates: () => getElectronAPI().updater.checkForUpdates(),
  downloadUpdate: () => getElectronAPI().updater.downloadUpdate(),
  quitAndInstall: () => getElectronAPI().updater.quitAndInstall(),
  onEvent: (callback: (event: { status: string; data?: unknown }) => void) =>
    getElectronAPI().updater.onEvent(callback)
}

// Combined API object
export const electron = {
  app: appAPI,
  window: windowAPI,
  fs: fsAPI,
  dialog: dialogAPI,
  notification: notificationAPI,
  platform: platformAPI,
  updater: updaterAPI,
  isElectron
}

export default electron
