<script setup lang="ts">
interface TooltipProps {
  content?: string;
  placement?: string;
  effect?: 'dark' | 'light' | 'custom';
  showAfter?: number;
  hideAfter?: number;
  disabled?: boolean;
  teleported?: boolean;
}

const props = defineProps<TooltipProps>();
</script>

<template>
  <el-tooltip
    :content="props.content"
    :placement="props.placement"
    :effect="props.effect"
    :show-after="props.showAfter"
    :hide-after="props.hideAfter"
    :disabled="props.disabled"
    :teleported="props.teleported"
  >
    <slot />
    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
  </el-tooltip>
</template>

<style scoped lang="scss">

</style>
