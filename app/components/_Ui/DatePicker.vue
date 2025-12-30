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
const props = withDefaults(defineProps<Props>(), {
  size: 'small',
});
defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <ElDatePicker
    :type="props.type"
    :placeholder="props.placeholder"
    :format="props.format ?? 'DD/MM/YYYY'"
    :default-value="props.defaultValue"
    :disabled-date="props.disabledDate"
    :value-format="props.valueFormat ?? 'YYYY-MM-DD'"
    auto-complete="off"
    :model-value="props.modelValue"
    @change="$emit('update:modelValue', $event)"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
