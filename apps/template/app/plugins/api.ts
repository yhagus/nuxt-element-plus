import type { NitroFetchOptions } from 'nitropack';

export default defineNuxtPlugin(async () => {
  const apiBaseUrl = useState<string | null>('api.baseUrl', () => null);

  if (!apiBaseUrl.value) {
    const { data: apiUrls } = await useFetch('/api/servers', { server: false });
    apiBaseUrl.value = apiUrls.value?.[0] ?? '';
  }

  const defaultApiUrl = apiBaseUrl.value ?? '';
  const auth = useAuthStore();
  const retriedOptions = new WeakSet<object>();

  const api = $fetch.create({
    baseURL: defaultApiUrl,
    onRequest({ options }) {
      const headers = new Headers(options.headers);
      headers.set('Accept', 'application/json');

      if (auth.token.value) {
        headers.set('Authorization', `Bearer ${auth.token.value}`);
      }

      options.headers = headers;
    },
    async onResponseError({ request, options, response }) {
      const optionsRef = options as object;

      if (response.status === 401 && auth.refresh.value && !retriedOptions.has(optionsRef)) {
        const refreshResponse = await $fetch<{ access_token: string; refresh_token: string }>(`/v1/auth/refresh`, {
          baseURL: defaultApiUrl,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.refresh.value}`,
          },
          onResponse(context) {
            if (context.response.ok) {
              void auth.login(context.response._data, { fetchUser: false });
            }
          },
        });

        if (refreshResponse?.access_token) {
          const headers = new Headers(options.headers);
          const nextOptions: NitroFetchOptions<RequestInfo, any> = {
            ...options,
            baseURL: defaultApiUrl,
            headers,
          };

          retriedOptions.add(nextOptions);
          headers.set('Authorization', `Bearer ${refreshResponse.access_token}`);
          return $fetch(request, nextOptions);
        }
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
