import { app, BrowserWindow, dialog, ipcMain, Notification, shell } from 'electron'
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { ipcChannels } from './channels'
import { appUpdater } from '../updater'

/**
 * Register all IPC handlers
 */
export function registerIPCHandlers(): void {
  // App handlers
  ipcMain.handle(ipcChannels.app.getVersion, () => {
    return app.getVersion()
  })

  ipcMain.handle(ipcChannels.app.getPath, (_event, name: string) => {
    return app.getPath(name as any)
  })

  ipcMain.handle(ipcChannels.app.getName, () => {
    return app.getName()
  })

  // Window control handlers
  ipcMain.on(ipcChannels.window.minimize, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.minimize()
  })

  ipcMain.on(ipcChannels.window.maximize, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.maximize()
  })

  ipcMain.on(ipcChannels.window.unmaximize, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.unmaximize()
  })

  ipcMain.on(ipcChannels.window.close, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.close()
  })

  ipcMain.handle(ipcChannels.window.isMaximized, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    return win?.isMaximized() ?? false
  })

  // File system handlers
  ipcMain.handle(ipcChannels.fs.readDir, async (_event, path: string) => {
    try {
      const files = await readdir(path, { withFileTypes: true })
      return files.map((file) => ({
        name: file.name,
        isDirectory: file.isDirectory(),
        isFile: file.isFile()
      }))
    } catch (error) {
      console.error('Error reading directory:', error)
      throw error
    }
  })

  ipcMain.handle(ipcChannels.fs.readFile, async (_event, path: string) => {
    try {
      return await readFile(path, 'utf-8')
    } catch (error) {
      console.error('Error reading file:', error)
      throw error
    }
  })

  ipcMain.handle(ipcChannels.fs.writeFile, async (_event, path: string, data: unknown) => {
    try {
      const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      await writeFile(path, content, 'utf-8')
      return { success: true }
    } catch (error) {
      console.error('Error writing file:', error)
      throw error
    }
  })

  ipcMain.handle(ipcChannels.fs.exists, async (_event, path: string) => {
    return existsSync(path)
  })

  ipcMain.handle(ipcChannels.fs.mkdir, async (_event, path: string) => {
    try {
      await mkdir(path, { recursive: true })
      return { success: true }
    } catch (error) {
      console.error('Error creating directory:', error)
      throw error
    }
  })

  // Dialog handlers
  ipcMain.handle(
    ipcChannels.dialog.openFile,
    async (
      event,
      options?: {
        title?: string
        filters?: Array<{ name: string; extensions: string[] }>
        properties?: string[]
      }
    ) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) return { canceled: true, filePaths: [] }

      const result = await dialog.showOpenDialog(win, {
        title: options?.title || 'Open File',
        filters: options?.filters,
        properties: (options?.properties as any[]) || ['openFile']
      })

      return result
    }
  )

  ipcMain.handle(
    ipcChannels.dialog.saveFile,
    async (
      event,
      options?: {
        title?: string
        filters?: Array<{ name: string; extensions: string[] }>
        defaultPath?: string
      }
    ) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) return { canceled: true, filePath: '' }

      const result = await dialog.showSaveDialog(win, {
        title: options?.title || 'Save File',
        filters: options?.filters,
        defaultPath: options?.defaultPath
      })

      return result
    }
  )

  ipcMain.handle(
    ipcChannels.dialog.openDirectory,
    async (event, options?: { title?: string; properties?: string[] }) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) return { canceled: true, filePaths: [] }

      const result = await dialog.showOpenDialog(win, {
        title: options?.title || 'Select Directory',
        properties: (options?.properties as any[]) || ['openDirectory']
      })

      return result
    }
  )

  // Notification handlers (send only)
  ipcMain.on(ipcChannels.notification.show, (_event, options: { title: string; body: string }) => {
    if (Notification.isSupported()) {
      new Notification({
        title: options.title,
        body: options.body
      }).show()
    }
  })

  // Updater handlers
  ipcMain.handle(ipcChannels.updater.checkForUpdates, () => {
    return appUpdater.checkForUpdates()
  })

  ipcMain.handle(ipcChannels.updater.downloadUpdate, () => {
    return appUpdater.downloadUpdate()
  })

  ipcMain.handle(ipcChannels.updater.quitAndInstall, () => {
    return appUpdater.quitAndInstall()
  })
}
