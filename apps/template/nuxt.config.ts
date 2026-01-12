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
      sentry: {
        dsnKey: '',
        enabled: false,
      },
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
});
