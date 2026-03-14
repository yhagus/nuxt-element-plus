<script setup lang="ts">
const route = useRoute();

const items = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Docs', path: '/docs', icon: 'lucide:file-stack' },
  { title: 'Review', path: '/review', icon: 'lucide:clipboard-check' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__brand">
      <span class="sidebar__mark">S1</span>
      <div class="sidebar__copy">
        <strong>Split One</strong>
        <span>Utility column</span>
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
  border-right: 1px solid #dce2e5;
  background: #fbfcfc;
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
  background: #37515b;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #23373d;
    font-size: 14px;
  }

  span {
    color: #7b9299;
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
  color: #61767d;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.sidebar__item--active {
  background: #37515b;
  color: #fff;
}
</style>
