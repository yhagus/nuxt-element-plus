<script setup lang="ts">
const route = useRoute();
const menu = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Inventory', path: '/inventory', icon: 'lucide:boxes' },
  { title: 'Suppliers', path: '/suppliers', icon: 'lucide:truck' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];
function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__brand">
      <span class="sidebar__mark">C2</span>
      <div class="sidebar__copy">
        <strong>Compact Two</strong>
        <span>Dense green</span>
      </div>
    </div>
    <ThemeCompactTwoUiDensePanel title="Quick Note">
      <ThemeCompactTwoUiMiniStat label="SKU" value="42" />
    </ThemeCompactTwoUiDensePanel>
    <nav class="sidebar__nav" aria-label="Sidebar menu">
      <NuxtLink v-for="item in menu" :key="item.path" :to="item.path" class="sidebar__item" :class="{ 'sidebar__item--active': isActive(item.path) }">
        <NIcon :name="item.icon" size="16px" />
        <span>{{ item.title }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding: 10px;
  border-right: 1px solid #d4e3d4;
  background: #f8fcf8;
}
.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #355d3f;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}
.sidebar__copy {
  display: flex;
  flex-direction: column;
  strong {
    color: #203826;
    font-size: 14px;
  }
  span {
    color: #78907d;
    font-size: 11px;
  }
}
.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sidebar__item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  color: #5f7664;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}
.sidebar__item--active {
  background: #355d3f;
  color: #fff;
}
</style>
