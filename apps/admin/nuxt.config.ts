// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  extends: [
    '../../layers/base',
    '../../layers/ui',
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      appTitle: 'Admin',
      clientVersion: '',
      sentryDsnKey: '',
    },
    apiUrl: '',
  },
});
