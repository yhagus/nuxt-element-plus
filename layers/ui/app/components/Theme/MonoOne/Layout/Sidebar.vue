<script setup lang="ts">
interface SidebarMenuItem { title: string; path: string; icon: string }
const menu = ref<SidebarMenuItem[]>([
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Archive', path: '/archive', icon: 'lucide:archive' },
  { title: 'Review', path: '/review', icon: 'lucide:file-search' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__shell">
      <div class="sidebar__brand">
        <div class="sidebar__mark">
          M1
        </div>
        <div class="sidebar__copy">
          <strong>Mono One</strong>
          <span>Brutalist panel</span>
        </div>
      </div>
      <ThemeMonoOneUiPaperFrame title="Pinned note" description="Layout fokus pada struktur dan hierarki murni.">
        <ThemeMonoOneUiMetricStrip label="Drafts" value="48" />
      </ThemeMonoOneUiPaperFrame>
      <ThemeMonoOneLayoutSidebarMenu :menu="menu" />
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
  border-right: 2px solid #111;
  background: #fff;
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
  border: 2px solid #111;
  background: #111;
  color: #fff;
  font-weight: 800;
}
.sidebar__copy {
  display: flex;
  flex-direction: column;
  strong {
    color: #111;
    font-size: 18px;
  }
  span {
    color: #666;
    font-size: 12px;
  }
}
</style>
