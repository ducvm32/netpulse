const { app } = require("electron");
const { createWindow } = require("./window/window.manager");

app.whenReady().then(() => {
  require("./ipc"); // load toàn bộ ipc
  createWindow();
});
