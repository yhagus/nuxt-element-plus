<script setup lang="ts">
const collapseState = useState<boolean>('theme-horizon-2-sidebar-collapsed', () => false);
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const expandedWidth = 304;
const collapsedWidth = 112;

const isDesktop = ref(false);
const isCollapse = ref(false);
const mobileSidebarOpen = ref(false);

const sidebarWidth = computed(() => {
  if (!isDesktop.value) {
    return 0;
  }

  return isCollapse.value ? collapsedWidth : expandedWidth;
});

function syncViewport() {
  if (!process.client) {
    return;
  }

  isDesktop.value = window.innerWidth >= DESKTOP_BREAKPOINT;
  if (isDesktop.value) {
    mobileSidebarOpen.value = false;
    return;
  }

  isCollapse.value = false;
}

function toggleSidebar() {
  if (isDesktop.value) {
    isCollapse.value = !isCollapse.value;
    return;
  }

  mobileSidebarOpen.value = !mobileSidebarOpen.value;
}

function closeMobileSidebar() {
  mobileSidebarOpen.value = false;
}

watch(isCollapse, value => collapseState.value = value, { immediate: true });
watch(collapseState, value => isCollapse.value = Boolean(value), { immediate: true });

watch(() => route.fullPath, () => {
  mobileSidebarOpen.value = false;
});

onMounted(() => {
  syncViewport();
  window.addEventListener('resize', syncViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewport);
});
</script>

<template>
  <div class="horizon-two-layout">
    <aside class="horizon-two-layout__sidebar horizon-two-layout__sidebar--desktop" :style="{ width: `${sidebarWidth}px` }">
      <ThemeHorizonTwoLayoutSidebar :is-collapse="isCollapse" />
    </aside>

    <Transition name="horizon-two-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="horizon-two-layout__overlay"
        aria-label="Tutup sidebar"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="horizon-two-slide">
      <aside v-if="mobileSidebarOpen" class="horizon-two-layout__sidebar horizon-two-layout__sidebar--mobile">
        <ThemeHorizonTwoLayoutSidebar :is-collapse="false" />
      </aside>
    </Transition>

    <div class="horizon-two-layout__content" :style="{ paddingLeft: `${sidebarWidth}px` }">
      <header class="horizon-two-layout__header">
        <ThemeHorizonTwoLayoutHeader
          :is-collapse="isCollapse"
          :is-desktop="isDesktop"
          @toggle-sidebar="toggleSidebar"
        />
      </header>

      <main class="horizon-two-layout__main">
        <section class="horizon-two-layout__showcase">
          <ThemeHorizonTwoUiMetricCard label="Pendapatan Minggu Ini" value="Rp 842 Jt" trend="+9.8%" tone="mint" />
          <ThemeHorizonTwoUiMetricCard label="Order Diproses" value="1.284" trend="+124" tone="sky" />
          <ThemeHorizonTwoUiMetricCard label="Tiket Prioritas" value="18" trend="-4" tone="sun" />
        </section>

        <ThemeHorizonTwoUiSectionFrame title="Ruang Kerja" description="Komponen halaman ditempatkan di dalam frame tema editorial ini.">
          <slot />
        </ThemeHorizonTwoUiSectionFrame>
      </main>

      <ThemeHorizonTwoLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.horizon-two-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(110, 197, 176, 0.12), transparent 24%),
    radial-gradient(circle at bottom left, rgba(255, 183, 77, 0.1), transparent 24%),
    linear-gradient(180deg, #f7f4ed 0%, #eff4f2 100%);
}

.horizon-two-layout__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  height: 100vh;
}

.horizon-two-layout__sidebar--desktop {
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
}

.horizon-two-layout__sidebar--mobile {
  width: 304px;

  @media (min-width: 1024px) {
    display: none;
  }
}

.horizon-two-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(21, 36, 34, 0.34);
  backdrop-filter: blur(4px);
}

.horizon-two-layout__content {
  min-height: 100vh;
  transition: padding-left 0.24s ease;
}

.horizon-two-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 14px 14px 0;

  @media (min-width: 768px) {
    padding: 18px 18px 0;
  }
}

.horizon-two-layout__main {
  padding: 16px 14px 28px;

  @media (min-width: 768px) {
    padding: 18px 18px 32px;
  }
}

.horizon-two-layout__showcase {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.horizon-two-fade-enter-active,
.horizon-two-fade-leave-active {
  transition: opacity 0.2s ease;
}

.horizon-two-fade-enter-from,
.horizon-two-fade-leave-to {
  opacity: 0;
}

.horizon-two-slide-enter-active,
.horizon-two-slide-leave-active {
  transition: transform 0.22s ease;
}

.horizon-two-slide-enter-from,
.horizon-two-slide-leave-to {
  transform: translateX(-100%);
}
</style>
