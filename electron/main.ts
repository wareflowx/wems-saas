import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = app.isPackaged === false;

let mainWindow: BrowserWindow | null = null;
let serverProcess: ReturnType<typeof spawn> | null = null;

// IPC handlers for window controls
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

function startServer() {
  if (isDev) {
    return Promise.resolve("http://localhost:5555");
  }

  return new Promise<string>((resolve, reject) => {
    const serverPath = path.join(__dirname, "../dist/server/index.js");
    const PORT = 3000;

    console.log("Starting server at:", serverPath);

    serverProcess = spawn("node", [serverPath], {
      env: { ...process.env, PORT: String(PORT), NODE_ENV: "production" },
      stdio: "pipe",
    });

    serverProcess.on("error", (err) => {
      console.error("Failed to start server:", err);
      reject(err);
    });

    serverProcess.stdout?.on("data", (data) => {
      console.log("Server stdout:", data.toString());
    });

    serverProcess.stderr?.on("data", (data) => {
      console.error("Server stderr:", data.toString());
    });

    // Give server time to start
    setTimeout(() => {
      const url = `http://localhost:${PORT}`;
      console.log("Server should be ready at:", url);
      resolve(url);
    }, 3000);
  });
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const serverUrl = await startServer();

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(serverUrl);
}

// This method will be called when Electron finishes loading
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Clean up server process on quit
app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});

// Security: Prevent navigation and open external links in default browser
app.on("web-contents-created", (_, contents) => {
  contents.on("will-navigate", (event, url) => {
    const parsed = new URL(url);

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      // Allow HTTP/HTTPS navigation but open in external browser
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  contents.setWindowOpenHandler(({ url }) => {
    // Open external links in default browser
    if (url.startsWith("http:") || url.startsWith("https:")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });
});
