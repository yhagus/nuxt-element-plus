<script setup lang="ts">
definePageMeta({
  layout: false,
});

// Form using useForm composable
const form = useForm({
  email: '',
  password: '',
  remember: false,
});

// Cookies for token storage
const accessToken = useCookie(ACCESS_TOKEN);
const refreshToken = useCookie(REFRESH_TOKEN);

// Sign in with credentials
async function signIn() {
  try {
    const response = await api.auth.getAccessToken(form);

    // Store tokens
    accessToken.value = response.access_token;
    refreshToken.value = response.refresh_token;

    // Refresh cookies and reload app
    refreshCookie(ACCESS_TOKEN);
    refreshCookie(REFRESH_TOKEN);

    // Force reload to update auth state
    await reloadNuxtApp({ force: true });
  }
  catch (error) {
    console.error('Sign in error:', error);
  }
}

// Sign in with Google
async function signInWithGoogle() {
  try {
    // TODO: Implement Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));
    await navigateTo('/dashboard');
  }
  catch (error) {
    console.error('Google sign in error:', error);
  }
}
</script>

<template>
  <div class="sign-in-simple">
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-indigo-600">
            Your App
          </h1>
        </div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink
            to="/register"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            create a new account
          </NuxtLink>
        </p>
      </div>

      <!-- Form Container -->
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="py-8 px-4 sm:rounded-lg sm:px-10">
          <!-- Social Sign In -->
          <div class="mb-6">
            <UiButton
              class="w-full"
              @click="signInWithGoogle"
            >
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </UiButton>
          </div>

          <!-- Divider -->
          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <!-- Form -->
          <UiForm v-model="form" class="space-y-6" @submit="signIn">
            <!-- Email -->
            <UiFormItem label="Email address" prop="email" required>
              <UiInput
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="Enter your email"
              />
            </UiFormItem>

            <!-- Password -->
            <UiFormItem label="Password" prop="password" required>
              <UiInput
                v-model="form.password"
                type="password"
                autocomplete="current-password"
                placeholder="Enter your password"
              />
            </UiFormItem>

            <!-- Remember me & Forgot password -->
            <div class="flex items-center justify-between">
              <UiCheckbox v-model="form.remember">
                Remember me
              </UiCheckbox>

              <NuxtLink
                to="/forgot-password"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </NuxtLink>
            </div>

            <!-- Submit -->
            <UiButton
              type="submit"
              :loading="form.processing"
              variant="primary"
              class="w-full"
            >
              Sign in
            </UiButton>
          </UiForm>
        </div>

        <!-- Footer Links -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Need help?
            <a href="/support" class="font-medium text-indigo-600 hover:text-indigo-500">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
