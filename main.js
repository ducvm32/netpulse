const { app, BrowserWindow, ipcMain } = require("electron");
const os = require("os");
const { exec } = require("child_process");
const dns = require("dns");
const https = require("https");
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
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
}

ipcMain.on("win-close", () => win.close());
ipcMain.on("win-min", () => win.minimize());
ipcMain.on("win-max", () =>
  win.isMaximized() ? win.unmaximize() : win.maximize()
);

ipcMain.handle("system-info", async () => ({
  os: `${os.type()} ${os.release()}`,
  hostname: os.hostname(),
  cpu: os.cpus()[0].model,
  ramTotal: (os.totalmem() / 1024 / 1024 / 1024).toFixed(1),
  ramUsed: ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(1),
  uptime: Math.floor(os.uptime() / 60)
}));

ipcMain.handle("network-info", async () => {
  return new Promise((resolve) => {
    exec("ipconfig /all", (err, out) => {
      if (err) return resolve(null);
      const get = (r) => out.match(r)?.[1]?.trim();
      const dnsList = [...out.matchAll(/DNS Servers.*?:\s([\d.]+)/g)].map(d => d[1]);

      resolve({
        ip: get(/IPv4 Address.*?:\s([\d.]+)/),
        subnet: get(/Subnet Mask.*?:\s([\d.]+)/),
        gateway: get(/Default Gateway.*?:\s([\d.]+)/),
        dns: dnsList
      });
    });
  });
});

ipcMain.handle("ping", async () => {
  return new Promise((resolve) => {
    exec("ping -n 1 8.8.8.8", (err, out) => {
      if (err) return resolve({ ok: false });
      const ms = out.match(/time[=<](\d+)ms/);
      resolve({ ok: true, ms: ms ? Number(ms[1]) : null });
    });
  });
});

ipcMain.handle("wifi-info", async () => {
  return new Promise((resolve) => {
    exec("netsh wlan show interfaces", (err, out) => {
      if (err) return resolve(null);
      const get = (r) => out.match(r)?.[1]?.trim();
      const percent = get(/Signal\s*:\s*(\d+)%/);
      const p = percent ? Number(percent) : null;

      resolve({
        ssid: get(/SSID\s*:\s(.+)/),
        bssid: get(/BSSID\s*:\s(.+)/),
        signal: p,
        rssi: p ? Math.round(p / 2 - 100) : null,
        channel: get(/Channel\s*:\s(\d+)/),
        phy: get(/Radio type\s*:\s(.+)/)
      });
    });
  });
});

ipcMain.handle("dns-check", async () =>
  new Promise(res => exec("nslookup google.com", err => res(!err)))
);

/* =======================
   🚀 SPEED TEST (DOWN + UP)
======================= */
ipcMain.handle("speed-test", async () => {
  return new Promise((resolve) => {
    // DOWNLOAD
    const startDown = Date.now();
    let downBytes = 0;

    https.get("https://speed.cloudflare.com/__down?bytes=5000000", res => {
      res.on("data", chunk => downBytes += chunk.length);
      res.on("end", () => {
        const downTime = (Date.now() - startDown) / 1000;
        const download = ((downBytes * 8) / downTime / 1024 / 1024).toFixed(1);

        // UPLOAD
        const payload = Buffer.alloc(2 * 1024 * 1024); // 2MB
        const startUp = Date.now();

        const req = https.request(
          "https://speed.cloudflare.com/__up",
          { method: "POST", headers: { "Content-Length": payload.length } },
          res2 => {
            res2.on("data", () => {});
            res2.on("end", () => {
              const upTime = (Date.now() - startUp) / 1000;
              const upload = ((payload.length * 8) / upTime / 1024 / 1024).toFixed(1);
              resolve({ download, upload });
            });
          }
        );

        req.on("error", () => resolve({ download, upload: "N/A" }));
        req.write(payload);
        req.end();
      });
    }).on("error", () => resolve({ download: "N/A", upload: "N/A" }));
  });
});


/* =======================
   🌍 DNS RESOLVE DOMAIN
======================= */
ipcMain.handle("resolve-domain", async (_, domain) => {
  return new Promise((resolve) => {
    dns.resolve4(domain, (err, addresses) => {
      if (err) return resolve({ domain, ok: false });
      resolve({ domain, ok: true, ip: addresses.join(", ") });
    });
  });
});

app.whenReady().then(createWindow);
