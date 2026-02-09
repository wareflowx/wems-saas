import { app, ipcMain, BrowserWindow, shell } from "electron";
import path from "path";
import { fileURLToPath } from "url";
const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename$1);
const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
let mainWindow = null;
ipcMain.on("window-minimize", () => {
  if (mainWindow) mainWindow.minimize();
});
ipcMain.on("window-maximize", () => {
  if (mainWindow) mainWindow.maximize();
});
ipcMain.on("window-unmaximize", () => {
  if (mainWindow) mainWindow.unmaximize();
});
ipcMain.on("window-close", () => {
  if (mainWindow) mainWindow.close();
});
ipcMain.handle("window-is-maximized", () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.js"),
      webSecurity: true,
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  if (isDev) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:5555");
  } else {
    mainWindow.loadFile(path.join(__dirname$1, "../dist/index.html"));
  }
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("web-contents-created", (_, contents) => {
  contents.on("will-navigate", (event, url) => {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
  contents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:") || url.startsWith("https:")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });
});
