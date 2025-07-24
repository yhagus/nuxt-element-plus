import type { NitroFetchOptions } from 'nitropack';
import { readonly, ref } from 'vue';

// Helper types from your original implementation
type Ref = import('vue').Ref;
/**
 * A non-blocking, cursor-based pagination composable for Nuxt 3.
 * Automatically watches for changes in nested reactive options.
 *
 * @param url The base URL for the API endpoint.
 * @param options A potentially complex object with nested refs/computeds for query parameters.
 * @param {boolean} [options.lazy] If true, the initial fetch will not run until `refresh` is explicitly called.
 * @returns Reactive state and control functions for pagination.
 */
export function useCursorFetch<T>(
  url: string,
  options?: NitroFetchOptions<any> & { lazy?: boolean },
) {
  // --- Helper functions are now encapsulated within the composable ---

  function findReactiveSources(obj: any): Ref[] {
    const sources: Ref[] = [];
    if (!obj || typeof obj !== 'object')
      return sources;

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (isRef(value)) {
          sources.push(value);
        }
        else if (typeof value === 'object') {
          sources.push(...findReactiveSources(value));
        }
      }
    }
    return sources;
  }

  function unwrapReactiveObject(obj: any): any {
    if (!obj || typeof obj !== 'object')
      return obj;
    const unwrapped: { [key: string]: any } = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (isRef(value)) {
          unwrapped[key] = value.value;
        }
        else if (typeof value === 'object') {
          unwrapped[key] = unwrapReactiveObject(value);
        }
        else {
          unwrapped[key] = value;
        }
      }
    }
    return unwrapped;
  }

  // Destructure the lazy option and keep the rest for fetching
  const { lazy = false, ...fetchOptions } = options ?? {};

  // --- Reactive State ---

  const initialUrl = url;
  const data = ref<APIResponseCursor<T>>();
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const nextCursor = ref<string | null>(null);
  const hasNextPage = ref<boolean>(true);
  const currentParams = ref<NitroFetchOptions<any> | undefined>(unwrapReactiveObject(fetchOptions));

  // --- Core Functions ---

  const fetchData = async (fetchUrl: string, params?: NitroFetchOptions<any>) => {
    if (loading.value)
      return; // Prevent concurrent fetches
    if (!hasNextPage.value && data.value)
      return;

    loading.value = true;
    error.value = null;
    try {
      const response = await (useNuxtApp().$api as typeof $fetch)<APIResponseCursor<T>>(fetchUrl, params);
      data.value = {
        data: [...(data.value?.data ?? []), ...response.data],
        meta: response.meta,
      };
      nextCursor.value = response.meta.afterCursor;
      hasNextPage.value = response.meta.hasMore;
    }
    catch (e: any) {
      error.value = e;
    }
    finally {
      loading.value = false;
    }
  };

  const loadMore = async () => {
    if (!hasNextPage.value)
      return;
    const params = nextCursor.value
      ? { ...currentParams.value, query: { ...currentParams.value?.query, cursor: nextCursor.value } }
      : currentParams.value;
    await fetchData(initialUrl, params);
  };

  const refresh = async () => {
    // Reset state before fetching
    data.value = undefined;
    nextCursor.value = null;
    hasNextPage.value = true;
    await fetchData(initialUrl, currentParams.value);
  };

  // --- Reactivity Watcher ---

  const reactiveSources = findReactiveSources(fetchOptions);
  if (reactiveSources.length > 0) {
    watch(reactiveSources, () => {
      currentParams.value = unwrapReactiveObject(fetchOptions);
      refresh();
    }, { flush: 'sync' });
  }

  // --- Initial Fetch (Conditional) ---
  if (!lazy) {
    fetchData(initialUrl, currentParams.value);
  }

  // --- Return Values ---
  return {
    data,
    loading: readonly(loading),
    error: readonly(error),
    hasNextPage: readonly(hasNextPage),
    loadMore,
    refresh,
  };
}
