const { exec } = require("child_process");

exports.getNetworkInfo = () =>
  new Promise((resolve) => {
    exec("ipconfig /all", (err, out) => {
      if (err) return resolve(null);

      const get = (r) => out.match(r)?.[1]?.trim();
      const dnsList = [...out.matchAll(/DNS Servers.*?:\s([\d.]+)/g)].map(
        (d) => d[1],
      );

      resolve({
        ip: get(/IPv4 Address.*?:\s([\d.]+)/),
        subnet: get(/Subnet Mask.*?:\s([\d.]+)/),
        gateway: get(/Default Gateway.*?:\s([\d.]+)/),
        dns: dnsList,
      });
    });
  });
