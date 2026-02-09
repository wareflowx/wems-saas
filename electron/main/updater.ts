import { autoUpdater } from 'electron-updater'
import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'

class AppUpdater {
  private mainWindow: BrowserWindow | null = null

  constructor() {
    // Configure auto-updater
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'wareflowx',
      repo: 'wems-saas'
    })

    this.setupEventListeners()
  }

  public setMainWindow(window: BrowserWindow): void {
    this.mainWindow = window
  }

  private setupEventListeners(): void {
    // Checking for update
    autoUpdater.on('checking-for-update', () => {
      this.sendStatus('checking-for-update')
    })

    // Update available
    autoUpdater.on('update-available', (info) => {
      this.sendStatus('update-available', info)
    })

    // Update not available
    autoUpdater.on('update-not-available', (info) => {
      this.sendStatus('update-not-available', info)
    })

    // Download progress
    autoUpdater.on('download-progress', (progress) => {
      this.sendStatus('download-progress', progress)
    })

    // Update downloaded
    autoUpdater.on('update-downloaded', (info) => {
      this.sendStatus('update-downloaded', info)

      // Automatically install the update on Windows/Linux
      // On macOS, the user needs to quit and install manually
      if (process.platform !== 'darwin') {
        setTimeout(() => {
          autoUpdater.quitAndInstall()
        }, 5000)
      }
    })

    // Error
    autoUpdater.on('error', (error) => {
      this.sendStatus('update-error', error)
    })
  }

  private send.sendStatus: string, data?: unknown): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send('updater:event', { status, data })
    }
  }

  /**
   * Check for updates
   */
  public checkForUpdates(): void {
    if (app.isPackaged) {
      autoUpdater.checkForUpdates()
    } else {
      console.log('Skipping update check in development mode')
    }
  }

  /**
   * Download and install the update
   */
  public downloadUpdate(): void {
    if (app.isPackaged) {
      autoUpdater.downloadUpdate()
    }
  }

  /**
   * Quit and install the update
   */
  public quitAndInstall(): void {
    if (app.isPackaged) {
      autoUpdater.quitAndInstall()
    }
  }

  /**
   * Enable automatic update checks
   */
  public enableAutoUpdate(interval: number = 60 * 60 * 1000): void {
    if (!app.isPackaged) {
      console.log('Auto-update is disabled in development mode')
      return
    }

    // Check for updates on startup
    this.checkForUpdates()

    // Check for updates at regular intervals
    setInterval(() => {
      this.checkForUpdates()
    }, interval)
  }
}

// Singleton instance
const appUpdater = new AppUpdater()

export { appUpdater }
