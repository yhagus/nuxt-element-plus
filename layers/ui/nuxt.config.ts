import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  css: [
    resolve('./app/assets/css/index.css'),
    resolve('./app/assets/scss/index.scss'),
  ],
});
