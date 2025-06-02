export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    // baseURL: nuxtApp.$config.public.apiUrl,
    // credentials: 'include',
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
});
