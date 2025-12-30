<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  disabled?: boolean;
  loading?: boolean;
  text?: boolean;
  round?: boolean;
  circle?: boolean;
  bg?: boolean;
  size?: 'large' | 'default' | 'small';
  variant?: 'default' | 'primary' | 'success' | 'secondary' | 'warning' | 'danger' | 'info' | '' | 'text';
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  onClick?: ((evt: MouseEvent) => any);
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
});

defineEmits<{
  (e: 'click', evt: MouseEvent): void;
}>();
const colorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const rgbPattern = /^rgba?\(\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])(?:\s*,\s*(?:0|0?\.\d+|1))?\s*\)$/;
const hasCustomColor = computed(() => Boolean(props.color && (colorPattern.test(props.color) || rgbPattern.test(props.color))));
const colorStyle = computed(() => (hasCustomColor.value ? { '--ui-button-color': props.color } : undefined));

</script>

<template>
  <ElButton
    class="ui-button"
    :class="{ 'ui-button--custom-color': hasCustomColor }"
    :style="colorStyle"
    :type="props.variant"
    :loading="props.loading"
    :disabled="props.disabled"
    :native-type="props.type"
    :on-click="props.onClick"
    :size="props.size"
    :bg="props.bg"
    :circle="props.circle"
    :round="props.round"
    :text="props.text"
    @click="evt => $emit('click', evt)"
  >
    <slot />
  </ElButton>
</template>

<style lang="scss">
.ui-button {
  &.ui-button--custom-color {
    --el-button-bg-color: var(--ui-button-color);
    --el-button-border-color: var(--ui-button-color);
    --el-button-hover-bg-color: color-mix(in srgb, var(--ui-button-color) 92%, #ffffff 8%);
    --el-button-hover-border-color: color-mix(in srgb, var(--ui-button-color) 92%, #ffffff 8%);
    --el-button-active-bg-color: color-mix(in srgb, var(--ui-button-color) 88%, #000000 12%);
    --el-button-active-border-color: color-mix(in srgb, var(--ui-button-color) 88%, #000000 12%);
    --el-button-text-color: #fff;

    &.is-text,
    &.el-button--text {
      --el-button-bg-color: transparent;
      --el-button-border-color: transparent;
      --el-button-text-color: var(--ui-button-color);
      --el-button-hover-text-color: color-mix(in srgb, var(--ui-button-color) 88%, #000000 12%);
      --el-button-active-text-color: color-mix(in srgb, var(--ui-button-color) 82%, #000000 18%);
    }
  }
}
</style>
