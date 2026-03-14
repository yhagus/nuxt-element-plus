<script setup lang="ts">
const route = useRoute();

const links = [
  { title: 'Overview', path: '/' },
  { title: 'Campaigns', path: '/campaigns' },
  { title: 'Audience', path: '/audience' },
  { title: 'Reports', path: '/reports' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <nav class="nav" aria-label="Banner navigation">
    <NuxtLink
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      class="nav__item"
      :class="{ 'nav__item--active': isActive(link.path) }"
    >
      {{ link.title }}
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #e6d6c9;
  border-radius: 18px;
  background: #fffaf4;
}

.nav__item {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  color: #8e735f;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.nav__item--active {
  background: #5b3e2a;
  color: #fff;
}
</style>
