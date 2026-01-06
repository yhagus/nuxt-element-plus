import type { NitroFetchOptions } from 'nitropack';
import type { UseFetchOptions } from 'nuxt/app';

export function useFindAll(options?: UseFetchOptions<any>) {
  return useAPI<APIResponseBody<User>>('/v1/user', options);
}

export function getFindAll(options?: NitroFetchOptions<any>) {
  const { $api } = useNuxtApp();
  return $api<APIResponseBody<User>>('/v1/user', options);
}

export function create(data: any, options?: NitroFetchOptions<any>) {
  const { $api } = useNuxtApp();
  return $api<User>('/v1/user', {
    method: 'POST',
    body: data,
    ...options,
  });
}

export function update(id: string, data: any, options?: NitroFetchOptions<any>) {
  const { $api } = useNuxtApp();
  return $api<User>(`/v1/user/${id}`, {
    method: 'PUT',
    body: data,
    ...options,
  });
}

export function remove(id: string, options?: NitroFetchOptions<any>) {
  const { $api } = useNuxtApp();
  return $api<void>(`/v1/user/${id}`, {
    method: 'DELETE',
    ...options,
  });
}
