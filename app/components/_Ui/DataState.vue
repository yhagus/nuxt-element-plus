<script setup lang="ts">
const props = defineProps<{
  loading?: boolean;
  hasData?: boolean;
}>();

const showLoading = ref(false);
const delayed = ref(true);
let timer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.loading,
  (newLoading) => {
    if (newLoading) {
      delayed.value = true;
      showLoading.value = false;
      timer = setTimeout(() => {
        showLoading.value = true;
        delayed.value = false;
      }, 500);
    }
    else {
      if (timer)
        clearTimeout(timer);
      showLoading.value = false;
      delayed.value = false;
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (timer)
    clearTimeout(timer);
});
</script>

<template>
  <div>
    <UiLoadingState v-if="showLoading" />
    <slot v-else-if="hasData" />
    <UiEmptyState v-else-if="!delayed" />
  </div>
</template>

<style scoped lang="postcss">

</style>
