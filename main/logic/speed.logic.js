const https = require("https");

exports.runSpeedTest = () => {
  return new Promise((resolve) => {
    /* ===== DOWNLOAD ===== */
    const startDown = Date.now();
    let downBytes = 0;

    https
      .get("https://speed.cloudflare.com/__down?bytes=5000000", (res) => {
        res.on("data", (chunk) => (downBytes += chunk.length));

        res.on("end", () => {
          const downTime = (Date.now() - startDown) / 1000;
          const download = ((downBytes * 8) / downTime / 1024 / 1024).toFixed(
            1,
          );

          /* ===== UPLOAD ===== */
          const payload = Buffer.alloc(2 * 1024 * 1024);
          const startUp = Date.now();

          const req = https.request(
            "https://speed.cloudflare.com/__up",
            {
              method: "POST",
              headers: { "Content-Length": payload.length },
            },
            (res2) => {
              res2.on("data", () => {});
              res2.on("end", () => {
                const upTime = (Date.now() - startUp) / 1000;
                const upload = (
                  (payload.length * 8) /
                  upTime /
                  1024 /
                  1024
                ).toFixed(1);
                resolve({ download, upload });
              });
            },
          );

          req.on("error", () => resolve({ download, upload: "N/A" }));
          req.write(payload);
          req.end();
        });
      })
      .on("error", () => resolve({ download: "N/A", upload: "N/A" }));
  });
};
