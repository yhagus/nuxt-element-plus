import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/i18n',
    '@ciwergrp/nuxid',
  ],
  imports: {
    dirs: ['api', 'constants'],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    css: {
      preprocessorMaxWorkers: true, // number of CPUs minus 1
    },
  },
  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: false,
  },
  nuxid: {
    elementPlus: {
      enabled: true,
    },
    icon: {
      enabled: true,
      config: {
        componentName: 'NIcon',
      },
    },
  },
});
