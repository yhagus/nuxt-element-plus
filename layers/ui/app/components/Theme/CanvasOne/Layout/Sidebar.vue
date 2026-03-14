<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const menu = ref<SidebarMenuItem[]>([
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Draft', path: '/drafts', icon: 'lucide:file-pen-line' },
  { title: 'Campaign', path: '/campaigns', icon: 'lucide:megaphone' },
  { title: 'Assets', path: '/assets', icon: 'lucide:image' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="canvas-sidebar">
    <div class="canvas-sidebar__shell">
      <div class="canvas-sidebar__brand">
        <div class="canvas-sidebar__mark">
          C1
        </div>
        <div class="canvas-sidebar__copy">
          <strong>Canvas One</strong>
          <span>Editorial studio board</span>
        </div>
      </div>

      <ThemeCanvasOneUiPaperPanel title="Quick Note" description="Review headline utama sebelum publish pukul 16.00.">
        <ThemeCanvasOneUiBadgePanel label="Status" value="In review" tone="rose" />
      </ThemeCanvasOneUiPaperPanel>

      <ThemeCanvasOneLayoutSidebarMenu :menu="menu" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.canvas-sidebar {
  height: 100%;
  padding: 16px;
}

.canvas-sidebar__shell {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  padding: 18px;
  border: 2px solid #2d221d;
  border-radius: 28px;
  background: #fff8ee;
  box-shadow: 10px 10px 0 #2d221d;
}

.canvas-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.canvas-sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 2px solid #2d221d;
  border-radius: 16px;
  background: #ffd6bf;
  color: #2d221d;
  font-weight: 800;
}

.canvas-sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #2d221d;
    font-size: 18px;
  }

  span {
    color: #7e695f;
    font-size: 12px;
  }
}
</style>
