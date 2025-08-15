<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean;
  title?: string;
  width?: string;
  headerType?: 'default' | 'centered';
  headerVariant?: 'primary' | 'warning';
  modalType?: 'warning' | 'error';
  alignCenter?: boolean;
}>(), {
  headerType: 'default',
  modalType: 'warning',
  alignCenter: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value?: boolean): void;
  (e: 'open'): void;
  (e: 'close'): void;
}>();

const { session } = useRefresh();

const dialogRef = ref();
const value = ref<boolean>(props.modelValue ?? false);

function open() {
  value.value = !value.value;

  if (value.value) {
    emit('open');
  }
  else {
    emit('close');
  }
}

function close() {
  dialogRef.value?.handleClose();
}

// Watch for external modelValue changes and sync with internal value
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    value.value = newValue;
  }
});

// Watch internal value changes and emit to parent
watch(value, (newValue) => {
  emit('update:modelValue', newValue);
  if (newValue) {
    emit('open');
  }
  else {
    emit('close');
  }
});

watch(session, () => {
  value.value = false;
  emit('close');
});

defineExpose({
  close,
});
</script>

<template>
  <div @click="open">
    <slot name="trigger" />
  </div>
  <el-dialog
    ref="dialogRef"
    v-model="value"
    :width="width ?? '45%'"
    :show-close="false"
    :align-center="alignCenter"
    :append-to-body="true"
    :destroy-on-close="true"
    modal-class="backdrop-blur-sm"
    :header-class="headerType !== 'default' ? 'hidden' : ''"
  >
    <template #header="{ close: handleClose }">
      <div class="flex items-center justify-between">
        <div v-if="title" class="text-lg">
          {{ title }}
        </div>
        <SharedButtonIcon
          name="ic:round-close"
          size="1.5em"
          color="white"
          transparent
          @click="handleClose"
        />
      </div>
    </template>
    <div class="space-y-2" :class="{ 'pb-6': !$slots.footer }">
      <div v-if="headerType === 'centered'" class="flex flex-col items-center">
        <div
          class="mb-4 max-h-[92px] max-w-[92px] min-h-[92px] min-w-[92px] flex items-center justify-center rounded-full"
          :class="{
            'bg-[#FEC2651F]/24': modalType === 'warning',
            'bg-[#FF4D4F1F]/24': modalType === 'error',
          }"
        >
          <svg
            class="h-10 w-10"
            :class="{
              'text-[#FEC265]': modalType === 'warning',
              'text-[#FF4D4F]': modalType === 'error',
            }"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span v-if="title" class="text-2xl text-black font-bold">
          {{ title }}
        </span>
      </div>
      <slot />
    </div>
    <div v-if="$slots.footer">
      <div class="my-6 h-px bg-[#DCDFE6]" />
      <div class="">
        <slot name="footer" />
      </div>
    </div>
  </el-dialog>
</template>

<style lang="postcss">
.shared-dialog .el-dialog__header {
  @apply py-4 px-6 bg-base-500 text-white;
}

.shared-dialog .el-dialog__body {
  @apply p-0;
}
</style>
