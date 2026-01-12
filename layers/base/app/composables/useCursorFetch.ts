import type { NitroFetchOptions } from 'nitropack';

interface ExtendedProps {
  lazy?: boolean;
  immediate?: boolean;
}

export function useCursorFetch<T extends Record<string, any> = any>(url: string, options?: NitroFetchOptions<any> & ExtendedProps) {
  return useCursorHttp<T>(url, {
    itemKey: 'id',
    meta: {
      cursorKey: 'next_cursor',
      hasMoreKey: 'has_next_page',
    },
    fetcher: (useNuxtApp().$api as typeof $fetch),
    fetchOptions: options,
    lazy: options?.lazy ?? true,
    immediate: options?.immediate ?? true,
  });
}
