import { createResolver } from '@nuxt/kit';
import tailwindcss from '@tailwindcss/vite';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  css: [
    resolve('./app/assets/css/index.css'),
    resolve('./app/assets/scss/index.scss'),
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    css: {
      preprocessorMaxWorkers: true, // number of CPUs minus 1
    },
  },
});
