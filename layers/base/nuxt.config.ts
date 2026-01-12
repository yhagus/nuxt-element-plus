import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/i18n',
    '@ciwergrp/nuxid',
  ],
  imports: {
    dirs: ['constants'],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    css: {
      preprocessorMaxWorkers: true, // number of CPUs minus 1
    },
  },
  nuxid: {
    elementPlus: {
      enabled: true,
    },
    icon: {
      enabled: true,
      config: {
        componentName: 'NIcon',
        size: '1.25em',
        class: 'align-middle inline-block text-current',
        mode: 'svg',
        provider: 'local',
      },
    },
  },
  i18n: {
    defaultLocale: 'id',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    locales: [
      {
        name: 'id',
        code: 'id',
        file: 'id.json',
      },
    ],
  },
  alias: {
    '#dto': fileURLToPath(new URL('./shared/types/dto', import.meta.url)),
  },
});
