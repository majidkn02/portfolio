import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import siteConfig from './site.config.js'

const withSlashes = (p) => {
  if (!p) return '/'
  let out = p.trim()
  if (!out.startsWith('/')) out = `/${out}`
  if (!out.endsWith('/')) out = `${out}/`
  return out
}

const withTrailingSlash = (u) => (u ? (u.endsWith('/') ? u : `${u}/`) : '')

/**
 * Injects the site URL into index.html (canonical / OpenGraph) and emits
 * robots.txt + sitemap.xml at build time, so they always match the deploy URL.
 */
function seoPlugin({ siteUrl, base }) {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const absolute = siteUrl || base
      return html.replaceAll('%SITE_URL%', absolute).replaceAll('%BASE_PATH%', base)
    },
    generateBundle() {
      // GitHub Pages serves 404.html for any unknown address inside the site.
      // Send visitors back to the portfolio home instead of a dead page.
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Majid Khan | Portfolio</title>
    <meta http-equiv="refresh" content="0; url=${base}" />
    <script>window.location.replace(${JSON.stringify(base)} + window.location.hash)</script>
  </head>
  <body style="background:#07090f;color:#e9edf5;font-family:sans-serif;padding:24px">
    <p>Redirecting to <a href="${base}" style="color:#4de1ff">the portfolio</a>…</p>
  </body>
</html>
`,
      })
      // Tell GitHub Pages not to run Jekyll on the built files.
      this.emitFile({ type: 'asset', fileName: '.nojekyll', source: '' })

      const robots = ['User-agent: *', 'Allow: /']
      if (siteUrl) {
        robots.push('', `Sitemap: ${siteUrl}sitemap.xml`)
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
        })
      } else {
        this.warn('SITE_URL not set — sitemap.xml skipped (the GitHub workflow sets it automatically).')
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = withSlashes(siteConfig.basePath || env.BASE_PATH || '/')
  const siteUrl = withTrailingSlash(siteConfig.siteUrl || env.SITE_URL || '')

  return {
    base,
    plugins: [react(), seoPlugin({ siteUrl, base })],
    build: {
      target: 'es2019',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  }
})
