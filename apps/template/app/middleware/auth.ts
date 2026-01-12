const HOME_PATH = '/sign-in';
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (to.path === HOME_PATH) {
    return;
  }

  const hasUser = !!auth.user.value && Object.keys(auth.user.value || {}).length > 0;

  if (auth.token.value && hasUser) {
    return;
  }

  if (auth.token.value && !hasUser) {
    try {
      await auth.fetchUser();
      return;
    }
    catch (e) {
      console.warn(e);
    }
  }

  return navigateTo(HOME_PATH, { replace: true });
});
