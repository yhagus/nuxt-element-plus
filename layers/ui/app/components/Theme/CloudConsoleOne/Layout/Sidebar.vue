<script setup lang="ts">
const menu = [
  { label: 'Ikhtisar', icon: 'lucide:layout-grid', path: '/' },
  { label: 'Aktivitas', icon: 'lucide:activity', path: '/activity' },
  { label: 'Laporan', icon: 'lucide:bar-chart-3', path: '/reports' },
  { label: 'Pengaturan', icon: 'lucide:settings', path: '/settings' },
];
</script>

<template>
  <aside class="theme-sidebar">
    <div class="theme-sidebar__brand">
      <div class="theme-sidebar__logo">
        <NIcon name="lucide:hexagon" />
      </div>
      <div>
        <p class="theme-sidebar__title">Cloud Console</p>
        <p class="theme-sidebar__subtitle">Manajemen resource cloud harian</p>
      </div>
    </div>

    <nav class="theme-sidebar__nav">
      <NuxtLink
        v-for="item in menu"
        :key="item.path"
        :to="item.path"
        class="theme-sidebar__link"
      >
        <NIcon :name="item.icon" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.theme-sidebar {
  height: 100%;
  padding: 18px 14px;
  background: #ffffff;
  border-right: 1px solid #d8e3f3;
  color: #17304d;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 16px;
}

.theme-sidebar__brand {
  display: flex;
  gap: 10px;
  align-items: center;
}

.theme-sidebar__logo {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #2b73d9;
  color: #fff;
}

.theme-sidebar__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.theme-sidebar__subtitle {
  margin: 2px 0 0;
  font-size: 11px;
  color: #5e7390;
}

.theme-sidebar__nav {
  display: grid;
  align-content: start;
  gap: 6px;
}

.theme-sidebar__link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  padding: 9px 10px;
  border: 1px solid transparent;

  &:hover {
    border-color: #d8e3f3;
    background: rgba(255, 255, 255, 0.04);
  }
}
</style>
