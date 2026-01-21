const { ipcMain } = require("electron");
const { getWindow } = require("../window/window.manager");

ipcMain.on("win-close", () => getWindow()?.close());
ipcMain.on("win-min", () => getWindow()?.minimize());
ipcMain.on("win-max", () => {
  const win = getWindow();
  if (!win) return;
  win.isMaximized() ? win.unmaximize() : win.maximize();
});
