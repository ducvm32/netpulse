const { ipcMain } = require("electron");
const { runSpeedTest } = require("../logic/speed.logic");

ipcMain.handle("speed-test", async () => {
  return await runSpeedTest();
});
