<script setup lang="ts">
const route = useRoute();

const tabs = [
  { title: 'Overview', path: '/' },
  { title: 'Campaigns', path: '/campaigns' },
  { title: 'Audience', path: '/audience' },
  { title: 'Settings', path: '/settings' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <nav class="tabs" aria-label="Tabs navigation">
    <NuxtLink
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="tabs__item"
      :class="{ 'tabs__item--active': isActive(tab.path) }"
    >
      {{ tab.title }}
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 6px;
  border: 1px solid #dedff7;
  border-radius: 14px;
  background: #fff;
}

.tabs__item {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 10px;
  color: #7075aa;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.tabs__item--active {
  background: #5258ba;
  color: #fff;
}
</style>
