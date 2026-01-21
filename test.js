const { exec } = require("child_process");

console.log("=== TEST TRACERT (NODE) ===");

exec(
  "cmd.exe /c tracert google.com",
  { timeout: 20000 },
  (err, stdout, stderr) => {
    console.log("\n--- ERROR ---");
    console.log(err);

    console.log("\n--- STDERR ---");
    console.log(stderr);

    console.log("\n--- STDOUT ---");
    console.log(stdout);
  },
);
