<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
  badge?: string;
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
    class="sidebar-menu-node"
    :class="{ 'sidebar-menu-node--active': isActive, 'sidebar-menu-node--collapse': isCollapse }"
    :title="isCollapse ? item.title : undefined"
  >
    <span class="sidebar-menu-node__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span v-if="!isCollapse" class="sidebar-menu-node__label">{{ item.title }}</span>
    <span v-if="!isCollapse && item.badge" class="sidebar-menu-node__badge">{{ item.badge }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.sidebar-menu-node {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 50px;
  padding: 0 14px;
  border-radius: 18px;
  color: #cfb9a5;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    background: rgba(255, 248, 237, 0.08);
    color: #fff5e8;
    transform: translateX(2px);
  }
}

.sidebar-menu-node--active {
  background: linear-gradient(135deg, rgba(235, 137, 82, 0.24), rgba(235, 137, 82, 0.08));
  color: #fff8f0;
  box-shadow: inset 0 0 0 1px rgba(235, 137, 82, 0.18);
}

.sidebar-menu-node--collapse {
  justify-content: center;
  padding: 0;
}

.sidebar-menu-node__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  flex-shrink: 0;
}

.sidebar-menu-node__label {
  min-width: 0;
  font-size: 14px;
  font-weight: 600;
}

.sidebar-menu-node__badge {
  margin-left: auto;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffe8d4;
  font-size: 11px;
  font-weight: 700;
}
</style>
