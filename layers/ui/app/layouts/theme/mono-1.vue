<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 280;
const isDesktop = ref(false);
const mobileSidebarOpen = ref(false);

function syncViewport() {
  if (!process.client) {
    return;
  }
  isDesktop.value = window.innerWidth >= DESKTOP_BREAKPOINT;
  if (isDesktop.value) {
    mobileSidebarOpen.value = false;
  }
}

function toggleSidebar() {
  if (!isDesktop.value) {
    mobileSidebarOpen.value = !mobileSidebarOpen.value;
  }
}

function closeMobileSidebar() {
  mobileSidebarOpen.value = false;
}

watch(() => route.fullPath, closeMobileSidebar);

onMounted(() => {
  syncViewport();
  window.addEventListener('resize', syncViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewport);
});
</script>

<template>
  <div class="mono-layout">
    <aside class="mono-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeMonoOneLayoutSidebar />
    </aside>
    <Transition name="mono-fade">
      <button v-if="mobileSidebarOpen" type="button" class="mono-layout__overlay" aria-label="Tutup navigasi" @click="closeMobileSidebar" />
    </Transition>
    <Transition name="mono-slide">
      <aside v-if="mobileSidebarOpen" class="mono-layout__drawer">
        <ThemeMonoOneLayoutSidebar />
      </aside>
    </Transition>
    <div class="mono-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="mono-layout__header">
        <ThemeMonoOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>
      <main class="mono-layout__main">
        <div class="mono-layout__stats">
          <ThemeMonoOneUiMetricStrip label="Users" value="12.4k" />
          <ThemeMonoOneUiMetricStrip label="Orders" value="842" />
          <ThemeMonoOneUiMetricStrip label="Tickets" value="19" />
        </div>
        <ThemeMonoOneUiPaperFrame title="Monochrome Workspace" description="Tema brutalist hitam putih dengan fokus struktur dan kontras.">
          <slot />
        </ThemeMonoOneUiPaperFrame>
      </main>
      <ThemeMonoOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.mono-layout {
  min-height: 100vh;
  background: #f5f5f5;
}
.mono-layout__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  display: none;
  height: 100vh;
  @media (min-width: 1024px) {
    display: block;
  }
}
.mono-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 280px;
  height: 100vh;
  @media (min-width: 1024px) {
    display: none;
  }
}
.mono-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(0, 0, 0, 0.4);
}
.mono-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}
.mono-layout__main {
  padding: 16px 16px 30px;
}
.mono-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.mono-fade-enter-active,
.mono-fade-leave-active {
  transition: opacity 0.2s ease;
}
.mono-fade-enter-from,
.mono-fade-leave-to {
  opacity: 0;
}
.mono-slide-enter-active,
.mono-slide-leave-active {
  transition: transform 0.22s ease;
}
.mono-slide-enter-from,
.mono-slide-leave-to {
  transform: translateX(-100%);
}
</style>
