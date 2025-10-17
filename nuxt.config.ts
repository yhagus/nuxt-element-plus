import { createResolver } from '@nuxt/kit';
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
  ],
  css: ['~/assets/css/main.css'],
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
      apiUrl: '',
      clientVersion: '',
      sentryDsnKey: '',
    },
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
  elementPlus: { /** Options */ },
});
