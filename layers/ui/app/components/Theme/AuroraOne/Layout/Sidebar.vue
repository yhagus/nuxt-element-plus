<script setup lang="ts">
interface SidebarMenuItem { title: string; path: string; icon: string }
const menu = ref<SidebarMenuItem[]>([
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Journeys', path: '/journeys', icon: 'lucide:route' },
  { title: 'Segments', path: '/segments', icon: 'lucide:users-round' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__shell">
      <div class="sidebar__brand">
        <div class="sidebar__mark">
          A1
        </div>
        <div class="sidebar__copy">
          <strong>Aurora One</strong>
          <span>Glassy workspace</span>
        </div>
      </div>
      <ThemeAuroraOneUiMistPanel title="Insight" description="Nuansa lembut cocok untuk analytics dan CRM.">
        <ThemeAuroraOneUiHaloCard label="NPS" value="64" tone="mint" />
      </ThemeAuroraOneUiMistPanel>
      <ThemeAuroraOneLayoutSidebarMenu :menu="menu" />
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.62));
  border-right: 1px solid rgba(163, 194, 255, 0.22);
  backdrop-filter: blur(16px);
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
  background: linear-gradient(135deg, #8affdd, #aa8cff);
  color: #fff;
  font-weight: 800;
}
.sidebar__copy {
  display: flex;
  flex-direction: column;
  strong {
    color: #2f486b;
    font-size: 18px;
  }
  span {
    color: #8ba0c0;
    font-size: 12px;
  }
}
</style>
