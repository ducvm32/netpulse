const { app } = require("electron");
const { createWindow } = require("./window/window.manager");
const { BrowserWindow, globalShortcut } = require("electron");

app.whenReady().then(() => {
  require("./ipc"); // load toàn bộ ipc
  createWindow();
  globalShortcut.register("Ctrl+Shift+I", () => {
    const focusedWin = BrowserWindow.getFocusedWindow();
    if (focusedWin) {
      focusedWin.webContents.toggleDevTools();
    }
  });
});
