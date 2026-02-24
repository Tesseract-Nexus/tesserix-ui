import React from 'react'
import { BrandLogo } from './components/brand-logo'

const config = {
  logo: <BrandLogo />,
  project: {
    link: 'https://github.com/Tesseract-Nexus/tesserix-ui',
  },
  docsRepositoryBase: 'https://github.com/Tesseract-Nexus/tesserix-ui/tree/main/docs',
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://tesserix.app" target="_blank">
          Tesserix UI
        </a>
        .
      </span>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Tesserix UI',
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Tesserix UI" />
      <meta property="og:description" content="Production-ready React component library" />
    </>
  ),
  primaryHue: 212,
  primarySaturation: 100,
  banner: {
    key: 'phase-4-complete',
    text: (
      <a href="https://ui.tesserix.app" target="_blank">
        🎉 Phase 4 Complete! 70+ components, 5 hooks, 8 utilities. View Storybook →
      </a>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  navigation: {
    prev: true,
    next: true,
  },
}

export default config
