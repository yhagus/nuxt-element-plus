<script setup lang="ts">
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 320;

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
  if (isDesktop.value) {
    return;
  }

  mobileSidebarOpen.value = !mobileSidebarOpen.value;
}

function closeMobileSidebar() {
  mobileSidebarOpen.value = false;
}

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
  <div class="canvas-layout">
    <aside class="canvas-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeCanvasOneLayoutSidebar />
    </aside>

    <Transition name="canvas-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="canvas-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="canvas-slide">
      <aside v-if="mobileSidebarOpen" class="canvas-layout__drawer">
        <ThemeCanvasOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="canvas-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="canvas-layout__header">
        <ThemeCanvasOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="canvas-layout__main">
        <div class="canvas-layout__ribbon">
          <ThemeCanvasOneUiBadgePanel label="Studio" value="12 draft aktif" tone="rose" />
          <ThemeCanvasOneUiBadgePanel label="Approval" value="7 menunggu" tone="cobalt" />
          <ThemeCanvasOneUiBadgePanel label="Arsip" value="1.284 item" tone="sand" />
        </div>

        <ThemeCanvasOneUiPaperPanel title="Creative Workspace" description="Tema editorial bergaya studio dengan panel kertas dan badge warna.">
          <slot />
        </ThemeCanvasOneUiPaperPanel>
      </main>

      <ThemeCanvasOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.canvas-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(228, 93, 93, 0.08), transparent 24%),
    radial-gradient(circle at top right, rgba(69, 104, 220, 0.08), transparent 24%),
    linear-gradient(180deg, #fbf6ef 0%, #f5efe6 100%);
}

.canvas-layout__sidebar {
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

.canvas-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 320px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.canvas-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(47, 32, 27, 0.34);
  backdrop-filter: blur(4px);
}

.canvas-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}

.canvas-layout__main {
  padding: 16px 16px 30px;
}

.canvas-layout__ribbon {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.canvas-fade-enter-active,
.canvas-fade-leave-active {
  transition: opacity 0.2s ease;
}

.canvas-fade-enter-from,
.canvas-fade-leave-to {
  opacity: 0;
}

.canvas-slide-enter-active,
.canvas-slide-leave-active {
  transition: transform 0.22s ease;
}

.canvas-slide-enter-from,
.canvas-slide-leave-to {
  transform: translateX(-100%);
}
</style>
