import type { UseFetchOptions } from 'nuxt/app';

export function useAPI<DataT>(
  url: string,
  options?: UseFetchOptions<DataT>,
) {
  // @ts-expect-error unidentified types check error
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  });
}
