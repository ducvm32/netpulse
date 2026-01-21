const { ipcMain } = require("electron");
const { getNetworkInfo } = require("../logic/network.logic");

ipcMain.handle("network-info", async () => getNetworkInfo());
