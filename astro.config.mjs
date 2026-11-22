import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Change `site` when the domain is final. Everything else (canonical URLs,
// RSS, sitemap, social previews) is derived from it.
export default defineConfig({
  site: 'https://sitecoreinsights.dev',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});
