<script setup lang="ts">
interface SidebarMenuItem { title: string; path: string; icon: string }
const menu = ref<SidebarMenuItem[]>([
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Retail', path: '/retail', icon: 'lucide:store' },
  { title: 'Promotions', path: '/promotions', icon: 'lucide:badge-percent' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__shell">
      <div class="sidebar__brand">
        <div class="sidebar__mark">
          E1
        </div>
        <div class="sidebar__copy">
          <strong>Ember One</strong>
          <span>Warm commerce view</span>
        </div>
      </div>
      <ThemeEmberOneUiAshPanel title="Campaign note" description="Warna hangat cocok untuk dashboard penjualan dan promosi.">
        <ThemeEmberOneUiFlareCard label="Promo" value="12 active" />
      </ThemeEmberOneUiAshPanel>
      <ThemeEmberOneLayoutSidebarMenu :menu="menu" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  padding: 16px;
}
.sidebar__shell {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 18px;
  background: linear-gradient(180deg, #fffaf3 0%, #fff2e9 100%);
  border-right: 1px solid rgba(255, 170, 120, 0.24);
}
.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ff9d6a, #ff6b6b);
  color: #fff;
  font-weight: 800;
}
.sidebar__copy {
  display: flex;
  flex-direction: column;
  strong {
    color: #5c3426;
    font-size: 18px;
  }
  span {
    color: #a27d6b;
    font-size: 12px;
  }
}
</style>
