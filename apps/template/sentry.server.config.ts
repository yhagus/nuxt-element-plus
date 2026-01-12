import * as Sentry from '@sentry/nuxt';

Sentry.init({
  // eslint-disable-next-line node/prefer-global/process
  dsn: process.env.NUXT_SENTRY_DSN_KEY,
});
