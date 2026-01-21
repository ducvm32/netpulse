const { exec } = require("child_process");

exports.getWifiInfo = () =>
  new Promise((resolve) => {
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
        phy: get(/Radio type\s*:\s(.+)/),
      });
    });
  });
