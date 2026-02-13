import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  outDir: 'dist',
  async onSuccess() {
    // Copy theme files to dist/themes
    const themesDir = join('dist', 'themes')
    mkdirSync(themesDir, { recursive: true })

    copyFileSync('src/themes/default.css', join(themesDir, 'default.css'))
    copyFileSync('src/themes/charcoal.css', join(themesDir, 'charcoal.css'))
    copyFileSync('src/themes/ocean.css', join(themesDir, 'ocean.css'))

    console.log('✓ Theme files copied to dist/themes')
  },
})
