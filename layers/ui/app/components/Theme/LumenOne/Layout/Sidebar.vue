<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const menu = ref<SidebarMenuItem[]>([
  { title: 'Overview', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Customers', path: '/customers', icon: 'lucide:users-round' },
  { title: 'Subscriptions', path: '/subscriptions', icon: 'lucide:badge-dollar-sign' },
  { title: 'Automation', path: '/automation', icon: 'lucide:sparkles' },
  { title: 'Settings', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="lumen-sidebar">
    <div class="lumen-sidebar__shell">
      <div class="lumen-sidebar__brand">
        <div class="lumen-sidebar__mark">
          L1
        </div>
        <div class="lumen-sidebar__copy">
          <strong>Lumen One</strong>
          <span>Soft SaaS workspace</span>
        </div>
      </div>

      <ThemeLumenOneUiSoftPanel title="Quick summary" description="Onboarding baru menunjukkan activation yang lebih baik minggu ini.">
        <ThemeLumenOneUiPulseCard label="Trials" value="124" detail="22 upgrade potential" tone="mint" />
      </ThemeLumenOneUiSoftPanel>

      <ThemeLumenOneLayoutSidebarMenu :menu="menu" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.lumen-sidebar {
  height: 100%;
  padding: 16px;
}

.lumen-sidebar__shell {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 18px;
  border-right: 1px solid #dbe7f6;
  background: linear-gradient(180deg, #fbfdff 0%, #f4f8fe 100%);
}

.lumen-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lumen-sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 16px;
  background: linear-gradient(135deg, #79a8ff, #68d7bc);
  color: #fff;
  font-weight: 800;
}

.lumen-sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #2c4367;
    font-size: 18px;
  }

  span {
    color: #8aa0bc;
    font-size: 12px;
  }
}
</style>
