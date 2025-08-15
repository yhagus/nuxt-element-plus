import antfu from '@antfu/eslint-config';

export default antfu(
  {
    vue: true,
    typescript: true,
    rules: {
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'unused-imports/no-unused-vars': 'warn',
      'ts/no-unused-vars': 'warn',
      'vue/no-unused-vars': 'warn',
      'no-console': 'warn',
      'vue/custom-event-name-casing': 'off',
      'no-alert': 'off',
      'no-prototype-builtins': 'off',
      'ts/method-signature-style': 'off',
      'prefer-const': 'off',
    },
    stylistic: {
      semi: true,
    },
    formatters: {
      /**
       * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
       * By default uses Prettier
       */
      css: true,
      /**
       * Format HTML files
       * By default uses Prettier
       */
      html: true,
      /**
       * Format Markdown files
       * Supports Prettier and dprint
       * By default uses Prettier
       */
      markdown: 'prettier',
    },
  },
  {
    files: ['console/**/*.mjs'],
    rules: {
      'no-console': 'off',
    },
  },
);
