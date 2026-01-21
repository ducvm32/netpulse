import { initTheme } from "./modules/theme.module.js";
import { loadSystem } from "./modules/system.module.js";
import { startPingRealtime } from "./modules/ping.module.js";
import { startDnsResolve } from "./modules/dns.module.js";
import { startSpeedCheck } from "./modules/speed.module.js";
import { startWifi } from "./modules/wifi.module.js";

initTheme();
loadSystem();
startPingRealtime();
startDnsResolve();
startSpeedCheck();
startWifi();

const btn = document.getElementById("btn-tracert");
const output = document.getElementById("tracert-output");

btn.addEventListener("click", async () => {
  btn.disabled = true;
  output.textContent = "Running tracert google.com...\n\n";

  try {
    const res = await window.api.tracert("google.com");

    if (!res.ok) {
      output.textContent += "Failed:\n" + res.error;
      return;
    }

    res.hops.forEach((h) => {
      output.textContent += h.raw + "\n";
    });

    output.textContent += "\nDone.";
  } catch (e) {
    output.textContent += "\nError: " + e.message;
  } finally {
    btn.disabled = false;
  }
});
