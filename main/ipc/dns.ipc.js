const { ipcMain } = require("electron");
const { checkDns, resolveDomain } = require("../logic/dns.logic");

ipcMain.handle("dns-check", async () => {
  return await checkDns();
});

ipcMain.handle("resolve-domain", async (_, domain) => {
  return await resolveDomain(domain);
});
