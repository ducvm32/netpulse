export function startDnsResolve() {
  const domains = [
    "google.com",
    "noibo.ghn.vn",
    "nhanh.ghn.vn",
    "api.telegram.com",
    "haraworks.vn",
  ];

  setInterval(async () => {
    const results = await Promise.all(
      domains.map((d) => window.api.resolve(d)),
    );
    document.getElementById("resolve-list").innerHTML = results
      .map((r) =>
        r.ok
          ? `<i class="fa-solid fa-circle-check"></i> ${r.domain} → ${r.ip}`
          : `<i class="fa-solid fa-circle-xmark"></i> ${r.domain} → FAIL`,
      )
      .join("<br>");
  }, 3000);
}
