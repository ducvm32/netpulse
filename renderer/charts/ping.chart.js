export function createPingChart() {
  const ctx = document.getElementById("pingChart").getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(10,132,255,0.6)");
  gradient.addColorStop(1, "rgba(10,132,255,0.05)");

  let data = [];

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          data,
          borderColor: "#0a84ff",
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    },
    options: {
      animation: { duration: 400 },
      scales: { x: { display: false } },
      plugins: { legend: { display: false } },
    },
  });

  return {
    push(ms) {
      data.push(ms);
      if (data.length > 20) data.shift();
      chart.data.labels = data.map((_, i) => i);
      chart.update("active");
    },
  };
}
