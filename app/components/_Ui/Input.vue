<script setup lang="ts">
defineProps<{
  modelValue?: any;
  type?: string;
  rows?: number;
}>();
defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <ElInput :model-value="modelValue" :type="type" :rows="rows" :show-password="type === 'password'" @update:model-value="$emit('update:modelValue', $event)">
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
  </ElInput>
</template>

<style scoped lang="postcss">

</style>
