<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';

const props = withDefaults(defineProps<{
  tabs: {
    label: string;
    name: string;
    lazy?: boolean;
  }[];
  type?: 'card' | 'border-card';
  defaultValue?: string | null;
  centered?: boolean;
}>(), {
  centered: false,
});
defineEmits<{
  (e: 'tabClick', pane: TabsPaneContext): void;
}>();
const activeName = ref<string>(props.defaultValue ?? props.tabs?.[0]?.name ?? '');

const marginLeft = computed(() => props.centered ? 'auto' : '0');
const marginRight = computed(() => props.centered ? 'auto' : '0');
</script>

<template>
  <el-tabs v-model="activeName" class="uitab" @tab-click="(pane, ev) => $emit('tabClick', pane)">
    <ElTabPane v-for="(item) in tabs" :key="item.name" :label="item.label" :name="item.name" :lazy="item.lazy">
      <template v-if="activeName === item.name" #default="emit">
        <slot :name="item.name" :emit="emit" />
      </template>
    </ElTabPane>
  </el-tabs>
</template>

<style lang="scss">
.uitab {
  .el-tabs__nav-wrap {
    display: inline-block;
    flex: none;
    padding-right: 12px;
    padding-left: 12px;
    margin-left: v-bind(marginLeft);
    margin-right: v-bind(marginRight);
  }
  .el-tabs__nav-wrap:after {
  }
  .el-tabs__item {
    --el-text-color-primary: #dcdfe6;
    --el-color-primary: #dcdfe6;
  }
  .el-tabs__item.is-active,
  .el-tabs__active-bar {
    --el-color-primary: #303133;
    font-weight: 600;
  }
  .el-tabs__content {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
</style>
