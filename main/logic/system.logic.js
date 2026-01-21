const os = require("os");

exports.getSystemInfo = () => ({
  os: `${os.type()} ${os.release()}`,
  hostname: os.hostname(),
  cpu: os.cpus()[0].model,
  ramTotal: (os.totalmem() / 1024 / 1024 / 1024).toFixed(1),
  ramUsed: ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(1),
  uptime: Math.floor(os.uptime() / 60),
});
