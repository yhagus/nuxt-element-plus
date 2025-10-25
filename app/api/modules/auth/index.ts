import type { NitroFetchOptions } from 'nitropack';

interface LoginResponse {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export function authorize(token?: string | null) {
  const config = useRuntimeConfig();
  return $fetch<User>('/v1/auth/authorize', {
    baseURL: config.public.apiUrl,
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}
export function login(options?: NitroFetchOptions<any>) {
  return (useNuxtApp().$api as typeof $fetch)<LoginResponse>('/v1/auth/login', options);
}
export function logout(options?: NitroFetchOptions<any>) {
  const config = useRuntimeConfig();
  const accessToken = useCookie(ACCESS_TOKEN);
  return $fetch('/v1/auth/logout', {
    baseURL: config.public.apiUrl,
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken.value}`,
    },
    ...options,
  });
}
export function refresh(options?: NitroFetchOptions<any>) {
  const { $config } = useNuxtApp();
  const refreshToken = useCookie<string>(REFRESH_TOKEN);
  return $fetch<LoginResponse>('/v1/auth/refresh', {
    baseURL: $config.public.apiUrl,
    method: 'POST',
    headers: {
      authorization: `Bearer ${refreshToken.value}`,
      accept: 'application/json',
    },
    onResponse({response}) {
      if (response.ok) {
        refreshCookie(ACCESS_TOKEN);
        refreshCookie(REFRESH_TOKEN);
      }
    },
    ...options,
  });
}
