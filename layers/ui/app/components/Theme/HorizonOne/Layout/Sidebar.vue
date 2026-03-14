<script setup lang="ts">
defineProps<{
  isCollapse: boolean;
}>();

interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
  badge?: string;
}

const primaryMenu = ref<SidebarMenuItem[]>([
  { title: 'Dashboard', path: '/', icon: 'lucide:layout-dashboard' },
  { title: 'Penjualan', path: '/sales', icon: 'lucide:shopping-bag', badge: '12' },
  { title: 'Pelanggan', path: '/customers', icon: 'lucide:users-round' },
  { title: 'Inventaris', path: '/inventory', icon: 'lucide:package-search' },
]);

const secondaryMenu = ref<SidebarMenuItem[]>([
  { title: 'Laporan', path: '/reports', icon: 'lucide:chart-column-big' },
  { title: 'Integrasi', path: '/integrations', icon: 'lucide:plug-zap' },
  { title: 'Pengaturan', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="sidebar-shell" :class="{ 'sidebar-shell--collapse': isCollapse }">
    <div class="sidebar-shell__panel">
      <div class="sidebar-shell__brand">
        <div class="sidebar-shell__brand-mark">
          <span>H</span>
        </div>
        <div v-if="!isCollapse" class="sidebar-shell__brand-copy">
          <strong>Horizon</strong>
          <span>Control center</span>
        </div>
      </div>

      <div v-if="!isCollapse" class="sidebar-shell__spotlight">
        <span class="sidebar-shell__spotlight-label">Performa hari ini</span>
        <strong class="sidebar-shell__spotlight-value">+18.4%</strong>
        <p class="sidebar-shell__spotlight-copy">
          Konversi meningkat dari trafik organik dan kampanye katalog.
        </p>
      </div>

      <div class="sidebar-shell__section">
        <span v-if="!isCollapse" class="sidebar-shell__section-label">Utama</span>
        <ThemeHorizonOneLayoutSidebarMenu :menu="primaryMenu" :is-collapse="isCollapse" />
      </div>

      <div class="sidebar-shell__section">
        <span v-if="!isCollapse" class="sidebar-shell__section-label">Operasional</span>
        <ThemeHorizonOneLayoutSidebarMenu :menu="secondaryMenu" :is-collapse="isCollapse" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-shell {
  height: 100%;
  padding: 14px;
  transition: width 0.24s ease;
}

.sidebar-shell__panel {
  display: flex;
  flex-direction: column;
  gap: 22px;
  height: 100%;
  padding: 20px 14px 16px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(255, 188, 146, 0.18), transparent 32%),
    linear-gradient(180deg, #241913 0%, #2e2118 100%);
  box-shadow: 0 22px 70px rgba(30, 22, 18, 0.32);
  color: #f9efe2;
}

.sidebar-shell__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-shell__brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 18px;
  background: linear-gradient(135deg, #e58553 0%, #8f563d 100%);
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  box-shadow: 0 16px 32px rgba(214, 123, 73, 0.28);
  flex-shrink: 0;
}

.sidebar-shell__brand-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 18px;
    line-height: 1.1;
  }

  span {
    color: #c8b4a0;
    font-size: 12px;
  }
}

.sidebar-shell__spotlight {
  padding: 16px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 248, 237, 0.12), rgba(255, 248, 237, 0.04));
  box-shadow: inset 0 0 0 1px rgba(255, 227, 203, 0.08);
}

.sidebar-shell__spotlight-label {
  display: inline-block;
  margin-bottom: 8px;
  color: #d9bfab;
  font-size: 12px;
}

.sidebar-shell__spotlight-value {
  display: block;
  margin-bottom: 6px;
  font-size: 30px;
  line-height: 1;
}

.sidebar-shell__spotlight-copy {
  margin: 0;
  color: #c8b4a0;
  font-size: 12px;
  line-height: 1.5;
}

.sidebar-shell__section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-shell__section-label {
  padding: 0 6px;
  color: #ab8f79;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.sidebar-shell--collapse {
  .sidebar-shell__panel {
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
  }

  .sidebar-shell__section {
    width: 100%;
  }
}
</style>
