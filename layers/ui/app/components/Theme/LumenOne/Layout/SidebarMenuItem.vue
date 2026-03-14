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
    class="lumen-sidebar-item"
    :class="{ 'lumen-sidebar-item--active': isActive }"
  >
    <span class="lumen-sidebar-item__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span class="lumen-sidebar-item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.lumen-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 0 14px;
  border-radius: 14px;
  color: #7f97b5;
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    background: #eef4fd;
    color: #2c4367;
  }
}

.lumen-sidebar-item--active {
  background: linear-gradient(135deg, rgba(121, 168, 255, 0.18), rgba(104, 215, 188, 0.18));
  color: #2c4367;
}

.lumen-sidebar-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
}

.lumen-sidebar-item__label {
  font-size: 14px;
  font-weight: 600;
}
</style>
