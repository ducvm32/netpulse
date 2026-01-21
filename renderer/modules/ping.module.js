import { createPingChart } from "../charts/ping.chart.js";

export function startPingRealtime() {
  const chart = createPingChart();

  setInterval(async () => {
    const ping = await window.api.ping();
    if (ping.ok && ping.ms) chart.push(ping.ms);
  }, 2000);
}
