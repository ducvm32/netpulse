export function startWifi() {
  setInterval(async () => {
    const wifi = await window.api.wifi();
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
  }, 1000);
}
