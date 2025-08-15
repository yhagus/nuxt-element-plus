<script setup lang="ts">
interface PaginationProps {
  pageSize?: number;
  currentPage?: number;
  total?: number;
  pageSizes?: number[];
  defaultPageSize?: number;
  layout?: string;
  defaultCurrentPage?: number;
  size?: 'small' | 'default' | 'large';
  hideOnSinglePage?: boolean;
  // Theme customization props
  activeColor?: string;
  hoverColor?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  disabledColor?: string;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  size: 'small',
  pageSizes: () => [10, 20, 50, 100],
  defaultPageSize: 10,
  defaultCurrentPage: 1,
  hideOnSinglePage: true,
  // Default light theme colors
  activeColor: '#409eff',
  hoverColor: '#66b1ff',
  textColor: '#606266',
  backgroundColor: '#ffffff',
  borderColor: '#dcdfe6',
  disabledColor: '#c0c4cc',
  layout: 'sizes, ->, prev, pager, next',
});

defineEmits<{
  (e: 'pageChange', page: number): void;
  (e: 'sizeChange', size: number): void;
  (e: 'currentChange', current: number): void;
}>();

// Compute CSS variables for theming
const cssVars = computed(() => ({
  '--ui-pagination-active-color': props.activeColor,
  '--ui-pagination-hover-color': props.hoverColor,
  '--ui-pagination-text-color': props.textColor,
  '--ui-pagination-bg-color': props.backgroundColor,
  '--ui-pagination-border-color': props.borderColor,
  '--ui-pagination-disabled-color': props.disabledColor,
}));
</script>

<template>
  <div
    class="ui-pagination"
    :class="`ui-pagination--${size}`"
    :style="cssVars"
  >
    <el-pagination
      v-bind="$attrs"
      :size="size"
      :layout="layout"
      :total="total"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :pager-count="5"
      :current-page="currentPage"
      :default-page-size="defaultPageSize"
      :default-current-page="defaultCurrentPage"
      :background="false"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="$emit('sizeChange', $event)"
      @current-change="$emit('currentChange', $event); $emit('pageChange', $event)"
    />
  </div>
</template>

<style lang="scss">
.ui-pagination {
  padding: 0.75rem 0;

  // Element Plus overrides using CSS variables
  .el-pagination {
    // Base Element Plus variables override
    --el-pagination-font-size: 14px;
    --el-pagination-border-radius: 6px;
    --el-pagination-button-width: 32px;
    --el-pagination-button-height: 32px;
    --el-pagination-item-gap: 4px;

    // Custom theme variables (mapped from props)
    --el-pagination-text-color: var(--ui-pagination-text-color);
    --el-pagination-bg-color: var(--ui-pagination-bg-color);
    --el-pagination-button-color: var(--ui-pagination-text-color);
    --el-pagination-button-bg-color: var(--ui-pagination-bg-color);
    --el-pagination-button-disabled-color: var(--ui-pagination-disabled-color);
    --el-pagination-button-disabled-bg-color: var(--ui-pagination-bg-color);
    --el-pagination-hover-color: var(--ui-pagination-hover-color);
    --el-pagination-active-color: #ffffff;
    --el-pagination-active-bg-color: var(--ui-pagination-active-color);

    // Pager styling
    .el-pager {
      li {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 50%; // Make circular
        margin: 0 2px;
        font-weight: 500;
        border: 1px solid var(--ui-pagination-border-color);
        background-color: var(--ui-pagination-bg-color);
        color: var(--ui-pagination-text-color);
        width: var(--el-pagination-button-width);
        height: var(--el-pagination-button-height);
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover:not(.is-active):not(.is-disabled) {
          background-color: var(--ui-pagination-hover-color);
          color: #ffffff;
          border-color: var(--ui-pagination-hover-color);
        }

        &.is-active {
          background-color: var(--ui-pagination-active-color);
          border-color: var(--ui-pagination-active-color);
          color: #ffffff;
          font-weight: 600;
        }

        &.is-disabled {
          background-color: var(--ui-pagination-bg-color);
          border-color: var(--ui-pagination-border-color);
          color: var(--ui-pagination-disabled-color);
          cursor: not-allowed;
        }

        &.more {
          border: none;
          background: none;
          color: var(--ui-pagination-text-color);
          border-radius: 0; // Reset border radius for more button

          &:hover {
            color: var(--ui-pagination-hover-color);
            background: none;
            transform: none;
            box-shadow: none;
          }
        }
      }
    }

    // Navigation buttons (prev/next)
    .btn-prev,
    .btn-next {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 50%; // Make circular
      margin: 0 4px;
      background-color: var(--ui-pagination-bg-color);
      border: 1px solid var(--ui-pagination-border-color);
      color: var(--ui-pagination-text-color);
      width: var(--el-pagination-button-width);
      height: var(--el-pagination-button-height);
      display: flex;
      align-items: center;
      justify-content: center;

      .el-icon {
        display: inline-flex;
      }

      &:hover:not(:disabled) {
        background-color: var(--ui-pagination-hover-color);
        border-color: var(--ui-pagination-hover-color);
        color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      &:disabled {
        background-color: var(--ui-pagination-bg-color);
        border-color: var(--ui-pagination-border-color);
        color: var(--ui-pagination-disabled-color);
        cursor: not-allowed;

        &:hover {
          transform: none;
          box-shadow: none;
        }
      }
    }

    // Page size selector
    .el-pagination__sizes {
      margin-right: 0;

      .el-select {
        .el-select__wrapper {
          border-radius: var(--el-pagination-border-radius);
          border-color: var(--ui-pagination-border-color);
          background-color: var(--ui-pagination-bg-color);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            border-color: var(--ui-pagination-hover-color);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          &.is-focused {
            border-color: var(--ui-pagination-active-color);
            box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
          }

          .el-select__selected-item {
            color: var(--ui-pagination-text-color);
          }
        }
      }
    }
  }

  // Size variants
  &--small {
    .el-pagination {
      --el-pagination-font-size: 12px;
      --el-pagination-button-width: 28px;
      --el-pagination-button-height: 28px;
    }
  }

  &--default {
    .el-pagination {
      --el-pagination-font-size: 14px;
      --el-pagination-button-width: 32px;
      --el-pagination-button-height: 32px;
    }
  }

  &--large {
    .el-pagination {
      --el-pagination-font-size: 16px;
      --el-pagination-button-width: 36px;
      --el-pagination-button-height: 36px;
    }
  }
}
</style>
