import type { ReactNode } from 'react'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import themeConfig from '../theme.config'

export const metadata = {
  title: 'Tesserix UI',
  description: 'Design system documentation for Tesserix UI',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Tesserix UI" />
        <meta property="og:description" content="Production-ready React component library" />
      </Head>
      <body>
        <Layout
          pageMap={pageMap}
          docsRepositoryBase={themeConfig.docsRepositoryBase}
          navigation={themeConfig.navigation}
          sidebar={themeConfig.sidebar}
          toc={themeConfig.toc}
          editLink={themeConfig.editLink?.text}
          feedback={themeConfig.feedback}
          navbar={<Navbar logo={themeConfig.logo} projectLink={themeConfig.project?.link} />}
          footer={<Footer>{themeConfig.footer?.text}</Footer>}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
