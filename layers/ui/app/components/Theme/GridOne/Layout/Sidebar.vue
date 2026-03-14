<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const menu = ref<SidebarMenuItem[]>([
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Nodes', path: '/nodes', icon: 'lucide:network' },
  { title: 'Jobs', path: '/jobs', icon: 'lucide:rows-4' },
  { title: 'Alerts', path: '/alerts', icon: 'lucide:siren' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="grid-sidebar">
    <div class="grid-sidebar__shell">
      <div class="grid-sidebar__brand">
        <div class="grid-sidebar__mark">
          G1
        </div>
        <div class="grid-sidebar__copy">
          <strong>Grid One</strong>
          <span>Dense terminal desk</span>
        </div>
      </div>

      <ThemeGridOneUiConsolePanel title="Live Feed" description="node-eu-01 stable, queue warning on worker-7">
        <ThemeGridOneUiTerminalTile label="Latency" value="28ms" state="normal" />
      </ThemeGridOneUiConsolePanel>

      <ThemeGridOneLayoutSidebarMenu :menu="menu" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-sidebar {
  height: 100%;
  padding: 16px;
}

.grid-sidebar__shell {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 18px;
  border: 1px solid rgba(43, 255, 146, 0.12);
  background: rgba(8, 17, 14, 0.96);
}

.grid-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.grid-sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(43, 255, 146, 0.2);
  background: rgba(43, 255, 146, 0.08);
  color: #71ffba;
  font-weight: 800;
}

.grid-sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #dcffe9;
    font-size: 18px;
  }

  span {
    color: #7bcba0;
    font-size: 12px;
  }
}
</style>
