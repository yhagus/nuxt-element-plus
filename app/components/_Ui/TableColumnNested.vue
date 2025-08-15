<script setup lang="ts">
defineProps<{
  column: TableColumn;
}>();
</script>

<template>
  <UiTableColumn :label="column.label" :prop="column.prop" :align="column.align" :width="column.width" :min-width="column.minWidth" :type="column.type">
    <template v-if="column?.children && column.children.length > 0" #[column.prop]>
      <UiTableColumnNested v-for="(childColumn) in column.children" :key="childColumn.prop as string" :column="childColumn" />
    </template>
    <template v-else-if="$slots[column.prop as string]" #[column.prop]="{ column: col, row, index }">
      <slot :name="column.prop as string" :column="col" :row="row" :index="index" />
    </template>
  </UiTableColumn>
</template>
