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
    class="noctis-sidebar-item"
    :class="{ 'noctis-sidebar-item--active': isActive }"
  >
    <span class="noctis-sidebar-item__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span class="noctis-sidebar-item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.noctis-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 0 14px;
  border-radius: 16px;
  color: #9f96b7;
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    background: rgba(214, 171, 84, 0.08);
    color: #faf3e6;
  }
}

.noctis-sidebar-item--active {
  background: linear-gradient(135deg, rgba(214, 171, 84, 0.18), rgba(111, 74, 156, 0.18));
  color: #faf3e6;
  box-shadow: inset 0 0 0 1px rgba(214, 171, 84, 0.12);
}

.noctis-sidebar-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
}

.noctis-sidebar-item__label {
  font-size: 14px;
  font-weight: 600;
}
</style>
