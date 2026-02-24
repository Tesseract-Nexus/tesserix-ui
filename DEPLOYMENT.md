# Deployment Guide

## Documentation Site Deployment

The Tesserix UI documentation site is built with **Nextra** (Next.js-based docs framework) and ready for deployment to Vercel.

### What's Included

**Modern Nextra Documentation:**
- **Overview** - Project introduction, features, stats, quick start
- **Getting Started** - Installation, configuration, first component with syntax highlighting
- **Components** - All 70 components organized by category with clickable cards
- **Hooks** - Complete API docs for 5 core hooks
- **Utilities** - Documentation for 8 utility components
- **Theming** - Theme customization guide with 7 built-in themes

**Features:**
- 🔍 Built-in search (Flexsearch)
- 🌙 Dark mode support
- 📱 Mobile-responsive
- ⚡ Fast (Next.js SSG)
- 🎨 Beautiful UI
- 📝 MDX support for interactive content

### Local Development

```bash
# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

### Deployment to Vercel

#### Prerequisites
- Vercel account (free tier works)
- Domain: `tesserix.app`

#### Deployment Steps

**1. Install Vercel CLI**
```bash
npm i -g vercel
```

**2. Deploy from Project Root**
```bash
vercel
```

**3. Configure Custom Domains**
- **Documentation:** `docs.tesserix.app` → points to this project
- **Storybook:** `ui.tesserix.app` → points to Storybook deployment

#### Vercel Configuration

The project includes `vercel.json` with:
- Build command: `npm run docs:build`
- Output directory: `docs-dist`
- Security headers (X-Content-Type-Options, X-Frame-Options, XSS-Protection)
- Asset caching (1 year for images and CSS)
- Clean URLs enabled
- Trailing slash disabled

#### Vercel Project Settings

1. **Build & Development Settings:**
   - Framework Preset: Other
   - Build Command: `npm run docs:build`
   - Output Directory: `docs-dist`
   - Install Command: `npm install`

2. **Domains:**
   - Add `docs.tesserix.app` as custom domain
   - Vercel will auto-provision SSL certificate

3. **Git Integration:**
   - Connect to GitHub repository
   - Auto-deploy on push to `main` branch
   - Preview deployments for pull requests

### Manual Deployment

If you prefer manual deployment without Git integration:

```bash
# Build the docs
npm run docs:build

# Deploy to Vercel (production)
vercel --prod
```

### GitHub Actions (Optional)

Create `.github/workflows/deploy-docs.yml` for automated deployments:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run docs:build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Build Output

Production build generates:
- 6 HTML pages (~64 KB total)
- 1 CSS file (~7 KB)
- All files are optimized and minified
- Gzipped size: ~15 KB total

### Post-Deployment Checklist

- [ ] Verify all 6 pages load correctly
- [ ] Test navigation between pages
- [ ] Verify external links (GitHub, Storybook)
- [ ] Check mobile responsiveness
- [ ] Test dark mode (if implemented)
- [ ] Validate SSL certificate
- [ ] Test page load performance (should be <1s)

### Performance Tips

1. All assets are cached for 1 year
2. HTML files use clean URLs (no trailing slash)
3. Gzipped assets for optimal transfer
4. Static site - extremely fast load times
5. No runtime JavaScript - instant navigation

### Troubleshooting

**Build Fails:**
- Ensure Node.js 18+ is installed
- Run `npm ci` for clean install
- Check for TypeScript errors in source

**Pages Not Loading:**
- Verify `vercel.json` configuration
- Check output directory is `docs-dist`
- Ensure all HTML files are in build output

**Styles Not Applied:**
- Verify `/assets/styles-*.css` is generated
- Check CSS file is referenced in HTML
- Clear browser cache

### Support

- **Documentation Issues:** [GitHub Issues](https://github.com/Tesseract-Nexus/tesserix-ui/issues)
- **Deployment Help:** Vercel Support
- **Domain Configuration:** Vercel DNS Documentation
