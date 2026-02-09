import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods for window controls
contextBridge.exposeInMainWorld("electronAPI", {
  window: {
    minimize: () => ipcRenderer.send("window-minimize"),
    maximize: () => ipcRenderer.send("window-maximize"),
    unmaximize: () => ipcRenderer.send("window-unmaximize"),
    close: () => ipcRenderer.send("window-close"),
    isMaximized: () => ipcRenderer.invoke("window-is-maximized"),
  },
});
