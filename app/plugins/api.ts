export default defineNuxtPlugin({
  name: 'api',
  async setup(nuxtApp) {
    const api = $fetch.create({
      baseURL: nuxtApp.$config.public.apiUrl,
      credentials: 'include',
      retry: false,
      onRequest({ options }) {
        options.headers.set('accept', 'application/json');
      },
    });

    // Expose to useNuxtApp().$api
    return {
      provide: {
        api,
      },
    };
  },
});
