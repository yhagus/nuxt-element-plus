<script setup lang="ts">
interface Props {
  column: TableColumn;
  page?: number;
  limit?: number;
}
const props = withDefaults(defineProps<Props>(), {
  page: 1,
  limit: 1,
});

function indexMethod(index: number) {
  if (props.column.type === 'index') {
    return (props.page - 1) * props.limit + index + 1;
  }
  return index;
}
</script>

<template>
  <UiTableColumn :label="props.column.label" :prop="props.column.prop" :align="props.column.align" :width="props.column.width" :min-width="props.column.minWidth" :type="props.column.type" :index="indexMethod">
    <template v-if="props.column?.children && props.column.children.length > 0" #[props.column.prop]>
      <UiTableColumnNested v-for="(childColumn) in props.column.children" :key="childColumn.prop as string" :column="childColumn">
        <template v-for="(_, slotName) in $slots" #[slotName]="scope">
          <slot :name="slotName" :column="scope.column" :row="scope.row" :index="scope.index" />
        </template>
      </UiTableColumnNested>
    </template>
    <template v-else-if="$slots[props.column.prop as string]" #[props.column.prop]="{ column: col, row, index }">
      <slot :name="props.column.prop as string" :column="col" :row="row" :index="index" />
    </template>
  </UiTableColumn>
</template>
