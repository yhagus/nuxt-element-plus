import * as Sentry from '@sentry/nuxt';

export function useSentry() {
  const config = useRuntimeConfig();
  const dsnKey = config.public.sentryDsnKey;

  const captureMessage = (message: string) => {
    Sentry.captureMessage(message);
  };

  return {
    dsnKey,
    captureMessage,
  };
}
