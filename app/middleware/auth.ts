export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  const attempted = useState<boolean>('auth.refreshAttempted', () => false);

  if (!auth.logged.value) {
    if (to.path === '/sign-in') {
      return;
    }
    if (attempted.value) {
      return navigateTo('/sign-in', { replace: true });
    }
    try {
      attempted.value = true;
      const res = await api.auth.refresh();

      if (res && res.access_token) {
        await auth.login(res);
        attempted.value = false;
        return;
      }
    }
    catch (e) {
      console.warn(e);
    }

    return navigateTo('/sign-in', { replace: true });
  }
  if (!auth.user.value || Object.keys(auth.user.value).length === 0) {
    try {
      await auth.fetchUser();
    }
    catch (e) {
      try {
        if (attempted.value) {
          return navigateTo('/sign-in', { replace: true });
        }
        attempted.value = true;
        const res = await api.auth.refresh();
        if (res && res.access_token) {
          await auth.login(res);
          attempted.value = false;
          await auth.fetchUser();
          return;
        }
      }
      catch (err) {
        console.warn(err);
      }
      console.warn(e);
      return navigateTo('/sign-in', { replace: true });
    }
  }
});
