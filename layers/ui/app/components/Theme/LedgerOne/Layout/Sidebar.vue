<script setup lang="ts">
const route = useRoute();

const items = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Invoices', path: '/invoices', icon: 'lucide:receipt' },
  { title: 'Collections', path: '/collections', icon: 'lucide:wallet' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__brand">
      <span class="sidebar__mark">L1</span>
      <div class="sidebar__copy">
        <strong>Ledger One</strong>
        <span>Dense finance nav</span>
      </div>
    </div>

    <nav class="sidebar__nav" aria-label="Sidebar menu">
      <NuxtLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="sidebar__item"
        :class="{ 'sidebar__item--active': isActive(item.path) }"
      >
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
  border-right: 1px solid #d9dcc8;
  background: #fcfcf7;
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
  background: #5d6640;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #3f452e;
    font-size: 14px;
  }

  span {
    color: #8a916d;
    font-size: 11px;
  }
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  color: #6f7651;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.sidebar__item--active {
  background: #5d6640;
  color: #fff;
}
</style>
