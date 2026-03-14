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
    class="atlas-sidebar-item"
    :class="{ 'atlas-sidebar-item--active': isActive }"
  >
    <span class="atlas-sidebar-item__icon">
      <NIcon :name="item.icon" size="18px" />
    </span>
    <span class="atlas-sidebar-item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.atlas-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 16px;
  color: #597771;
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    background: #eef5f1;
    color: #1d352e;
  }
}

.atlas-sidebar-item--active {
  background: #1d352e;
  color: #f9fbf7;
  box-shadow: 0 14px 28px rgba(29, 53, 46, 0.18);
}

.atlas-sidebar-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
}

.atlas-sidebar-item__label {
  font-size: 14px;
  font-weight: 600;
}
</style>
