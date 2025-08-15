<script setup lang="ts">
interface Props {
  modelValue?: any;
  height?: number | string;
  placeholder?: string;
  disabledDate?: (time: Date) => boolean;
  size?: 'small';
  type?: 'year' | 'years' | 'month' | 'months' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange' | 'yearrange';
  format?: string;
  valueFormat?: string;
  defaultValue?: Date;
}
withDefaults(defineProps<Props>(), {
  size: 'small',
});
defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <ElDatePicker
    :type="type"
    :placeholder="placeholder"
    :format="format ?? 'DD/MM/YYYY'"
    :default-value="defaultValue"
    :disabled-date="disabledDate"
    :value-format="valueFormat ?? 'YYYY-MM-DD'"
    auto-complete="off"
    :model-value="modelValue"
    @change="$emit('update:modelValue', $event)"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
