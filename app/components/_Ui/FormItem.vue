<script setup lang="ts">
import type { FormItemRule } from 'element-plus';

const props = defineProps<{
  label?: string;
  required?: boolean;
  error?: string[];
  description?: string;
  prop?: string;
  italic?: boolean;
  labelSize?: 'small';
  rules?: FormItemRule[];
}>();
</script>

<template>
  <el-form-item class="ui-form-item" :rules="props.rules" :class="{ 'el-form-item__label-italic': props.italic }" :for="props.prop" :prop="props.prop" :error="props.error?.[0]" :aria-label="props.required ? `${props.label} *` : props.label" :label="props.required ? `${props.label} *` : props.label">
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <slot />
  </el-form-item>
</template>

<style scoped lang="scss">
.ui-form-item {
  --el-text-color-regular: var(--el-text-color-primary);
}
</style>
