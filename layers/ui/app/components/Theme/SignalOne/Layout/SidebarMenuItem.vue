<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const props = defineProps<{
  item: SidebarMenuItem;
  compact: boolean;
}>();

const route = useRoute();

const isActive = computed(() => {
  if (props.item.path === '/') {
    return route.path === '/';
  }

  return route.path === props.item.path || route.path.startsWith(`${props.item.path}/`);
});
</script>

<template>
  <NuxtLink
    :to="item.path"
    class="sidebar-menu-item"
    :class="{ 'sidebar-menu-item--active': isActive, 'sidebar-menu-item--compact': compact }"
    :title="compact ? item.title : undefined"
  >
    <span class="sidebar-menu-item__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span v-if="!compact" class="sidebar-menu-item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.sidebar-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 16px;
  color: #9ab1d3;
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    background: rgba(85, 149, 255, 0.12);
    color: #eff5ff;
  }
}

.sidebar-menu-item--active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.24), rgba(14, 165, 233, 0.14));
  color: #eff5ff;
  box-shadow: inset 0 0 0 1px rgba(88, 119, 166, 0.18);
}

.sidebar-menu-item--compact {
  justify-content: center;
  padding: 0;
}

.sidebar-menu-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  flex-shrink: 0;
}

.sidebar-menu-item__label {
  font-size: 14px;
  font-weight: 600;
}
</style>
