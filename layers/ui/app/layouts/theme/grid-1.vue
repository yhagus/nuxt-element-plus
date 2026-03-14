<script setup lang="ts">
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 286;

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
  <div class="grid-layout">
    <aside class="grid-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeGridOneLayoutSidebar />
    </aside>

    <Transition name="grid-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="grid-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="grid-slide">
      <aside v-if="mobileSidebarOpen" class="grid-layout__drawer">
        <ThemeGridOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="grid-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="grid-layout__header">
        <ThemeGridOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="grid-layout__main">
        <div class="grid-layout__stats">
          <ThemeGridOneUiTerminalTile label="CPU" value="38%" state="normal" />
          <ThemeGridOneUiTerminalTile label="Queue" value="182" state="warning" />
          <ThemeGridOneUiTerminalTile label="Errors" value="2" state="danger" />
        </div>

        <ThemeGridOneUiConsolePanel title="Grid Workspace" description="Tema padat bergaya terminal untuk data dan observabilitas.">
          <slot />
        </ThemeGridOneUiConsolePanel>
      </main>

      <ThemeGridOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-layout {
  min-height: 100vh;
  background:
    linear-gradient(rgba(43, 255, 146, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(43, 255, 146, 0.04) 1px, transparent 1px),
    linear-gradient(180deg, #08110e 0%, #091611 100%);
  background-size:
    28px 28px,
    28px 28px,
    auto;
}

.grid-layout__sidebar {
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

.grid-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 286px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.grid-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(3, 8, 6, 0.58);
}

.grid-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}

.grid-layout__main {
  padding: 16px 16px 30px;
}

.grid-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: opacity 0.2s ease;
}

.grid-fade-enter-from,
.grid-fade-leave-to {
  opacity: 0;
}

.grid-slide-enter-active,
.grid-slide-leave-active {
  transition: transform 0.22s ease;
}

.grid-slide-enter-from,
.grid-slide-leave-to {
  transform: translateX(-100%);
}
</style>
