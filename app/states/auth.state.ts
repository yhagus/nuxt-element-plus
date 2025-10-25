export function useAuthStore() {
  const config = useRuntimeConfig();
  const user = useState<User | undefined>('user');
  const accessTokenCookie = useCookie<string | null>(ACCESS_TOKEN);
  const refreshTokenCookie = useCookie<string | null>(REFRESH_TOKEN);
  const loggedCookie = useCookie<string | null>('logged');

  // Public logged state should reflect both token presence and a loaded user
  const logged = computed(() => {
    try {
      const hasToken = !!accessTokenCookie.value;
      const hasUser = !!user.value && Object.keys(user.value || {}).length > 0;
      return Boolean(hasToken && hasUser);
    }
    catch (e) {
      console.warn(e);
      return false;
    }
  });

  async function logout() {
    reset();
  }

  async function fetchUserRaw() {
    user.value = await api.auth.authorize(accessTokenCookie.value);
  }

  const loading = ref(false);

  async function fetchUser(): Promise<void> {
    loading.value = true;
    try {
      await fetchUserRaw();
    }
    finally {
      loading.value = false;
    }
  }

  function fetchCsrf(): void {
    (useNuxtApp().$api as typeof $fetch)('/csrf-cookie', {
      baseURL: config.public.apiUrl,
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
  }

  async function login(
    tokenOrResponse?: string | null | { access_token?: string; refresh_token?: string },
    opts?: { fetchUser?: boolean },
  ): Promise<void> {
    if (tokenOrResponse && typeof tokenOrResponse === 'object') {
      const resp = tokenOrResponse as { access_token?: string; refresh_token?: string };
      if (resp.access_token) {
        accessTokenCookie.value = resp.access_token;
      }
      if (resp.refresh_token) {
        refreshTokenCookie.value = resp.refresh_token;
      }
    }
    else {
      accessTokenCookie.value = (tokenOrResponse as string) || null;
    }

    loggedCookie.value = '1';
    if (opts?.fetchUser === false) {
      return;
    }

    await fetchUser();
  }

  function reset(): void {
    accessTokenCookie.value = null;
    refreshTokenCookie.value = null;
    loggedCookie.value = null;
    user.value = undefined;
  }

  return {
    user,
    token: accessTokenCookie,
    refresh: refreshTokenCookie,
    loading: readonly(loading),
    logged,
    login,
    logout,
    fetchUser,
    fetchCsrf,
    reset,
  };
}
