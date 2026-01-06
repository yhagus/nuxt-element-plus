<script setup lang="ts">
const props = defineProps<{
  options: {
    label: string;
    value: string;
  }[];
  modelValue?: any;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  filterable?: boolean;
  clearable?: boolean;
  size?: 'small' | 'default' | 'large';
  remote?: boolean;
  remoteMethod?: (query: string) => void;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'onOpen'): void;
  (e: 'onClose'): void;
  (e: 'onVisibleChange', value: boolean): void;
}>();

function visibleChange(value: boolean) {
  if (value) {
    emit('onOpen');
  }
  else {
    emit('onClose');
  }
}

const intervalId = ref();
const loadingText = ref();
function loadingAnimation() {
  let count = 0;

  intervalId.value = setInterval(() => {
    if (loadingText.value) {
      count = (count % 3) + 1;
      loadingText.value.textContent = `Loading${' .'.repeat(count)}`;
    }
  }, 500);
}

onMounted(() => {
  loadingAnimation();
});
onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <el-select class="v2-select" :loading="props.loading" :remote="props.remote" :remote-method="props.remoteMethod" :clearable="props.clearable ?? true" :disabled="props.disabled" collapse-tags :max-collapse-tags="2" :multiple="props.multiple" :placeholder="props.placeholder" :filterable="props.filterable" :model-value="props.modelValue" @visible-change="visibleChange" @update:model-value="$emit('update:modelValue', $event)">
    <template #loading>
      <div class="flex justify-center py-2">
        <span ref="loadingText" class="loading text-sm tracking-wide">Loading</span>
      </div>
    </template>
    <ElOption v-for="(option, index) in props.options" :key="index" :label="option.label" :value="option.value" />
  </el-select>
</template>
