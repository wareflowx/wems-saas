import { app, ipcMain, BrowserWindow, dialog, Notification, Menu, shell } from "electron";
import { join } from "node:path";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import electronUpdater from "electron-updater";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const ipcChannels = {
  // App channels
  app: {
    getVersion: "app:getVersion",
    getPath: "app:getPath",
    getName: "app:getName"
  },
  // Window control channels
  window: {
    minimize: "window:minimize",
    maximize: "window:maximize",
    unmaximize: "window:unmaximize",
    close: "window:close",
    isMaximized: "window:isMaximized"
  },
  // File system channels
  fs: {
    readDir: "fs:readDir",
    readFile: "fs:readFile",
    writeFile: "fs:writeFile",
    exists: "fs:exists",
    mkdir: "fs:mkdir"
  },
  // Dialog channels
  dialog: {
    openFile: "dialog:openFile",
    saveFile: "dialog:saveFile",
    openDirectory: "dialog:openDirectory"
  },
  // Notification channels (send only, no response expected)
  notification: {
    show: "notification:show"
  },
  // Updater channels
  updater: {
    checkForUpdates: "updater:checkForUpdates",
    downloadUpdate: "updater:downloadUpdate",
    quitAndInstall: "updater:quitAndInstall"
  }
};
const { autoUpdater } = electronUpdater;
class AppUpdater {
  mainWindow = null;
  constructor() {
    autoUpdater.setFeedURL({
      provider: "github",
      owner: "wareflowx",
      repo: "wems-saas"
    });
    this.setupEventListeners();
  }
  setMainWindow(window) {
    this.mainWindow = window;
  }
  setupEventListeners() {
    autoUpdater.on("checking-for-update", () => {
      this.sendStatus("checking-for-update");
    });
    autoUpdater.on("update-available", (info) => {
      this.sendStatus("update-available", info);
    });
    autoUpdater.on("update-not-available", (info) => {
      this.sendStatus("update-not-available", info);
    });
    autoUpdater.on("download-progress", (progress) => {
      this.sendStatus("download-progress", progress);
    });
    autoUpdater.on("update-downloaded", (info) => {
      this.sendStatus("update-downloaded", info);
      if (process.platform !== "darwin") {
        setTimeout(() => {
          autoUpdater.quitAndInstall();
        }, 5e3);
      }
    });
    autoUpdater.on("error", (error) => {
      this.sendStatus("update-error", error);
    });
  }
  sendStatus(status, data) {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send("updater:event", { status, data });
    }
  }
  /**
   * Check for updates
   */
  checkForUpdates() {
    if (app.isPackaged) {
      autoUpdater.checkForUpdates();
    } else {
      console.log("Skipping update check in development mode");
    }
  }
  /**
   * Download and install the update
   */
  downloadUpdate() {
    if (app.isPackaged) {
      autoUpdater.downloadUpdate();
    }
  }
  /**
   * Quit and install the update
   */
  quitAndInstall() {
    if (app.isPackaged) {
      autoUpdater.quitAndInstall();
    }
  }
  /**
   * Enable automatic update checks
   */
  enableAutoUpdate(interval = 60 * 60 * 1e3) {
    if (!app.isPackaged) {
      console.log("Auto-update is disabled in development mode");
      return;
    }
    this.checkForUpdates();
    setInterval(() => {
      this.checkForUpdates();
    }, interval);
  }
}
const appUpdater = new AppUpdater();
function registerIPCHandlers() {
  ipcMain.handle(ipcChannels.app.getVersion, () => {
    return app.getVersion();
  });
  ipcMain.handle(ipcChannels.app.getPath, (_event, name) => {
    return app.getPath(name);
  });
  ipcMain.handle(ipcChannels.app.getName, () => {
    return app.getName();
  });
  ipcMain.on(ipcChannels.window.minimize, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.minimize();
  });
  ipcMain.on(ipcChannels.window.maximize, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.maximize();
  });
  ipcMain.on(ipcChannels.window.unmaximize, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.unmaximize();
  });
  ipcMain.on(ipcChannels.window.close, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.close();
  });
  ipcMain.handle(ipcChannels.window.isMaximized, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    return win?.isMaximized() ?? false;
  });
  ipcMain.handle(ipcChannels.fs.readDir, async (_event, path) => {
    try {
      const files = await readdir(path, { withFileTypes: true });
      return files.map((file) => ({
        name: file.name,
        isDirectory: file.isDirectory(),
        isFile: file.isFile()
      }));
    } catch (error) {
      console.error("Error reading directory:", error);
      throw error;
    }
  });
  ipcMain.handle(ipcChannels.fs.readFile, async (_event, path) => {
    try {
      return await readFile(path, "utf-8");
    } catch (error) {
      console.error("Error reading file:", error);
      throw error;
    }
  });
  ipcMain.handle(ipcChannels.fs.writeFile, async (_event, path, data) => {
    try {
      const content = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      await writeFile(path, content, "utf-8");
      return { success: true };
    } catch (error) {
      console.error("Error writing file:", error);
      throw error;
    }
  });
  ipcMain.handle(ipcChannels.fs.exists, async (_event, path) => {
    return existsSync(path);
  });
  ipcMain.handle(ipcChannels.fs.mkdir, async (_event, path) => {
    try {
      await mkdir(path, { recursive: true });
      return { success: true };
    } catch (error) {
      console.error("Error creating directory:", error);
      throw error;
    }
  });
  ipcMain.handle(
    ipcChannels.dialog.openFile,
    async (event, options) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (!win) return { canceled: true, filePaths: [] };
      const result = await dialog.showOpenDialog(win, {
        title: options?.title || "Open File",
        filters: options?.filters,
        properties: options?.properties || ["openFile"]
      });
      return result;
    }
  );
  ipcMain.handle(
    ipcChannels.dialog.saveFile,
    async (event, options) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (!win) return { canceled: true, filePath: "" };
      const result = await dialog.showSaveDialog(win, {
        title: options?.title || "Save File",
        filters: options?.filters,
        defaultPath: options?.defaultPath
      });
      return result;
    }
  );
  ipcMain.handle(
    ipcChannels.dialog.openDirectory,
    async (event, options) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (!win) return { canceled: true, filePaths: [] };
      const result = await dialog.showOpenDialog(win, {
        title: options?.title || "Select Directory",
        properties: options?.properties || ["openDirectory"]
      });
      return result;
    }
  );
  ipcMain.on(ipcChannels.notification.show, (_event, options) => {
    if (Notification.isSupported()) {
      new Notification({
        title: options.title,
        body: options.body
      }).show();
    }
  });
  ipcMain.handle(ipcChannels.updater.checkForUpdates, () => {
    return appUpdater.checkForUpdates();
  });
  ipcMain.handle(ipcChannels.updater.downloadUpdate, () => {
    return appUpdater.downloadUpdate();
  });
  ipcMain.handle(ipcChannels.updater.quitAndInstall, () => {
    return appUpdater.quitAndInstall();
  });
}
function createApplicationMenu(options) {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "New Employee",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              focusedWindow.webContents.send("navigate", "/employees/new");
            }
          }
        },
        { type: "separator" },
        {
          label: "Settings",
          accelerator: "CmdOrCtrl+,",
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              focusedWindow.webContents.send("navigate", "/settings/system");
            }
          }
        },
        { type: "separator" },
        {
          role: "quit",
          accelerator: "CmdOrCtrl+Q"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo", accelerator: "CmdOrCtrl+Z" },
        { role: "redo", accelerator: "CmdOrCtrl+Shift+Z" },
        { type: "separator" },
        { role: "cut", accelerator: "CmdOrCtrl+X" },
        { role: "copy", accelerator: "CmdOrCtrl+C" },
        { role: "paste", accelerator: "CmdOrCtrl+V" },
        { role: "selectall", accelerator: "CmdOrCtrl+A" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload", accelerator: "CmdOrCtrl+R" },
        { role: "forceReload", accelerator: "CmdOrCtrl+Shift+R" },
        { role: "toggleDevTools", accelerator: "CmdOrCtrl+Shift+I" },
        { type: "separator" },
        { role: "resetZoom", accelerator: "CmdOrCtrl+0" },
        { role: "zoomIn", accelerator: "CmdOrCtrl+Plus" },
        { role: "zoomOut", accelerator: "CmdOrCtrl+-" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      label: "History",
      submenu: [
        { role: "back", accelerator: "Alt+Left" },
        { role: "forward", accelerator: "Alt+Right" }
      ]
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        { type: "separator" },
        { role: "front" }
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            await shell.openExternal("https://github.com/wareflowx/wems-saas");
          }
        },
        {
          label: "Documentation",
          click: async () => {
            await shell.openExternal("https://github.com/wareflowx/wems-saas/wiki");
          }
        },
        {
          label: "Community Discussions",
          click: async () => {
            await shell.openExternal("https://github.com/wareflowx/wems-saas/discussions");
          }
        },
        { type: "separator" },
        {
          label: "Search Issues",
          click: async () => {
            await shell.openExternal("https://github.com/wareflowx/wems-saas/issues");
          }
        }
      ]
    }
  ];
  if (options.devMode) {
    template.push({
      label: "Development",
      submenu: [
        { role: "toggleDevTools" },
        { type: "separator" },
        {
          label: "Clear Cache",
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              focusedWindow.webContents.session.clearCache();
            }
          }
        },
        {
          label: "Clear Storage",
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
              focusedWindow.webContents.session.clearStorageData();
            }
          }
        }
      ]
    });
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
let mainWindow = null;
const isDev = process.env.NODE_ENV === "development";
registerIPCHandlers();
createApplicationMenu({ devMode: isDev });
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: "#ffffff",
    show: false,
    // Don't show until ready-to-show
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: false,
      // Required for contextBridge in some cases
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true
    }
  });
  appUpdater.setMainWindow(mainWindow);
  if (isDev) {
    mainWindow.loadURL("http://127.0.0.1:8000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Preload script loaded");
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("web-contents-created", (_event, contents) => {
  contents.on("new-window", (event, url) => {
    event.preventDefault();
  });
});
