const { ipcMain } = require("electron");
const { getWifiInfo } = require("../logic/wifi.logic");

ipcMain.handle("wifi-info", async () => getWifiInfo());
