const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  login: (u, p) => ipcRenderer.invoke("login-check", u, p),
  runADB: () => ipcRenderer.invoke("run-adb")
});