<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const props = defineProps<{
  item: SidebarMenuItem;
  isCollapse: boolean;
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
    :class="{ 'sidebar-menu-item--active': isActive, 'sidebar-menu-item--collapse': isCollapse }"
    :title="isCollapse ? item.title : undefined"
  >
    <span class="sidebar-menu-item__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span v-if="!isCollapse" class="sidebar-menu-item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.sidebar-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 18px;
  color: #42675f;
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    background: rgba(90, 179, 154, 0.12);
    color: #173732;
  }
}

.sidebar-menu-item--active {
  background: #173732;
  color: #f8f5ed;
  box-shadow: 0 16px 28px rgba(23, 55, 50, 0.18);
}

.sidebar-menu-item--collapse {
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
