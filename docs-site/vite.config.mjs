import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  root: resolve(process.cwd(), 'docs-site'),
  build: {
    outDir: resolve(process.cwd(), 'docs-dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'docs-site/index.html'),
        gettingStarted: resolve(process.cwd(), 'docs-site/getting-started.html'),
        components: resolve(process.cwd(), 'docs-site/components.html'),
      },
    },
  },
})
