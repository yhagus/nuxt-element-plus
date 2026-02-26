import { fileURLToPath } from 'node:url';
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
      // @ts-expect-error wrong typed tailwindcss plugin
      tailwindcss(),
    ],
    css: {
      preprocessorMaxWorkers: true, // number of CPUs minus 1
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${fileURLToPath(new URL('./app/assets/scss/element-plus.scss', import.meta.url))}" as *;`,
        },
      },
    },
  },
});
