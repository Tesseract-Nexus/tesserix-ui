import { readdirSync, readFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const indexSource = readFileSync(join(root, "src", "index.ts"), "utf8")
const components = [...indexSource.matchAll(/^export \* from '\.\/components\/([^']+)'/gm)].map((m) => m[1])

const issues = []

const hasInteraction = (source) => /\bplay\s*:\s*async\b/.test(source) || /SmokeTest/.test(source)

for (const component of components) {
  const componentDir = join(root, "src", "components", component)
  const files = readdirSync(componentDir)

  const docFile = join(root, "docs", "content", "components", `${component}.mdx`)
  if (!existsSync(docFile)) {
    issues.push(`Missing docs page: docs/content/components/${component}.mdx`)
  } else {
    const docSource = readFileSync(docFile, "utf8")
    if (!/## Do \/ Don't/.test(docSource)) {
      issues.push(`Missing Do/Don't section: docs/content/components/${component}.mdx`)
    }
  }

  const stories = files.filter((file) => file.endsWith(".stories.tsx"))
  if (stories.length === 0) {
    issues.push(`Missing story file: src/components/${component}`)
  } else {
    const hasAnyInteraction = stories.some((file) => hasInteraction(readFileSync(join(componentDir, file), "utf8")))
    if (!hasAnyInteraction) {
      issues.push(`No interaction/smoke story: src/components/${component}`)
    }
  }

  const barrelFile = join(componentDir, "index.ts")
  if (!existsSync(barrelFile)) {
    issues.push(`Missing barrel export: src/components/${component}/index.ts`)
  } else {
    const barrelSource = readFileSync(barrelFile, "utf8")
    if (!/export\s+type\s*(\{|\*)/.test(barrelSource)) {
      issues.push(`Missing type exports in barrel: src/components/${component}/index.ts`)
    }
  }
}

const allowedHexInternalFiles = new Set([
  join(root, "src", "components", "color-picker", "color-picker.tsx"),
])

const walk = (dir, out = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, out)
      continue
    }
    if (!entry.name.endsWith(".tsx") && !entry.name.endsWith(".ts")) continue
    out.push(fullPath)
  }
  return out
}

const hexPattern = /#[0-9a-fA-F]{3,8}\b/g
for (const file of walk(join(root, "src", "components"))) {
  if (file.endsWith(".stories.tsx") || file.endsWith(".test.tsx")) continue
  if (allowedHexInternalFiles.has(file)) continue

  const source = readFileSync(file, "utf8")
  if (hexPattern.test(source)) {
    issues.push(`Raw hex color found in component source: ${file.replace(`${root}/`, "")}`)
  }
}

if (issues.length > 0) {
  console.error("Readiness audit failed:\n")
  for (const issue of issues) {
    console.error(`- ${issue}`)
  }
  process.exit(1)
}

console.log(`Readiness audit passed for ${components.length} exported components.`)
