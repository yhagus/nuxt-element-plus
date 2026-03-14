<script setup lang="ts">
interface SidebarMenuItem { title: string; path: string; icon: string }
const menu = ref<SidebarMenuItem[]>([
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Experiments', path: '/experiments', icon: 'lucide:flask-conical' },
  { title: 'Audience', path: '/audience', icon: 'lucide:users-round' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__shell">
      <div class="sidebar__brand">
        <div class="sidebar__mark">
          P1
        </div>
        <div class="sidebar__copy">
          <strong>Prism One</strong>
          <span>Spectrum dashboard</span>
        </div>
      </div>
      <ThemePrismOneUiSpectrumPanel title="Highlight" description="Eksperimen warna membantu melihat KPI lebih cepat.">
        <ThemePrismOneUiGlowCard label="Ideas" value="18" tone="pink" />
      </ThemePrismOneUiSpectrumPanel>
      <ThemePrismOneLayoutSidebarMenu :menu="menu" />
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
  background: linear-gradient(180deg, #fff7fb 0%, #f8fbff 100%);
  border-right: 1px solid rgba(173, 133, 255, 0.2);
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
  background: linear-gradient(135deg, #ff79b0, #7ddcff);
  color: #fff;
  font-weight: 800;
}
.sidebar__copy {
  display: flex;
  flex-direction: column;
  strong {
    color: #392458;
    font-size: 18px;
  }
  span {
    color: #8f78ac;
    font-size: 12px;
  }
}
</style>
