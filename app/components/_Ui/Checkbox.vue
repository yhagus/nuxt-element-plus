<script setup lang="ts">
defineProps<{
  label?: string;
  modelValue?: boolean;
}>();
defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();
</script>

<template>
  <ElCheckbox :label="label" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <slot v-if="$slots.default" />
  </ElCheckbox>
</template>
