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
    class="grid-sidebar-item"
    :class="{ 'grid-sidebar-item--active': isActive }"
  >
    <span class="grid-sidebar-item__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span class="grid-sidebar-item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.grid-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid transparent;
  color: #7bcba0;
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    border-color: rgba(43, 255, 146, 0.16);
    background: rgba(43, 255, 146, 0.05);
    color: #dcffe9;
  }
}

.grid-sidebar-item--active {
  border-color: rgba(43, 255, 146, 0.2);
  background: rgba(43, 255, 146, 0.08);
  color: #dcffe9;
}

.grid-sidebar-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
}

.grid-sidebar-item__label {
  font-size: 13px;
  font-weight: 600;
}
</style>
