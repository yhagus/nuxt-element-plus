<script setup lang="ts">
withDefaults(defineProps<{
  compact?: boolean;
}>(), {
  compact: false,
});

interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

const menu = ref<SidebarMenuItem[]>([
  { title: 'Dashboard', path: '/', icon: 'lucide:layout-dashboard' },
  { title: 'Monitor', path: '/monitor', icon: 'lucide:activity' },
  { title: 'Traffic', path: '/traffic', icon: 'lucide:radar' },
  { title: 'Queue', path: '/queue', icon: 'lucide:rows-4' },
  { title: 'Audit', path: '/audit', icon: 'lucide:shield' },
  { title: 'Pengaturan', path: '/settings', icon: 'lucide:settings-2' },
]);
</script>

<template>
  <div class="signal-sidebar" :class="{ 'signal-sidebar--compact': compact }">
    <div class="signal-sidebar__shell">
      <div class="signal-sidebar__brand">
        <div class="signal-sidebar__brand-mark">
          <span>S</span>
        </div>
        <div v-if="!compact" class="signal-sidebar__brand-copy">
          <strong>Signal</strong>
          <span>Ops console</span>
        </div>
      </div>

      <ThemeSignalOneLayoutSidebarMenu :menu="menu" :compact="compact" />

      <ThemeSignalOneUiGlassPanel v-if="!compact" class="signal-sidebar__status">
        <div class="signal-sidebar__status-copy">
          <span class="signal-sidebar__status-label">Status jaringan</span>
          <strong class="signal-sidebar__status-value">Stabil</strong>
          <p class="signal-sidebar__status-text">
            Semua edge node aktif, latency berada di bawah 40ms.
          </p>
        </div>
      </ThemeSignalOneUiGlassPanel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.signal-sidebar {
  height: 100%;
  padding: 16px;
}

.signal-sidebar__shell {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  padding: 16px 12px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top, rgba(85, 149, 255, 0.14), transparent 28%),
    linear-gradient(180deg, rgba(9, 20, 36, 0.96) 0%, rgba(8, 15, 28, 0.98) 100%);
  box-shadow:
    inset 0 0 0 1px rgba(88, 119, 166, 0.18),
    0 22px 60px rgba(0, 0, 0, 0.22);
}

.signal-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.signal-sidebar__brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: linear-gradient(135deg, #3b82f6, #0ea5e9);
  color: #fff;
  font-weight: 800;
  flex-shrink: 0;
}

.signal-sidebar__brand-copy {
  display: flex;
  flex-direction: column;

  strong {
    color: #eff5ff;
    font-size: 17px;
  }

  span {
    color: #7d97bb;
    font-size: 12px;
  }
}

.signal-sidebar__status {
  margin-top: auto;
}

.signal-sidebar__status-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.signal-sidebar__status-label {
  color: #7d97bb;
  font-size: 12px;
}

.signal-sidebar__status-value {
  color: #eff5ff;
  font-size: 24px;
}

.signal-sidebar__status-text {
  margin: 0;
  color: #9ab1d3;
  font-size: 12px;
  line-height: 1.5;
}

.signal-sidebar--compact {
  .signal-sidebar__shell {
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
