import { gzipSync } from "node:zlib"
import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const metrics = [
  { id: "esm", path: join(rootDir, "dist", "index.mjs") },
  { id: "cjs", path: join(rootDir, "dist", "index.js") },
  { id: "types", path: join(rootDir, "dist", "index.d.ts") },
]

const formatKb = (bytes) => `${(bytes / 1024).toFixed(2)} KB`

console.log("Performance Report")
console.log("------------------")

for (const metric of metrics) {
  const rawBytes = statSync(metric.path).size
  const source = readFileSync(metric.path)
  const gzipBytes = gzipSync(source).byteLength

  console.log(`${metric.id.toUpperCase()} raw: ${formatKb(rawBytes)} | gzip: ${formatKb(gzipBytes)}`)
}

const bundleLimitKb = Number(process.env.BUNDLE_SIZE_LIMIT_KB ?? 50)
const esmGzipKb = gzipSync(readFileSync(join(rootDir, "dist", "index.mjs"))).byteLength / 1024

if (esmGzipKb > bundleLimitKb) {
  console.error(`\nESM bundle exceeds budget (${esmGzipKb.toFixed(2)} KB > ${bundleLimitKb} KB)`)
  process.exit(1)
}

console.log(`\nBundle budget check passed (${esmGzipKb.toFixed(2)} KB <= ${bundleLimitKb} KB)`)
