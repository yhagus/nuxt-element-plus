export default defineNuxtRouteMiddleware(async (to) => {
  const accessToken = useCookie<string | null>(ACCESS_TOKEN);
  const refreshToken = useCookie<string | null>(REFRESH_TOKEN);
  const { user, setUser, clearUser } = useAuth();

  // Routes that don't require authentication
  const publicRoutes: string[] = ['sign-in', 'register', 'forgot-password'];
  const isPublicRoute = publicRoutes.includes(to.name as string);
  const isAuthenticated = !!user.value;

  // If user is authenticated and trying to access public routes, redirect to home
  if (isAuthenticated && isPublicRoute) {
    return navigateTo('/');
  }

  // If no tokens exist, redirect to sign-in (unless on public route)
  if (!accessToken.value && !refreshToken.value) {
    if (!isPublicRoute) {
      return navigateTo('/sign-in');
    }
    return;
  }

  // If user data exists but no access token, clear user state
  if (!accessToken.value && isAuthenticated) {
    clearUser();
    if (!isPublicRoute) {
      return navigateTo('/sign-in');
    }
    return;
  }

  // If access token exists but user is not loaded, fetch user profile
  if (accessToken.value && !isAuthenticated) {
    try {
      const profile = await api.auth.getProfile();
      setUser(profile);

      // If now authenticated and on public route, redirect to home
      if (isPublicRoute) {
        return navigateTo('/');
      }
    }
    catch (error) {
      // If profile fetch fails, clear tokens and redirect to login
      console.error('Failed to fetch user profile:', error);
      clearUser();
      accessToken.value = null;
      refreshToken.value = null;

      if (!isPublicRoute) {
        return navigateTo('/sign-in');
      }
    }
  }

  // If not authenticated and trying to access protected route
  if (!isAuthenticated && !isPublicRoute) {
    return navigateTo('/sign-in');
  }
});
