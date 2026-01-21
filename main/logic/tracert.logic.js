const { exec } = require("child_process");

exports.runTracert = (host = "google.com") => {
  return new Promise((resolve) => {
    exec(
      `cmd.exe /c tracert -h 10 ${host}`,
      { timeout: 30000, windowsHide: true },
      (err, stdout, stderr) => {
        // ⚠️ tracert có thể trả err dù stdout hợp lệ
        if (!stdout || !stdout.trim()) {
          resolve({
            ok: false,
            error: stderr || err?.message || "No output",
          });
          return;
        }

        const lines = stdout
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter((l) => /^\d+/.test(l));

        resolve({
          ok: true,
          host,
          hops: lines.map((l) => ({ raw: l })),
        });
      },
    );
  });
};
