<script setup lang="ts">
import type { LocationQueryValue } from '#vue-router';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
  displayValue: string;
}

interface ExportOption {
  label: string;
  value: string;
  icon?: string;
}

interface DataTableProps {
  data: any[];
  tableKey: string;
  columns?: TableColumn[];
  meta?: CursorPaginationMeta;
  error?: any;
  loading?: boolean;
  stripe?: boolean;
  searchValue?: string | LocationQueryValue | LocationQueryValue[];
  rowClassName?: (data: { row: any; rowIndex: number }) => string;
  spanMethod?: (data: { row: any; column: any; rowIndex: number; columnIndex: number }) => number[] | { rowspan: number; colspan: number };
  filters?: Record<string, FilterOption[]>;
  activeFilters?: ActiveFilter[];
  exportOptions?: ExportOption[];
  withHeader?: boolean;
}

interface Emits {
  onReset: [];
  onRefresh: [];
  onPageChange: [value: { cursor?: string | null; limit?: number; search?: string; filters?: Record<string, string> }];
  onSearch: [value: string];
  onFilterChange: [value: { key: string; value: string; active: boolean }];
  onExport: [value: { format: string; data: any[] }];
  onLoadMore: [];
  selectionChange: [row: any[]];
  rowClick: [row: any, column: any, event: Event];
}

const props = withDefaults(defineProps<DataTableProps>(), {
  stripe: true,
  withHeader: true,
});
const emit = defineEmits<Emits>();
const configColumnKey = `${props.tableKey}-columns-presets`;

const { debounce, isEmpty } = useLodash();
const { columns, updateConfig } = useTableColumnConfig(configColumnKey);

const searchInput = ref<any>(props.searchValue ?? '');
const activeFilters = ref<ActiveFilter[]>(props.activeFilters ?? []);

interface CursorPaginationMeta {
  afterCursor?: string | null;
  hasMore?: boolean;
  limit?: number;
  perPage?: number;
  total?: number;
}

const normalizedMeta = computed(() => {
  return {
    afterCursor: props.meta?.afterCursor ?? null,
    hasMore: props.meta?.hasMore ?? Boolean(props.meta?.afterCursor),
    limit: props.meta?.limit ?? props.meta?.perPage,
    total: props.meta?.total,
  };
});

const onInput = debounce((value: string) => {
  emit('onPageChange', {
    search: value,
  });
}, 500);

function updateSearchInput(value: string) {
  searchInput.value = value;
  onInput(value);
}

function handleFilterChange(filterKey: string, filterValue: string, active: boolean) {
  emit('onFilterChange', { key: filterKey, value: filterValue, active });
}

function removeFilter(filter: ActiveFilter) {
  activeFilters.value = activeFilters.value.filter(f => !(f.key === filter.key && f.value === filter.value));
  handleFilterChange(filter.key, filter.value, false);
}

function handleExport(format: string) {
  emit('onExport', { format, data: props.data });
}

function handleLoadMore() {
  if (!normalizedMeta.value.hasMore) {
    return;
  }
  emit('onLoadMore');
}

function handleRefresh() {
  emit('onRefresh');
}

// Watch for changes in activeFilters prop
watch(() => props.activeFilters, (newFilters) => {
  if (newFilters) {
    activeFilters.value = [...newFilters];
  }
}, { immediate: true });

const tableColumns = ref<TableColumn[]>(props.columns ?? []);
const visibleColumns = computed(() => {
  return tableColumns.value
    .filter(column => column.visible)
    .map((column) => {
      if (column.children && column.children.length > 0) {
        return {
          ...column,
          children: column.children.filter(child => child.visible),
        };
      }
      return column;
    });
});

/**
 * Toggles the visibility of a column based on its 'prop'.
 * @param {string} prop - The 'prop' of the column to toggle.
 */
function handleColumnToggle(prop: string) {
  for (const column of tableColumns.value) {
    if (column.children && column.children.length > 0) {
      const childColumn = column.children.find(child => child.prop === prop);
      if (childColumn) {
        childColumn.visible = !childColumn.visible;
        column.visible = column.children.some(c => c.visible);
        break;
      }
    }
    else {
      if (column.prop === prop) {
        column.visible = !column.visible;
        break;
      }
    }
  }
  // Persist the changes
  updateConfig(tableColumns.value);
}
function handleRowClick(row: any, column: any, event: Event) {
  emit('rowClick', row, column, event);
}

watch(columns, (loadedSavedColumns) => {
  if (!isEmpty(loadedSavedColumns) && loadedSavedColumns.length === tableColumns.value.length) {
    // console.log(loadedSavedColumns);
    tableColumns.value = tableColumns.value.map(tableColumn => ({
      ...tableColumn,
      visible: loadedSavedColumns.find(loadedSavedColumn => loadedSavedColumn.prop === tableColumn.prop)?.visible ?? false,
    }));
    // tableColumns.value = loadedSavedColumns;
  }
});
</script>

