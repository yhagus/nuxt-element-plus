<script setup lang="ts">
import type { FormItemRule } from 'element-plus';

defineProps<{
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
  <el-form-item class="ui-form-item" :rules="rules" :class="{ 'el-form-item__label-italic': italic }" :for="prop" :prop="prop" :error="error?.[0]" :aria-label="required ? `${label} *` : label" :label="required ? `${label} *` : label">
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <slot />
  </el-form-item>
</template>

<style>
.ui-form-item {
  --el-text-color-regular: #000;
}
</style>
