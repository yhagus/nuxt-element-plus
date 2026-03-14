<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const menu = ref<SidebarMenuItem[]>([
  { title: 'Dashboard', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Finance', path: '/finance', icon: 'lucide:wallet' },
  { title: 'Accounts', path: '/accounts', icon: 'lucide:building-2' },
  { title: 'Operations', path: '/operations', icon: 'lucide:briefcase-business' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="orbit-sidebar">
    <div class="orbit-sidebar__shell">
      <div class="orbit-sidebar__brand">
        <div class="orbit-sidebar__mark">
          O1
        </div>
        <div class="orbit-sidebar__copy">
          <strong>Orbit One</strong>
          <span>Enterprise Suite</span>
        </div>
      </div>

      <ThemeOrbitOneUiFrameBlock title="Quarter Focus" description="Prioritas minggu ini adalah stabilitas finansial dan SLA support.">
        <ThemeOrbitOneUiStatTile label="SLA" value="99.91%" note="Di atas target" />
      </ThemeOrbitOneUiFrameBlock>

      <ThemeOrbitOneLayoutSidebarMenu :menu="menu" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.orbit-sidebar {
  height: 100%;
  padding: 16px;
}

.orbit-sidebar__shell {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 18px;
  border-right: 1px solid #d8e0ea;
  background: #f8fafc;
}

.orbit-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.orbit-sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: #1f3347;
  color: #fff;
  font-weight: 800;
}

.orbit-sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #1f3347;
    font-size: 18px;
  }

  span {
    color: #7d8ea0;
    font-size: 12px;
  }
}
</style>
