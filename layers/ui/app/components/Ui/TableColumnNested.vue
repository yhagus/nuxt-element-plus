<script setup lang="ts">
const props = defineProps<{
  column: TableColumn;
}>();
</script>

<template>
  <UiTableColumn :label="props.column.label" :prop="props.column.prop" :align="props.column.align" :width="props.column.width" :min-width="props.column.minWidth" :type="props.column.type">
    <template v-if="props.column?.children && props.column.children.length > 0" #[props.column.prop]>
      <UiTableColumnNested v-for="(childColumn) in props.column.children" :key="childColumn.prop as string" :column="childColumn" />
    </template>
    <template v-else-if="$slots[props.column.prop as string]" #[props.column.prop]="{ column: col, row, index }">
      <slot :name="props.column.prop as string" :column="col" :row="row" :index="index" />
    </template>
  </UiTableColumn>
</template>
