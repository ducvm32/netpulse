const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  system: () => ipcRenderer.invoke("system-info"),
  network: () => ipcRenderer.invoke("network-info"),
  wifi: () => ipcRenderer.invoke("wifi-info"),
  ping: () => ipcRenderer.invoke("ping"),
  dns: () => ipcRenderer.invoke("dns-check"),
  speed: () => ipcRenderer.invoke("speed-test"),
  resolve: (d) => ipcRenderer.invoke("resolve-domain", d)
});

contextBridge.exposeInMainWorld("windowCtl", {
  close: () => ipcRenderer.send("win-close"),
  min: () => ipcRenderer.send("win-min"),
  max: () => ipcRenderer.send("win-max")
});