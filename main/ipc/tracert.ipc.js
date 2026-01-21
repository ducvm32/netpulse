const { ipcMain } = require("electron");
const { runTracert } = require("../logic/tracert.logic");

ipcMain.handle("tracert", async (_, host) => {
  return await runTracert(host || "google.com");
});
