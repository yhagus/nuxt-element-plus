import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

export function useForm<DataT extends object, DefaultResponseType = any>(
  initialData: DataT,
  formOptions?: NitroFetchOptions<NitroFetchRequest>,
) {
  return useHttp<DataT, DefaultResponseType>(initialData, {
    fetcher: (useNuxtApp().$api as typeof $fetch),
    fetchOptions: formOptions,
  });
}
