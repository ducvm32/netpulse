export function startSpeedCheck() {
  setInterval(async () => {
    const s = await window.api.speed();
    document.getElementById("speed-down").innerText =
      `Download: ${s.download} Mbps`;
    document.getElementById("speed-up").innerText =
      `Upload: ${s.upload ?? "--"} Mbps`;
  }, 3000);
}
