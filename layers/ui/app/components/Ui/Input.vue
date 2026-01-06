<script setup lang="ts">
const props = defineProps<{
  modelValue?: any;
  type?: string;
  rows?: number;
}>();
defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <ElInput :model-value="props.modelValue" :type="props.type" :rows="props.rows" :show-password="props.type === 'password'" @update:model-value="$emit('update:modelValue', $event)">
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
  </ElInput>
</template>

<style scoped lang="scss">

</style>
