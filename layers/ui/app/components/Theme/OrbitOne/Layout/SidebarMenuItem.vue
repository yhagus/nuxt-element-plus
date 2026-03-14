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
    class="orbit-sidebar-item"
    :class="{ 'orbit-sidebar-item--active': isActive }"
  >
    <span class="orbit-sidebar-item__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span class="orbit-sidebar-item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.orbit-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 0 14px;
  border-radius: 14px;
  color: #6b7c8f;
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    background: #eef2f7;
    color: #1f3347;
  }
}

.orbit-sidebar-item--active {
  background: #1f3347;
  color: #fff;
}

.orbit-sidebar-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
}

.orbit-sidebar-item__label {
  font-size: 14px;
  font-weight: 600;
}
</style>
