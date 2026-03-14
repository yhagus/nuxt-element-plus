<script setup lang="ts">
defineProps<{
  isCollapse: boolean;
}>();

interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const menuPrimary = ref<SidebarMenuItem[]>([
  { title: 'Ikhtisar', path: '/', icon: 'lucide:layout-grid' },
  { title: 'Katalog', path: '/catalog', icon: 'lucide:library-big' },
  { title: 'Pesanan', path: '/orders', icon: 'lucide:receipt-text' },
  { title: 'Pelanggan', path: '/customers', icon: 'lucide:users' },
]);

const menuSecondary = ref<SidebarMenuItem[]>([
  { title: 'Analitik', path: '/analytics', icon: 'lucide:chart-no-axes-column' },
  { title: 'Konten', path: '/content', icon: 'lucide:newspaper' },
  { title: 'Pengaturan', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="sidebar-frame" :class="{ 'sidebar-frame--collapse': isCollapse }">
    <div class="sidebar-frame__shell">
      <div class="sidebar-frame__brand">
        <div class="sidebar-frame__brand-mark">
          H2
        </div>
        <div v-if="!isCollapse" class="sidebar-frame__brand-copy">
          <strong>Horizon Two</strong>
          <span>Editorial admin system</span>
        </div>
      </div>

      <ThemeHorizonTwoUiSectionFrame
        v-if="!isCollapse"
        title="Agenda Hari Ini"
        description="Tinjau penerbitan katalog baru dan approval promosi."
        class="sidebar-frame__intro"
      >
        <ThemeHorizonTwoUiMetricCard label="Draft aktif" value="24" trend="+3" tone="sky" />
      </ThemeHorizonTwoUiSectionFrame>

      <div class="sidebar-frame__group">
        <span v-if="!isCollapse" class="sidebar-frame__label">Navigasi</span>
        <ThemeHorizonTwoLayoutSidebarMenu :menu="menuPrimary" :is-collapse="isCollapse" />
      </div>

      <div class="sidebar-frame__group">
        <span v-if="!isCollapse" class="sidebar-frame__label">Studio</span>
        <ThemeHorizonTwoLayoutSidebarMenu :menu="menuSecondary" :is-collapse="isCollapse" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-frame {
  height: 100%;
  padding: 16px;
}

.sidebar-frame__shell {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  padding: 18px;
  border-radius: 30px;
  background:
    radial-gradient(circle at top left, rgba(110, 197, 176, 0.18), transparent 28%),
    linear-gradient(180deg, #fefbf4 0%, #f4fbf8 100%);
  box-shadow:
    inset 0 0 0 1px rgba(113, 155, 145, 0.16),
    0 24px 60px rgba(76, 104, 98, 0.12);
}

.sidebar-frame__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-frame__brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 18px;
  background: linear-gradient(135deg, #1f6a5d, #5ab39a);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  flex-shrink: 0;
}

.sidebar-frame__brand-copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #173732;
    font-size: 18px;
  }

  span {
    color: #66827b;
    font-size: 12px;
  }
}

.sidebar-frame__group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-frame__label {
  color: #5f7d76;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.sidebar-frame--collapse {
  .sidebar-frame__shell {
    padding-left: 12px;
    padding-right: 12px;
    align-items: center;
  }

  .sidebar-frame__group {
    width: 100%;
  }
}
</style>
