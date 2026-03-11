<script setup lang="ts">
interface Props {
  options: {
    label: string;
    value: string;
  }[];
  modelValue?: any;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  expanding?: boolean;
  filterable?: boolean;
  clearable?: boolean;
  size?: 'small' | 'default' | 'large';
  remote?: boolean;
  remoteMethod?: (query: string) => void;
  maxCollapseTags?: number;
  remoteShowSuffix?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxCollapseTags: 3,
  remoteShowSuffix: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'onOpen'): void;
  (e: 'onClose'): void;
  (e: 'popupScroll', value: { scrollTop: number; scrollLeft: number }): void;
  (e: 'onVisibleChange', value: boolean): void;
  (e: 'onScrollEnd'): void;
}>();

function visibleChange(value: boolean) {
  console.log('visilbe change');
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
function popupScroll(data: { scrollTop: number; scrollLeft: number }) {
  emit('popupScroll', data);

  const dropdownWrap = [...document.querySelectorAll<HTMLElement>('.el-select-dropdown__wrap')]
    .find(el => el.offsetParent !== null);

  if (!dropdownWrap) {
    return;
  }

  const isReachedBottom = dropdownWrap.scrollTop + dropdownWrap.clientHeight >= dropdownWrap.scrollHeight - 12;
  if (isReachedBottom) {
    emit('onScrollEnd');
  }
}

onMounted(() => {
  loadingAnimation();
});
onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <ElSelect
    class="v2-select"
    :loading="props.options.length < 1 && props.loading"
    :remote="props.remote"
    :remote-method="props.remoteMethod"
    :clearable="props.clearable ?? true"
    :disabled="props.disabled"
    collapse-tags
    :max-collapse-tags="props.maxCollapseTags"
    :multiple="props.multiple"
    :remote-show-suffix="props.remoteShowSuffix"
    :placeholder="props.placeholder"
    :filterable="props.filterable"
    :model-value="props.modelValue"
    @visible-change="visibleChange"
    @popup-scroll="popupScroll"
    @focus="() => visibleChange(true)"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #loading>
      <div class="flex justify-center py-2">
        <span ref="loadingText" class="loading text-sm tracking-wide">Loading</span>
      </div>
    </template>
    <ElOption v-for="(option, index) in props.options" :key="index" :label="option.label" :value="option.value" />
    <ElOption
      v-if="props.expanding"
      key="__expanding__"
      label="Memuat data tambahan..."
      value="__expanding__"
      disabled
      class="select-expanding-option"
    />
  </ElSelect>
</template>
