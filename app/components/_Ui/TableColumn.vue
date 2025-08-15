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
  <el-table-column :label="props.label" :type="props.type" :prop="props.prop as TableProp" :width="width" :min-width="minWidth" :align="align" :header-align="headerAlign">
    <template #default="scope">
      <div v-if="(typeof props.prop === 'function')">
        {{ props.prop(scope.row, scope.$index, scope.col) }}
      </div>
      <slot v-else-if="$slots[props.prop]" :name="props.prop" :row="scope.row" :index="scope.$index" :column="scope.col" />
    </template>
  </el-table-column>
</template>

<style scoped>

</style>
