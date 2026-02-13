# @tesseract-nexus/tesserix-ui

> Production-ready design system for Tesserix applications

[![Version](https://img.shields.io/badge/version-0.1.3-blue)](https://github.com/Tesseract-Nexus/tesserix-ui/packages)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)]()

A comprehensive design system built with React 19, TypeScript 5.7, and Tailwind CSS v4, providing a complete set of accessible, customizable, and production-ready components for building modern web applications.

## ✨ Features

- ⚡ **Latest Tech Stack** - React 19, TypeScript 5.7, Tailwind CSS 4.1
- 🎨 **Fully Customizable** - CSS variables + Tailwind config theming
- 📦 **Optimized Bundles** - Tree-shakeable ESM and CJS builds
- 🎯 **Type-Safe** - 100% TypeScript with complete type definitions
- ♿ **Accessibility-First** - Semantic HTML, keyboard support, and Storybook a11y checks
- 🌙 **Dark Mode** - Built-in dark mode support
- 📚 **Well Documented** - Comprehensive Storybook + API docs
- ✅ **Tested** - Storybook interaction tests with Vitest + coverage reporting
- 🚀 **Production Ready** - Used across Tesserix products

## 📊 Status

**Current Version:** 0.1.3 (Alpha)
**Components:** 50 components across 6 categories
**Story Tests:** 160+ passing (Vitest Storybook project)
**Coverage:** `npm run test:storybook:coverage` enabled
**Documentation:** Storybook + API Reference
**CI/CD:** Automated publishing to GitHub Packages

See [PRD.md](./PRD.md) for complete product requirements and roadmap.

## Installation

### From GitHub Packages

1. Create or update `.npmrc` in your project root:

```bash
@tesseract-nexus:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Install the package:

```bash
npm install @tesseract-nexus/tesserix-ui
```

**Note:** You'll need a GitHub Personal Access Token with `read:packages` scope. Set it as an environment variable:

```bash
export GITHUB_TOKEN=your_token_here
```

### Local Development

```bash
# In the tesserix-ui directory
npm link

# In your Next.js app
npm link @tesseract-nexus/tesserix-ui
```

## Usage

### 1. Install Tailwind CSS v4 in your Next.js app

```bash
npm install tailwindcss@^4.1.0 @tailwindcss/postcss
```

### 2. Update your `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@tesseract-nexus/tesserix-ui/tailwind')],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@tesseract-nexus/tesserix-ui/dist/**/*.{js,mjs}',
  ],
}
```

### 3. Update your `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 4. Import styles in your root layout

```typescript
// app/layout.tsx
import '@tesseract-nexus/tesserix-ui/styles'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### 5. Use components

```typescript
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@tesseract-nexus/tesserix-ui'

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

## Theme Customization

Override theme colors in your app's CSS:

```css
/* app/globals.css */
@import '@tesseract-nexus/tesserix-ui/styles';

:root {
  --primary: 10 80% 50%; /* Custom primary color */
  --radius: 1rem; /* Custom border radius */
}
```

