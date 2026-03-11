import type { UseFetchOptions } from 'nuxt/app';

export function useAPI<DataT>(
  url: string,
  options?: UseFetchOptions<DataT>,
) {
  return useFetch(url, {
    ...options,
    $fetch: (useNuxtApp().$api as typeof $fetch),
  });
}
