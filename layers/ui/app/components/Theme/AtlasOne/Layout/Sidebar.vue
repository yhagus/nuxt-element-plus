<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const menu = ref<SidebarMenuItem[]>([
  { title: 'Ikhtisar', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Wilayah', path: '/regions', icon: 'lucide:map' },
  { title: 'Distribusi', path: '/distribution', icon: 'lucide:truck' },
  { title: 'Hub', path: '/hubs', icon: 'lucide:warehouse' },
  { title: 'Pengaturan', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="atlas-sidebar">
    <div class="atlas-sidebar__shell">
      <div class="atlas-sidebar__brand">
        <div class="atlas-sidebar__mark">
          A1
        </div>
        <div class="atlas-sidebar__copy">
          <strong>Atlas One</strong>
          <span>Operational map desk</span>
        </div>
      </div>

      <ThemeAtlasOneUiSurface title="Ringkasan Peta" description="7 hotspot membutuhkan tindak lanjut sore ini.">
        <ThemeAtlasOneUiInsightCard title="Node aktif" value="284" subtitle="Naik 3.2% dari kemarin." accent="emerald" />
      </ThemeAtlasOneUiSurface>

      <ThemeAtlasOneLayoutSidebarMenu :menu="menu" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.atlas-sidebar {
  height: 100%;
  padding: 16px;
}

.atlas-sidebar__shell {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  padding: 18px;
  border-right: 1px solid rgba(0, 0, 0, 0.04);
  background: linear-gradient(180deg, #fcfef9 0%, #f2f7f3 100%);
  box-shadow:
    inset 0 0 0 1px rgba(215, 228, 221, 0.8),
    0 24px 60px rgba(70, 98, 90, 0.12);
}

.atlas-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.atlas-sidebar__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #215c50, #2fa277);
  color: #fff;
  font-weight: 800;
}

.atlas-sidebar__copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #1d352e;
    font-size: 18px;
  }

  span {
    color: #709089;
    font-size: 12px;
  }
}
</style>
