<script setup lang="ts">
const route = useRoute();

const items = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Merchants', path: '/merchants', icon: 'lucide:store' },
  { title: 'Bundles', path: '/bundles', icon: 'lucide:package' },
  { title: 'Reports', path: '/reports', icon: 'lucide:chart-column' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__brand">
      <span class="sidebar__mark">CL</span>
      <div class="sidebar__copy">
        <strong>Column One</strong>
        <span>Editorial side deck</span>
      </div>
    </div>

    <ThemeColumnOneUiCanvas title="Sidebar Note">
      <ThemeColumnOneUiFactCard label="Pending" value="18" />
    </ThemeColumnOneUiCanvas>

    <nav class="sidebar__nav" aria-label="Sidebar menu">
      <NuxtLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="sidebar__item"
        :class="{ 'sidebar__item--active': isActive(item.path) }"
      >
        <NIcon :name="item.icon" size="18px" />
        <span>{{ item.title }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  padding: 16px;
  border-right: 1px solid #e1d5c8;
  background: #fcf6ee;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: #6a4e38;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #4f3a29;
    font-size: 18px;
  }

  span {
    color: #9d7f66;
    font-size: 12px;
  }
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  color: #8a725d;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.sidebar__item--active {
  background: #6a4e38;
  color: #fff;
}
</style>
