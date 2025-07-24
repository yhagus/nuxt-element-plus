// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
  ],
  css: ['~/assets/css/main.css'],
  ssr: false,
  dir: {
    app: 'app',
  },
  imports: {
    dirs: ['api', 'constants'],
  },
  runtimeConfig: {
    public: {
      appTitle: '',
      apiUrl: '',
      clientVersion: '',
      sentryDsnKey: '',
    },
  },
  routeRules: {

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
  },
});