<template>
  <div class="w-full">
    <!-- Header Section: Search, Column Visibility, Filters, Toolbar -->
    <div v-if="props.withHeader" class="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <!-- Left Side: Search and Controls -->
      <div class="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        <!-- Search Form -->
        <form class="flex w-full items-center gap-2 sm:w-[260px] sm:shrink-0" @submit.prevent="updateSearchInput(searchInput)">
          <UiInput
            :model-value="searchInput"
            size="small"
            type="text"
            placeholder="Search..."
            @update:model-value="updateSearchInput"
          >
            <template #prefix>
              <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </template>
          </UiInput>
        </form>

        <!-- Controls: Column Visibility & Filters -->
        <div class="column__vis flex flex-wrap items-center ms-2">
          <!-- Column Visibility Toggle -->
          <ElPopover trigger="click" :width="250" :teleported="true">
            <template #reference>
              <UiButton variant="default" size="default" title="Column Visibility">
                <NIcon name="lucide:eye-off" />
              </UiButton>
            </template>
            <template #default>
              <div class="flex flex-col gap-2 text-sm">
                <template v-for="column in tableColumns" :key="column.label">
                  <div v-if="column.children && column.children.length > 0" class="flex flex-col gap-1">
                    <div class="text-black">
                      {{ column.label }}
                    </div>
                    <div class="ml-3 flex flex-col gap-1">
                      <UiCheckbox
                        v-for="child in column.children"
                        :key="child.label"
                        :model-value="child.visible"
                        :label="child.label"
                        @change="() => handleColumnToggle(child.prop as string)"
                      />
                    </div>
                  </div>
                  <div v-else>
                    <UiCheckbox
                      :model-value="column.visible"
                      :label="column.label"
                      @change="() => handleColumnToggle(column.prop as string)"
                    />
                  </div>
                </template>
              </div>
            </template>
          </ElPopover>

          <UiButton variant="default" size="default" title="Refresh" @click="() => handleRefresh()">
            <NIcon name="lucide:refresh-ccw" :class="{ 'animate-spin': loading }" />
          </UiButton>

          <!-- Filters Dropdown -->
          <ElPopover v-if="props.filters && Object.keys(props.filters).length > 0" trigger="click" :width="300" :teleported="true">
            <template #reference>
              <UiButton variant="default" title="Filters">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              </UiButton>
            </template>
            <template #default>
              <div class="flex flex-col gap-3 text-sm">
                <div class="border-b border-gray-200 pb-2 font-medium text-gray-900">
                  Filters
                </div>
                <template v-for="(filterOptions, filterKey) in props.filters" :key="filterKey">
                  <div class="flex flex-col gap-1">
                    <div class="font-medium text-gray-700 capitalize">
                      {{ filterKey.replace('_', ' ') }}
                    </div>
                    <div class="ml-2 flex flex-col gap-1">
                      <ElCheckbox
                        v-for="option in filterOptions"
                        :key="option.value"
                        :model-value="activeFilters.some(f => f.key === filterKey && f.value === option.value)"
                        @change="(checked) => handleFilterChange(filterKey, option.value, !!checked)"
                      >
                        <span class="flex items-center justify-between w-full">
                          <span>{{ option.label }}</span>
                          <span v-if="option.count" class="text-xs text-gray-500 ml-2">({{ option.count }})</span>
                        </span>
                      </ElCheckbox>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </ElPopover>

          <!-- Export Dropdown -->
          <ElPopover v-if="props.exportOptions && props.exportOptions.length > 0" trigger="click" :width="200" :teleported="true">
            <template #reference>
              <UiButton variant="default" size="default" title="Export Data">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </UiButton>
            </template>
            <template #default>
              <div class="flex flex-col gap-2 text-sm">
                <div class="border-b border-gray-200 pb-2 font-medium text-gray-900">
                  Export Data
                </div>
                <div class="flex flex-col gap-1">
                  <button
                    v-for="option in props.exportOptions"
                    :key="option.value"
                    type="button"
                    class="flex items-center gap-3 rounded px-3 py-2 text-left hover:bg-gray-100"
                    @click="handleExport(option.value)"
                  >
                    <span v-if="option.icon" class="text-base">{{ option.icon }}</span>
                    <svg v-else class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{{ option.label }}</span>
                  </button>
                </div>
              </div>
            </template>
          </ElPopover>
        </div>
      </div>
      <div class="flex w-full flex-wrap items-center justify-end gap-2 lg:w-auto">
        <slot name="filter" />
        <slot name="filters" />
        <slot name="toolbar" />
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="activeFilters.length > 0" class="mb-4 flex flex-wrap items-center gap-2">
      <div class="flex flex-wrap gap-2">
        <div
          v-for="filter in activeFilters"
          :key="`${filter.key}-${filter.value}`"
          class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
        >
          <span class="capitalize">{{ filter.label }}:</span>
          <span>{{ filter.displayValue }}</span>
          <button
            type="button"
            class="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-blue-200"
            @click="removeFilter(filter)"
          >
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-lg bg-white">
      <UiTable
        :data="props.data"
        :loading="props.loading"
        :border="true"
        :stripe="props.stripe"
        :row-class-name="props.rowClassName"
        :span-method="props.spanMethod"
        @row-click="handleRowClick"
        @selection-change="$emit('selectionChange', $event)"
      >
        <template v-for="(column) in visibleColumns" :key="column.label">
          <UiTableColumnNested :column="column">
            <template v-for="(_, slotName) in $slots" #[slotName]="scope">
              <slot :name="slotName" :row="scope.row" :column="scope.col" :index="scope.index" />
            </template>
          </UiTableColumnNested>
        </template>
      </UiTable>
    </div>

    <!-- Load More -->
    <div v-if="props.meta" class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <span class="text-sm text-gray-700">
        Showing {{ props.data.length }}{{ normalizedMeta.total ? ` of ${normalizedMeta.total}` : '' }}
      </span>
      <UiButton
        size="small"
        variant="default"
        :disabled="!normalizedMeta.hasMore"
        @click="handleLoadMore"
      >
        Load more
      </UiButton>
    </div>
  </div>
</template>