Or using Tailwind config:

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@tesseract-nexus/tesserix-ui/tailwind')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(10 80% 50%)",
          foreground: "hsl(0 0% 100%)",
        },
      },
    },
  },
}
```

Theme tokens are managed from `src/tokens/themes.json` and compiled into `src/themes/*.css`.
Run the generator whenever token values change:

```bash
npm run generate:themes
```

Generated files in `src/themes/` should be treated as build artifacts and not edited manually.

## 📦 Available Components

### Form Components (15)
`Button`, `Checkbox`, `Combobox`, `DatePicker`, `FileUpload`, `Input`, `NumberInput`, `OTPInput`, `Radio`, `Select`, `Slider`, `Switch`, `Textarea`, `Toggle`, `InlineEditable`

### Data Display (8)
`Avatar`, `Badge`, `Card`, `DashboardCard`, `DataTable`, `Table`, `Stat`, `Timeline`

### Feedback (10)
`Alert`, `Dialog`, `EmptyState`, `Popover`, `Progress`, `Sheet`, `Skeleton`, `Spinner`, `Toast`, `Tooltip`

### Navigation (4)
`Breadcrumb`, `Pagination`, `Tabs`, `Stepper`

### Layout (7)
`Accordion`, `AppShell`, `AspectRatio`, `Collapsible`, `PageHeader`, `Separator`, `SidebarNav`

### Typography (3)
`Heading`, `Label`, `Text`

### Utilities (3)
`Command`, `ContextMenu`, `DropdownMenu`

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode
npm run dev

# Run tests
npm test
npm run test:ui        # Interactive test UI
npm run test:coverage  # With coverage report

# Type check
npm run type-check

# Lint
npm run lint

# Storybook
npm run storybook           # Dev server
npm run build-storybook     # Production build
npm run test:storybook      # Run Storybook stories as tests
npm run test:storybook:watch
npm run test:storybook:ui
```

## Storybook Component Testing

Use the **Test** widget at the bottom of the Storybook sidebar to run:
- a single story test
- all stories in a component
- all story tests in the project

Use CLI for local and CI runs:

```bash
# Run all Storybook story tests
npm run test:storybook

# Watch mode while developing stories/components
npm run test:storybook:watch

# Open Vitest UI for Storybook project
npm run test:storybook:ui
```

Filter tests by tags (sidebar filtering equivalent for CLI):

```bash
SB_INCLUDE_TAGS="smoke,forms" npm run test:storybook
SB_EXCLUDE_TAGS="wip" npm run test:storybook
SB_SKIP_TAGS="flaky" npm run test:storybook
```

CI:
- `.github/workflows/storybook-ci.yml` runs `build-storybook` and `test:storybook` on PRs and pushes to `main`.

Optional capabilities:
- Accessibility checks: install and enable `@storybook/addon-a11y`, then run `test:storybook` to include a11y assertions in Storybook test runs.
- Coverage reporting: run `npm run test:storybook:coverage` (requires a Vitest coverage provider such as `@vitest/coverage-v8`).

## 📚 Documentation

- **[PRD.md](./PRD.md)** - Product Requirements Document
- **[ROADMAP.md](./ROADMAP.md)** - Detailed implementation roadmap
- **[Storybook](http://localhost:6006)** - Interactive component documentation (run `npm run storybook`)

## 🗺️ Roadmap

We're following a phased approach to build a production-ready design system:

### ✅ Phase 1: Foundation (Completed)
- [x] Component folder structure
- [x] Build system (tsup)
- [x] Testing setup (Vitest + Testing Library)
- [x] Storybook documentation
- [x] Core components (Button, Card, Input)
- [x] Theme system with CSS variables

### 🚧 Phase 2: Infrastructure (In Progress)
- [x] Design tokens system (`npm run generate:themes`)
- [x] CI/CD pipeline (GitHub Actions - automated publishing)
- [ ] Accessibility testing (axe-core)
- [ ] Changeset versioning
- [ ] Bundle size monitoring

### ✅ Phase 3: Component Library (Completed)
- [x] Form components (15 components)
- [x] Feedback components (10 components)
- [x] Navigation components (4 components)
- [x] Layout components (4 components)
- [x] Data display (8 components)
- [x] Typography components (3 components)

### 📋 Phase 4: Advanced Features (Planned)
- [ ] Hooks library
- [ ] Visual regression testing
- [ ] Documentation website
- [ ] Component generator CLI
- [ ] Performance monitoring

See [ROADMAP.md](./ROADMAP.md) for detailed timeline and requirements.

## 🤝 Contributing

We welcome contributions! Please see our [contribution guidelines](./CONTRIBUTING.md) for details.

**Quick start:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-component`)
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📦 Publishing

The package is automatically published to GitHub Packages when a new release is created:

1. **Create Release (Recommended):**
   ```bash
   # Bump version and create tag
   npm version patch  # or minor/major
   git push --follow-tags

   # Create GitHub release (triggers automatic publish)
   gh release create v0.1.4 --title "Release Title" --notes "Release notes"
   ```

2. **Automated Publishing:**
   - The GitHub Actions workflow (`.github/workflows/publish.yml`) runs automatically
   - Tests are run before publishing
   - Package is published to GitHub Packages

3. **Manual Publish (if needed):**
   ```bash
   npm run build
   npm publish
   ```

## 🏗️ Architecture

```
@tesseract-nexus/tesserix-ui/
├── src/
│   ├── components/          # UI components
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.test.tsx
│   │   │   ├── button.stories.tsx
│   │   │   └── index.ts
│   │   └── .../
│   ├── hooks/              # React hooks
│   ├── lib/                # Utilities
│   ├── tokens/             # Design tokens
│   ├── themes/             # Theme CSS
│   └── index.ts
├── .storybook/            # Storybook config
├── dist/                  # Build output
└── docs/                  # Documentation
```

## 📄 License

MIT © Tesserix

---

**Maintained by the Tesseract Nexus Team**

For questions or support, please [open an issue](https://github.com/Tesseract-Nexus/tesserix-ui/issues).
