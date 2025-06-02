// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    'nuxt-lodash',
  ],
  css: ['~/assets/css/main.css'],
  ssr: false,
  imports: {
    dirs: ['api', 'constants'],
  },
  runtimeConfig: {
    public: {
      appTitle: '',
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
  lodash: {
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: false,
    exclude: ['map'],
  },
});
