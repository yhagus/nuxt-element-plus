<script setup lang="ts">
const config = useRuntimeConfig();
useHead({
  titleTemplate: (title?: string) => {
    return title ? `${title} | ${config.public.appTitle}` : config.public.appTitle;
  },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
