<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

const { model, rules } = defineProps<{
  processing?: boolean;
  disableSubmit?: boolean;
  submitText?: string;
  rules?: FormRules;
  model?: Record<string, any>;
}>();
const emit = defineEmits<{
  (e: 'submit'): void;
}>();

const { t } = useI18n();
const formRef = ref<FormInstance>();

async function submit(formEl?: FormInstance) {
  if (formEl && rules) {
    await formEl.validate((valid, fields) => {
      if (valid) {
        emit('submit');
      }
      else {
        console.error('error fields', fields);
      }
    });
  }
  else {
    // No validation rules, just emit submit
    emit('submit');
  }
}
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" label-position="top" :status-icon="true" :validate-on-rule-change="false" @submit.prevent="submit(formRef)">
    <slot />
  </el-form>
</template>
