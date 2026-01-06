<script setup lang="ts">
interface LoadingStateProps {
  type?: 'table' | 'card' | 'spinner' | 'list' | 'form';
}
// Script setup remains empty as this is a static loading state
const props = withDefaults(defineProps<LoadingStateProps>(), {
  type: 'table',
});
</script>

<template>
  <!-- Table loading state -->
  <div v-if="props.type === 'table'" class="min-h-screen w-full animate-pulse">
    <div class="overflow-hidden rounded-lg bg-white shadow-md">
      <div class="flex border-b border-gray-100/75 bg-gray-100/75 p-4">
        <div class="mr-4 h-6 w-1/4 flex-1 rounded-md bg-gray-100/75" />
        <div class="mr-4 h-6 w-1/3 flex-1 rounded-md bg-gray-100/75" />
        <div class="mr-4 h-6 w-1/5 flex-1 rounded-md bg-gray-100/75" />
        <div class="h-6 w-1/6 flex-1 rounded-md bg-gray-100/75" />
      </div>

      <div class="divide-y divide-gray-100/75">
        <div class="flex p-4">
          <div class="mr-4 h-5 w-1/4 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/3 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/5 flex-1 rounded-sm bg-gray-100/75" />
          <div class="h-5 w-1/6 flex-1 rounded-sm bg-gray-100/75" />
        </div>
        <div class="flex bg-gray-50 p-4">
          <div class="mr-4 h-5 w-1/5 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/2 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/4 flex-1 rounded-sm bg-gray-100/75" />
          <div class="h-5 w-1/6 flex-1 rounded-sm bg-gray-100/75" />
        </div>
        <div class="flex p-4">
          <div class="mr-4 h-5 w-1/6 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/4 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/3 flex-1 rounded-sm bg-gray-100/75" />
          <div class="h-5 w-1/5 flex-1 rounded-sm bg-gray-100/75" />
        </div>
        <div class="flex bg-gray-50 p-4">
          <div class="mr-4 h-5 w-1/4 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/3 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/5 flex-1 rounded-sm bg-gray-100/75" />
          <div class="h-5 w-1/6 flex-1 rounded-sm bg-gray-100/75" />
        </div>
        <div class="flex p-4">
          <div class="mr-4 h-5 w-1/5 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/2 flex-1 rounded-sm bg-gray-100/75" />
          <div class="mr-4 h-5 w-1/4 flex-1 rounded-sm bg-gray-100/75" />
          <div class="h-5 w-1/6 flex-1 rounded-sm bg-gray-100/75" />
        </div>
      </div>
    </div>
  </div>

  <!-- Card loading state -->
  <div v-else-if="props.type === 'card'" class="animate-pulse">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 6" :key="i" class="rounded-lg bg-white p-6 shadow-md">
        <div class="mb-4 h-4 w-3/4 rounded bg-gray-100/75" />
        <div class="mb-2 h-3 w-full rounded bg-gray-100/75" />
        <div class="mb-2 h-3 w-5/6 rounded bg-gray-100/75" />
        <div class="h-3 w-4/6 rounded bg-gray-100/75" />
      </div>
    </div>
  </div>

  <!-- Spinner loading state -->
  <div v-else-if="props.type === 'spinner'" class="flex items-center justify-center p-8">
    <div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
  </div>

  <!-- List loading state -->
  <div v-else-if="props.type === 'list'" class="animate-pulse space-y-3">
    <div v-for="i in 8" :key="i" class="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-sm">
      <div class="h-10 w-10 rounded-full bg-gray-100/75" />
      <div class="flex-1 space-y-2">
        <div class="h-4 w-3/4 rounded bg-gray-100/75" />
        <div class="h-3 w-1/2 rounded bg-gray-100/75" />
      </div>
    </div>
  </div>

  <!-- Form loading state -->
  <div v-else-if="props.type === 'form'" class="animate-pulse space-y-6">
    <div class="rounded-lg bg-white p-6 shadow-md">
      <div class="mb-6 h-6 w-1/3 rounded bg-gray-100/75" />
      <div class="space-y-4">
        <div v-for="i in 5" :key="i" class="space-y-2">
          <div class="h-4 w-1/4 rounded bg-gray-100/75" />
          <div class="h-10 w-full rounded border bg-gray-100/75" />
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <div class="h-10 w-20 rounded bg-gray-100/75" />
          <div class="h-10 w-20 rounded bg-gray-100/75" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* No specific styles needed outside of Tailwind utility classes */
</style>
