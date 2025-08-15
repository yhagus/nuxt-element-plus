import type { NitroFetchOptions } from 'nitropack';

export function getAccessToken(form: UseForm, options?: NitroFetchOptions<any>) {
  return form.post('/v1/auth/login', options);
}
export function refresh(options?: NitroFetchOptions<any>) {
  const { $api } = useNuxtApp();
  return $api('/v1/auth/refresh', options);
}
export function getProfile(token?: string) {
  const { $api } = useNuxtApp();
  const options: any = {};

  if (token) {
    options.headers = {
      authorization: `Bearer ${token}`,
    };
  }

  return $api<User>('/v1/auth/me', options);
}
