<script setup lang="ts">
interface Props {
  disabled?: boolean;
  loading?: boolean;
  text?: boolean;
  round?: boolean;
  circle?: boolean;
  bg?: boolean;
  size?: 'large' | 'default' | 'small';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | '' | 'text';
  type?: 'button' | 'submit' | 'reset';
  onClick?: ((evt: MouseEvent) => any);
  // Theme customization props
  primaryColor?: string;
  successColor?: string;
  warningColor?: string;
  dangerColor?: string;
  infoColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverOpacity?: number;
  borderRadius?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
  // Default Element Plus theme colors
  primaryColor: '#409eff',
  successColor: '#67c23a',
  warningColor: '#e6a23c',
  dangerColor: '#f56c6c',
  infoColor: '#909399',
  textColor: '#606266',
  borderColor: '#dcdfe6',
  hoverOpacity: 0.8,
  borderRadius: '4px',
});

defineEmits<{
  (e: 'click', evt: MouseEvent): void;
}>();

// Compute CSS variables for theming using Element Plus naming convention
const cssVars = computed(() => ({
  '--el-color-primary': props.primaryColor,
  '--el-color-success': props.successColor,
  '--el-color-warning': props.warningColor,
  '--el-color-danger': props.dangerColor,
  '--el-color-info': props.infoColor,
  '--el-text-color-primary': props.textColor,
  '--el-border-color': props.borderColor,
  '--el-border-radius-base': props.borderRadius,
}));
</script>

<template>
  <ElButton
    :type="variant"
    :loading="loading"
    :disabled="disabled"
    :native-type="type"
    :on-click="onClick"
    :size="size"
    :bg="bg"
    :circle="circle"
    :round="round"
    :text="text"
    :style="cssVars"
    @click="evt => $emit('click', evt)"
  >
    <slot />
  </ElButton>
</template>

<style lang="scss">
// Enhanced hover effects for buttons
.el-button+.el-button {
  margin-left: 0;
}
.el-button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover:not(:disabled):not(.is-loading) {
    //transform: translateY(-1px);
    //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled):not(.is-loading) {
    transform: translateY(0);
    //box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  &.is-disabled {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  &.is-loading {
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
