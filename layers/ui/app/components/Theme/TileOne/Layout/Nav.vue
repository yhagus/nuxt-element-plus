<script setup lang="ts">
const route = useRoute();

const items = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Tasks', path: '/tasks', icon: 'lucide:list-todo' },
  { title: 'Boards', path: '/boards', icon: 'lucide:kanban' },
  { title: 'Files', path: '/files', icon: 'lucide:folder' },
  { title: 'Reports', path: '/reports', icon: 'lucide:chart-column' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <nav class="nav" aria-label="Tile navigation">
    <NuxtLink
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      class="nav__tile"
      :class="{ 'nav__tile--active': isActive(item.path) }"
    >
      <NIcon :name="item.icon" size="18px" />
      <span>{{ item.title }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

.nav__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 58px;
  border: 1px solid #d9dfd5;
  border-radius: 14px;
  background: #fff;
  color: #5d7057;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.nav__tile--active {
  background: #44563d;
  color: #fff;
}
</style>
