const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
}

ipcMain.handle("run-adb", () => {
  return new Promise((resolve) => {
    exec(`"${path.join(__dirname, "tools", "adb.exe")}" devices`, (err, stdout) => {
      if (err) return resolve("ADB ERROR");
      resolve(stdout);
    });
  });
});

ipcMain.handle("login-check", (e, user, pass) => {
  if (user === "admin" && pass === "1234") {
    return { ok: true };
  }
  return { ok: false };
});

app.whenReady().then(createWindow);