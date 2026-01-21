const { exec } = require("child_process");
const dns = require("dns");

exports.checkDns = () => {
  return new Promise((resolve) => {
    exec("nslookup google.com", (err) => {
      resolve(!err);
    });
  });
};

exports.resolveDomain = (domain) => {
  return new Promise((resolve) => {
    dns.resolve4(domain, (err, addresses) => {
      if (err) {
        resolve({ domain, ok: false });
        return;
      }

      resolve({
        domain,
        ok: true,
        ip: addresses.join(", "),
      });
    });
  });
};
