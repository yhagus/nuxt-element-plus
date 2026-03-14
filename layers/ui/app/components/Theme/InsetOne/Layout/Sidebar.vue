<script setup lang="ts">
const route = useRoute();

const items = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Tasks', path: '/tasks', icon: 'lucide:list-checks' },
  { title: 'Files', path: '/files', icon: 'lucide:folder' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__brand">
      <span class="sidebar__mark">I1</span>
      <div class="sidebar__copy">
        <strong>Inset One</strong>
        <span>Centered compact</span>
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
  border-right: 1px solid rgba(122, 100, 72, 0.12);
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
  background: #6d5236;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #513b27;
    font-size: 14px;
  }

  span {
    color: #a58a70;
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
  color: #8e775f;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.sidebar__item--active {
  background: #6d5236;
  color: #fff;
}
</style>
