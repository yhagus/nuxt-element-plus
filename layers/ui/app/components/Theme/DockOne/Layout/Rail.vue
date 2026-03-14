<script setup lang="ts">
withDefaults(defineProps<{
  expanded?: boolean;
}>(), {
  expanded: false,
});

const route = useRoute();

const items = [
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Traffic', path: '/traffic', icon: 'lucide:radar' },
  { title: 'Queue', path: '/queue', icon: 'lucide:rows-4' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
];

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <div class="rail" :class="{ 'rail--expanded': expanded }">
    <div class="rail__brand">
      <span class="rail__mark">D1</span>
      <span v-if="expanded" class="rail__brand-name">Dock</span>
    </div>

    <nav class="rail__nav" aria-label="Sidebar menu">
      <NuxtLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="rail__item"
        :class="{ 'rail__item--active': isActive(item.path) }"
        :title="!expanded ? item.title : undefined"
      >
        <NIcon :name="item.icon" size="16px" />
        <span v-if="expanded">{{ item.title }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 10px 8px;
  border-right: 1px solid #d5e2f6;
  background: rgba(255, 255, 255, 0.92);
}

.rail__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;
}

.rail__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: #3d6cc9;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.rail__brand-name {
  color: #27415f;
  font-size: 13px;
  font-weight: 700;
}

.rail__nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.rail__item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 34px;
  border-radius: 10px;
  color: #6780a0;
  text-decoration: none;
}

.rail__item--active {
  background: #3d6cc9;
  color: #fff;
}

.rail--expanded {
  align-items: stretch;
  padding: 10px;

  .rail__item {
    justify-content: flex-start;
    padding: 0 10px;
  }

  .rail__brand {
    justify-content: flex-start;
  }
}
</style>
