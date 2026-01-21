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
