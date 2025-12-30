import { createResolver } from '@nuxt/kit';
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/i18n',
    '@ciwergrp/nuxid',
  ],
  css: [
    '~/assets/css/index.css',
    '~/assets/scss/index.scss',
  ],
  ssr: false,
  components: [
    {
      path: resolve('./app/components'),
    },
    {
      path: resolve('./app/components/_Ui'),
      prefix: 'Ui',
    },
  ],
  imports: {
    dirs: ['api', 'constants', 'states'],
  },
  runtimeConfig: {
    public: {
      appTitle: 'NUXT 4',
      clientVersion: '',
      sentryDsnKey: '',
    },
    apiUrl: '',
  },
  routeRules: {
    '/authenticated/**': {
      // appMiddleware: ['auth'],
    },
    '/settings/**': {
      // appMiddleware: ['auth'],
    },
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
