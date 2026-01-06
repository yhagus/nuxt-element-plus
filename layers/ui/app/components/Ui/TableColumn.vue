<script setup lang="ts">
type TableProp = (prop: any, index: number, column: any) => string;
interface TableColumnProp {
  label: string;
  prop: string | TableProp;
  width?: number | string;
  minWidth?: number | string;
  align?: 'center' | 'left' | 'right';
  headerAlign?: 'center';
  sort?: boolean;
  fixed?: 'right' | 'left';
  type?: 'default' | 'selection' | 'index' | 'expand';
  children?: TableColumn[];
}
const props = defineProps<TableColumnProp>();
</script>

<template>
  <el-table-column
    class-name="ui-table-column"
    label-class-name="ui-table-column__header"
    :label="props.label"
    :type="props.type"
    :prop="props.prop as TableProp"
    :width="props.width"
    :min-width="props.minWidth"
    :align="props.align"
    :header-align="props.headerAlign"
  >
    <template #default="scope">
      <div v-if="(typeof props.prop === 'function')">
        {{ props.prop(scope.row, scope.$index, scope.col) }}
      </div>
      <slot v-else-if="$slots[props.prop]" :name="props.prop" :row="scope.row" :index="scope.$index" :column="scope.col" />
    </template>
  </el-table-column>
</template>

<style scoped lang="scss">
:deep(.ui-table-column) {
  color: var(--el-text-color-regular);
}

:deep(.ui-table-column__header) {
  color: var(--el-text-color-primary);
}
</style>
