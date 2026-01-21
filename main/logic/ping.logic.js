const { exec } = require("child_process");

exports.runPing = (target) =>
  new Promise((resolve) => {
    exec(`ping -n 1 ${target}`, (err, out) => {
      if (err) return resolve({ ok: false });
      const ms = out.match(/time[=<](\d+)ms/);
      resolve({ ok: true, ms: ms ? Number(ms[1]) : null });
    });
  });
