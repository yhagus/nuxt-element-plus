<script setup lang="ts">
interface SidebarMenuItem { title: string; path: string; icon: string }
const menu = ref<SidebarMenuItem[]>([
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Sprint', path: '/sprint', icon: 'lucide:kanban' },
  { title: 'Delivery', path: '/delivery', icon: 'lucide:truck' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__shell">
      <div class="sidebar__brand">
        <div class="sidebar__mark">
          S1
        </div>
        <div class="sidebar__copy">
          <strong>Slate One</strong>
          <span>Calm operations board</span>
        </div>
      </div>
      <ThemeSlateOneUiBoardPanel title="Board note" description="Cocok untuk project delivery dan operasi yang padat.">
        <ThemeSlateOneUiBoardStat label="Velocity" value="42" />
      </ThemeSlateOneUiBoardPanel>
      <ThemeSlateOneLayoutSidebarMenu :menu="menu" />
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
  border-right: 1px solid #d4dbe5;
  background: #f6f8fb;
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
  background: #405266;
  color: #fff;
  font-weight: 800;
}
.sidebar__copy {
  display: flex;
  flex-direction: column;
  strong {
    color: #2d3a4a;
    font-size: 18px;
  }
  span {
    color: #7e8d9f;
    font-size: 12px;
  }
}
</style>
