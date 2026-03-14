<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const menu = ref<SidebarMenuItem[]>([
  { title: 'Dashboard', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Portfolio', path: '/portfolio', icon: 'lucide:gem' },
  { title: 'Clients', path: '/clients', icon: 'lucide:users-round' },
  { title: 'Revenue', path: '/revenue', icon: 'lucide:badge-dollar-sign' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="noctis-sidebar">
    <div class="noctis-sidebar__shell">
      <div class="noctis-sidebar__brand">
        <div class="noctis-sidebar__mark">
          N1
        </div>
        <div class="noctis-sidebar__copy">
          <strong>Noctis One</strong>
          <span>Private premium desk</span>
        </div>
      </div>

      <ThemeNoctisOneUiVelvetPanel title="Private Summary" description="Portofolio utama bergerak positif sepanjang pekan ini.">
        <ThemeNoctisOneUiLuxeCard label="AUM" value="Rp 84 M" footnote="High-touch segment" tone="gold" />
      </ThemeNoctisOneUiVelvetPanel>

      <ThemeNoctisOneLayoutSidebarMenu :menu="menu" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.noctis-sidebar {
  height: 100%;
  padding: 16px;
}

.noctis-sidebar__shell {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 18px;
  border-right: 1px solid rgba(214, 171, 84, 0.12);
  background: linear-gradient(180deg, #161320 0%, #0f0d16 100%);
  box-shadow: inset 0 0 0 1px rgba(214, 171, 84, 0.08);
}

.noctis-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.noctis-sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 16px;
  background: linear-gradient(135deg, #d6ab54, #6f4a9c);
  color: #fff;
  font-weight: 800;
}

.noctis-sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #faf3e6;
    font-size: 18px;
  }

  span {
    color: #9f96b7;
    font-size: 12px;
  }
}
</style>
