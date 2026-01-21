const { ipcMain } = require("electron");
const { runPing } = require("../logic/ping.logic");

ipcMain.handle("ping", async () => runPing("8.8.8.8"));
