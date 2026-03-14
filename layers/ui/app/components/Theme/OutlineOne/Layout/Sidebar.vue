<script setup lang="ts">
const route = useRoute();

const items = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Users', path: '/users', icon: 'lucide:users-round' },
  { title: 'Roles', path: '/roles', icon: 'lucide:shield-check' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__brand">
      <span class="sidebar__mark">O1</span>
      <div class="sidebar__copy">
        <strong>Outline One</strong>
        <span>Strict frame</span>
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
  gap: 12px;
  height: 100%;
  padding: 16px;
  border-right: 2px solid #1d1d1d;
  background: #fff;
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
  width: 40px;
  height: 40px;
  border: 2px solid #1d1d1d;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
}

.sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #1d1d1d;
    font-size: 16px;
  }

  span {
    color: #6d6d6d;
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
  min-height: 40px;
  padding: 0 12px;
  border: 2px solid transparent;
  border-radius: 12px;
  color: #4c4c4c;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.sidebar__item--active {
  border-color: #1d1d1d;
  color: #1d1d1d;
}
</style>
