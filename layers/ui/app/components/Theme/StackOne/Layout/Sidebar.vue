<script setup lang="ts">
const route = useRoute();

const items = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Stacks', path: '/stacks', icon: 'lucide:layers-3' },
  { title: 'Library', path: '/library', icon: 'lucide:library' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__brand">
      <span class="sidebar__mark">ST</span>
      <div class="sidebar__copy">
        <strong>Stack One</strong>
        <span>Layered cards</span>
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
  border-right: 1px solid #e1d9ea;
  background: #faf8fc;
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
  border-radius: 12px;
  background: #5d4d76;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #382d48;
    font-size: 16px;
  }

  span {
    color: #8d7ea5;
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
  border-radius: 12px;
  color: #726387;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.sidebar__item--active {
  background: #5d4d76;
  color: #fff;
}
</style>
