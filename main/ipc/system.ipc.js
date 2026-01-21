const { ipcMain } = require("electron");
const { getSystemInfo } = require("../logic/system.logic");

ipcMain.handle("system-info", async () => getSystemInfo());
