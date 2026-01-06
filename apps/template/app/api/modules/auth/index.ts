import type { NitroFetchOptions } from 'nitropack';

interface LoginResponse {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export function authorize() {
  return (useNuxtApp().$api as typeof $fetch)<User>('/v1/auth/authorize', {
    headers: {
      accept: 'application/json',
    },
  });
}
export function login(options?: NitroFetchOptions<any>) {
  return (useNuxtApp().$api as typeof $fetch)<LoginResponse>('/v1/auth/login', options);
}
export function logout(options?: NitroFetchOptions<any>) {
  return (useNuxtApp().$api as typeof $fetch)('/v1/auth/logout', {
    method: 'POST',
    ...options,
  });
}
export function refresh(options?: NitroFetchOptions<any>) {
  const refreshToken = useCookie<string>(REFRESH_TOKEN);
  return (useNuxtApp().$api as typeof $fetch)<LoginResponse>('/v1/auth/refresh', {
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