export async function loadSystem() {
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
