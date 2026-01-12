// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  extends: [
    '../../layers/base',
    '../../layers/ui',
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      appTitle: 'NUXT 4',
      clientVersion: '',
    },
    apiUrl: '',
    sentry: {
      dsnKey: '',
      enabled: false,
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
});
