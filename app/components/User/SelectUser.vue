<script setup lang="ts">
const props = defineProps<{
  modelValue?: any;
}>();

defineEmits(['update:modelValue']);

const { data, status, refresh } = await useAsyncData(
  'list-bank',
  () => api.user.getFindAll(),
  {
    lazy: true,
    immediate: !!props.modelValue,
  },
);

const options = computed(() => {
  return data.value?.data?.map(item => ({
    value: item.id,
    label: item.name,
  })) ?? [];
});
</script>

<template>
  <UiSelect
    :model-value="props.modelValue"
    :options="options"
    :loading="status === 'pending'"
    @on-open="refresh"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
