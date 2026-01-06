<script setup lang="ts">
const props = defineProps<{
  label?: string;
  modelValue?: boolean;
}>();
defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();
</script>

<template>
  <ElCheckbox :label="props.label" :model-value="props.modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-if="$slots.default" />
  </ElCheckbox>
</template>
