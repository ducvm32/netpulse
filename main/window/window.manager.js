const { BrowserWindow } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    titleBarStyle: "hidden",
    backgroundColor: "#1c1c1e",
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "../../renderer/index.html"));
}

function getWindow() {
  return win;
}

module.exports = {
  createWindow,
  getWindow,
};
