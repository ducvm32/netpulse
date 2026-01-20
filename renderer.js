const ctx = document.getElementById("pingChart").getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 0, 300);
gradient.addColorStop(0, "rgba(10,132,255,0.6)");
gradient.addColorStop(1, "rgba(10,132,255,0.05)");
let pingData = [];



const glowPlugin = {
  id: "glow",
  beforeDraw: chart => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowColor = "rgba(10,132,255,0.6)";
    ctx.shadowBlur = 10;
  },
  afterDraw: chart => {
    chart.ctx.restore();
  }
};


const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Ping 8.8.8.8 (ms)",
  data: [],
  borderWidth: 2,
  borderColor: "#0a84ff",
  backgroundColor: gradient,
  fill: true,
  tension: 0.35,
  pointRadius: 0,
  plugins: [glowPlugin]
    }]
  },
  options: {
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    scales: {
      x: { display: false },
      y: { beginAtZero: true }
    },
    plugins: {
      legend: { display: false }
    }
  }
});


async function loadStatic() {
  const s = await window.api.system();
  const n = await window.api.network();

  document.getElementById("system").innerHTML = `
    <h3><i class="fa-solid fa-desktop"></i> SYSTEM</h3>

    OS: ${s.os}<br>
    Host: ${s.hostname}<br>
    CPU: ${s.cpu}<br>
    RAM: ${s.ramUsed}/${s.ramTotal} GB<br>
    Uptime: ${s.uptime} phút
  `;

  document.getElementById("network").innerHTML = `
    <h3><i class="fa-solid fa-network-wired"></i> NETWORK</h3>

    IP: ${n.ip}<br>
    Subnet: ${n.subnet}<br>
    Gateway: ${n.gateway}<br>
    DNS: ${n.dns.join(", ") || "N/A"}
  `;
}

async function realtime() {
  const ping = await window.api.ping();
  const dnsOk = await window.api.dns();
  const wifi = await window.api.wifi();

  let statusHtml = "";

if (!ping.ok) {
  statusHtml = `<i class="fa-solid fa-circle-xmark"></i> No Internet`;
} else if (!dnsOk) {
  statusHtml = `<i class="fa-solid fa-triangle-exclamation"></i> DNS Error`;
} else {
  statusHtml = `<i class="fa-solid fa-circle-check"></i> Network OK`;
}

document.getElementById("status").innerHTML = statusHtml;


  if (wifi) {
    document.getElementById("wifi").innerHTML = `
      <h3><i class="fa-solid fa-wifi"></i> WIFI</h3>

      SSID: ${wifi.ssid}<br>
      BSSID: ${wifi.bssid}<br>
      Signal: ${wifi.signal}% (${wifi.rssi} dBm)<br>
      Channel: ${wifi.channel}<br>
      PHY: ${wifi.phy}
    `;
  }

  if (ping.ok && ping.ms) {
    pingData.push(ping.ms);
    if (pingData.length > 40) pingData.shift();
    chart.data.labels = pingData.map((_, i) => i);
    chart.data.datasets[0].data = pingData;
    chart.update("active");
  }
  if (wifi && typeof wifi.rssi === "number") {
  rssiData.push(wifi.rssi);
  if (rssiData.length > 40) rssiData.shift();

  rssiChart.data.labels = rssiData.map((_, i) => i);
  rssiChart.data.datasets[0].data = rssiData;
  rssiChart.update("active");
}

}

loadStatic();
setInterval(realtime, 2000);

async function extraCheck() {
  const speed = await window.api.speed();

  const downEl = document.getElementById("speed-down");
  const upEl = document.getElementById("speed-up");

  if (downEl) downEl.innerText = `Download: ${speed.download} Mbps`;
  if (upEl) upEl.innerText = `Upload: ${speed.upload ?? "--"} Mbps`;

  const domains = ["google.com", "noibo.ghn.vn"];
  const results = await Promise.all(domains.map(d => window.api.resolve(d)));

  const resolveEl = document.getElementById("resolve-list");
  if (resolveEl) {
    resolveEl.innerHTML = results.map(r =>
      r.ok
        ? `<i class="fa-solid fa-circle-check"></i> ${r.domain} → ${r.ip}`
        : `<i class="fa-solid fa-circle-xmark"></i> ${r.domain} → FAIL`
    ).join("<br>");
  }
}


setInterval(extraCheck, 5000);


/* ======================
   🌗 THEME TOGGLE
====================== */
function toggleTheme() {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
}

(function initTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.body.classList.add("dark");
})();

//RSSI REALTIME
const rssiCtx = document.getElementById("rssiChart").getContext("2d");
let rssiData = [];
const rssiGradient = rssiCtx.createLinearGradient(0, 0, 0, 300);
rssiGradient.addColorStop(0, "rgba(52,199,89,0.6)");
rssiGradient.addColorStop(1, "rgba(52,199,89,0.05)");

const rssiChart = new Chart(rssiCtx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "RSSI (dBm)",
      data: [],
      borderColor: "#34c759",
      backgroundColor: rssiGradient,
      fill: true,
      borderWidth: 2,
      tension: 0.35,
      pointRadius: 0
    }]
  },
  options: {
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    scales: {
      x: { display: false },
      y: {
        reverse: true,          // 👈 RSSI càng thấp càng xấu
        suggestedMin: -100,
        suggestedMax: -30
      }
    },
    plugins: {
      legend: { display: false }
    }
  }
});
