import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://hit-cargo.com',
  integrations: [preact(), tailwind(), sitemap()],
  security: {
    csp: {
      scriptDirective: {
        hashes: ['sha256-0dBUwkzfoB1M/jvkeTON0OiNWCK33H/pUhgagkI0mo4='],
        resources: ["'self'", 'https://www.googletagmanager.com'],
      },
      styleDirective: {
        resources: ["'self'", 'https://fonts.googleapis.com'],
      },
    },
  },
});
