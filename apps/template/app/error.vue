<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <main v-if="error" class="grid min-h-screen place-items-center bg-slate-100">
    <div class="text-center">
      <h1 class="text-4xl sm:text-6xl font-semibold text-indigo-600">
        {{ error.statusCode }}
      </h1>
      <h2 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        {{ error.statusMessage }}
      </h2>
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        {{ error.message }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <nuxt-link to="/public" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Go back to Home
        </nuxt-link>
      </div>
    </div>
  </main>
</template>
