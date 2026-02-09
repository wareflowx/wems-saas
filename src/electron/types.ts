/**
 * TypeScript type definitions for Electron API
 * Extends the global Window interface with electronAPI
 */

export interface ElectronAPI {
  // App information
  app: {
    getVersion: () => Promise<string>
    getPath: (name: string) => Promise<string>
    getName: () => Promise<string>
  }

  // Window controls
  window: {
    minimize: () => void
    maximize: () => void
    unmaximize: () => void
    close: () => void
    isMaximized: () => Promise<boolean>
  }

  // File system operations
  fs: {
    readDir: (path: string) => Promise<Array<{ name: string; isDirectory: boolean; isFile: boolean }>>
    readFile: (path: string) => Promise<string>
    writeFile: (path: string, data: unknown) => Promise<{ success: boolean }>
    exists: (path: string) => Promise<boolean>
    mkdir: (path: string) => Promise<{ success: boolean }>
  }

  // Dialogs
  dialog: {
    openFile: (options?: {
      title?: string
      filters?: Array<{ name: string; extensions: string[] }>
      properties?: string[]
    }) => Promise<{ canceled: boolean; filePaths: string[] }>

    saveFile: (options?: {
      title?: string
      filters?: Array<{ name: string; extensions: string[] }>
      defaultPath?: string
    }) => Promise<{ canceled: boolean; filePath?: string }>

    openDirectory: (options?: {
      title?: string
      properties?: string[]
    }) => Promise<{ canceled: boolean; filePaths: string[] }>
  }

  // Notifications
  notification: {
    show: (options: { title: string; body: string }) => void
  }

  // Platform info
  platform: {
    getPlatform: () => NodeJS.Platform
    getArch: () => string
  }

  // Auto-updater
  updater: {
    checkForUpdates: () => Promise<void>
    downloadUpdate: () => Promise<void>
    quitAndInstall: () => Promise<void>
    onEvent: (callback: (event: { status: string; data?: unknown }) => void) => () => void
  }
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
