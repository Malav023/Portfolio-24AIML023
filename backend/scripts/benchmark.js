// Measures GET /tasks response time: uncached (cache miss) vs cached (cache hit).
// Server must be running. Usage: npm run benchmark   (optional: node scripts/benchmark.js 10)
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const BASE = `http://localhost:${process.env.PORT || 5000}/tasks`;
const RUNS = parseInt(process.argv[2], 10) || 5;

async function timedGet() {
  const t0 = performance.now();
  const res = await fetch(BASE);
  const body = await res.text(); // include body download time
  const ms = performance.now() - t0;
  return { ms, cache: res.headers.get("x-cache"), size: body.length };
}

(async () => {
  const miss = [], hit = [];
  let size = 0;
  await timedGet(); // warm-up (connection, JIT)

  for (let i = 0; i < RUNS; i++) {
    // A write invalidates the cache -> next GET is guaranteed to be a MISS
    const created = await (await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: `bench-${i}` }),
    })).json();

    const a = await timedGet();            // MISS (hits MongoDB)
    const b = await timedGet();            // HIT  (served from node-cache)
    if (a.cache !== "MISS" || b.cache !== "HIT") console.warn("Unexpected cache state", a.cache, b.cache);
    miss.push(a.ms); hit.push(b.ms); size = a.size;

    await fetch(`${BASE}/${created._id}`, { method: "DELETE" }); // cleanup (also invalidates)
  }

  const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const f = (n) => n.toFixed(2);
  let md = `| Reading | Without cache (ms) | With cache (ms) |\n|---|---|---|\n`;
  for (let i = 0; i < RUNS; i++) md += `| ${i + 1} | ${f(miss[i])} | ${f(hit[i])} |\n`;
  md += `| **Average** | **${f(avg(miss))}** | **${f(avg(hit))}** |\n`;
  const improvement = ((avg(miss) - avg(hit)) / avg(miss)) * 100;
  md += `\nPayload ≈ ${(size / 1024).toFixed(1)} KB | Speed-up ≈ ${f(avg(miss) / avg(hit))}x (${f(improvement)}% faster)\n`;

  console.log("\n" + md);
  fs.writeFileSync(path.join(__dirname, "..", "benchmark-results.md"), md);
  console.log("Saved to backend/benchmark-results.md");
})().catch((e) => { console.error(e); process.exit(1); });
