<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const props = defineProps<{
  item: SidebarMenuItem;
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
    class="canvas-sidebar-item"
    :class="{ 'canvas-sidebar-item--active': isActive }"
  >
    <span class="canvas-sidebar-item__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span class="canvas-sidebar-item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.canvas-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 0 14px;
  border: 2px solid transparent;
  border-radius: 16px;
  color: #6f5b51;
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    border-color: #2d221d;
    background: #fff2df;
    color: #2d221d;
  }
}

.canvas-sidebar-item--active {
  border-color: #2d221d;
  background: #ffd6bf;
  color: #2d221d;
  box-shadow: 4px 4px 0 #2d221d;
}

.canvas-sidebar-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
}

.canvas-sidebar-item__label {
  font-size: 14px;
  font-weight: 600;
}
</style>
