import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
  // App information
  app: {
    getVersion: () => ipcRenderer.invoke("app:getVersion"),
    getPath: (name) => ipcRenderer.invoke("app:getPath", name),
    getName: () => ipcRenderer.invoke("app:getName")
  },
  // Window controls
  window: {
    minimize: () => ipcRenderer.send("window:minimize"),
    maximize: () => ipcRenderer.send("window:maximize"),
    unmaximize: () => ipcRenderer.send("window:unmaximize"),
    close: () => ipcRenderer.send("window:close"),
    isMaximized: () => ipcRenderer.invoke("window:isMaximized")
  },
  // File system operations
  fs: {
    readDir: (path) => ipcRenderer.invoke("fs:readDir", path),
    readFile: (path) => ipcRenderer.invoke("fs:readFile", path),
    writeFile: (path, data) => ipcRenderer.invoke("fs:writeFile", path, data),
    exists: (path) => ipcRenderer.invoke("fs:exists", path),
    mkdir: (path) => ipcRenderer.invoke("fs:mkdir", path)
  },
  // Dialogs
  dialog: {
    openFile: (options) => ipcRenderer.invoke("dialog:openFile", options),
    saveFile: (options) => ipcRenderer.invoke("dialog:saveFile", options),
    openDirectory: (options) => ipcRenderer.invoke("dialog:openDirectory", options)
  },
  // Notifications
  notification: {
    show: (options) => ipcRenderer.send("notification:show", options)
  },
  // Platform info
  platform: {
    getPlatform: () => process.platform,
    getArch: () => process.arch
  },
  // Auto-updater
  updater: {
    checkForUpdates: () => ipcRenderer.invoke("updater:checkForUpdates"),
    downloadUpdate: () => ipcRenderer.invoke("updater:downloadUpdate"),
    quitAndInstall: () => ipcRenderer.invoke("updater:quitAndInstall"),
    onEvent: (callback) => {
      const listener = (_event, data) => {
        callback(data);
      };
      ipcRenderer.on("updater:event", listener);
      return () => ipcRenderer.removeListener("updater:event", listener);
    }
  }
});
