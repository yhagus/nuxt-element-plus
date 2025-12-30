<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  title?: string;
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt';
  size?: string | number;
}
interface Emits {
  'update:modelValue': [row: any];
}

const props = defineProps<Props>();
defineEmits<Emits>();

const drawerRef = ref();

function close() {
  if (drawerRef.value) {
    drawerRef.value.handleClose();
  }
}

defineExpose({
  close,
});
</script>

<template>
  <ElDrawer ref="drawerRef" :model-value="props.modelValue" :title="props.title" :direction="props.direction" :size="props.size" @update:model-value="$emit('update:modelValue', $event)">
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <slot />
  </ElDrawer>
</template>

<style scoped lang="scss">

</style>
