export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (auth.logged.value) {
    if (to.path === '/') {
      return;
    }
    return navigateTo('/', { replace: true });
  }

  const attempted = useState<boolean>('guest.fetchUserAttempted', () => false);
  const hasToken = !!(auth.token && auth.token.value);
  const hasUser = !!(auth.user && auth.user.value && Object.keys(auth.user.value || {}).length > 0);

  if (hasToken && !hasUser && !attempted.value) {
    attempted.value = true;
    try {
      await auth.fetchUser();
      if (auth.logged.value) {
        if (to.path === '/') {
          return;
        }
        return navigateTo('/', { replace: true });
      }
    }
    catch (e) {
      console.warn(e);
    }
  }
});
