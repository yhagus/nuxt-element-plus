export default defineNuxtPlugin((nuxtApp) => {
  const access = useCookie<string>(ACCESS_TOKEN);
  const refresh = useCookie<string>(REFRESH_TOKEN);
  const sentry = useSentry();

  const api = $fetch.create({
    baseURL: nuxtApp.$config.public.apiUrl,
    retry: 1,
    retryStatusCodes: [401],
    onRequest({ options }) {
      if (access.value) {
        options.headers.set('Authorization', `Bearer ${access.value}`);
      }
    },
    async onResponseError({ request, response, options }) {
      const endpoint = `${options.method || 'GET'} ${request}`;

      switch (response.status) {
        case 401:
          await $fetch<{ access_token: string; refresh_token: string }>(`${nuxtApp.$config.public.API_URL}/v1/auth/refresh`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${refresh.value}`,
            },
            onResponse(context) {
              if (context.response.ok) {
                access.value = context.response._data.access_token;
                refresh.value = context.response._data.refresh_token;
                refreshCookie(ACCESS_TOKEN);
                refreshCookie(REFRESH_TOKEN);
              }
            },
          });
          break;
        default:
          // Send API errors to Sentry if they have a message property
          if (response._data?.message) {
            sentry.sendError({
              message: response._data.message,
              status: response.status,
              statusText: response.statusText,
              url: request,
              method: options.method || 'GET',
              body: options.body,
              headers: options.headers,
              responseData: response._data,
            }, endpoint);
          }
          break;
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
