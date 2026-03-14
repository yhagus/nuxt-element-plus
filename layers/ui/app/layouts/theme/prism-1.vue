<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 296;
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
  <div class="prism-layout">
    <aside class="prism-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemePrismOneLayoutSidebar />
    </aside>
    <Transition name="prism-fade">
      <button v-if="mobileSidebarOpen" type="button" class="prism-layout__overlay" aria-label="Tutup navigasi" @click="closeMobileSidebar" />
    </Transition>
    <Transition name="prism-slide">
      <aside v-if="mobileSidebarOpen" class="prism-layout__drawer">
        <ThemePrismOneLayoutSidebar />
      </aside>
    </Transition>
    <div class="prism-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="prism-layout__header">
        <ThemePrismOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>
      <main class="prism-layout__main">
        <div class="prism-layout__stats">
          <ThemePrismOneUiGlowCard label="Campaign" value="24 live" tone="pink" />
          <ThemePrismOneUiGlowCard label="CTR" value="8.4%" tone="cyan" />
          <ThemePrismOneUiGlowCard label="Revenue" value="Rp 2.1 M" tone="amber" />
        </div>
        <ThemePrismOneUiSpectrumPanel title="Prism Workspace" description="Tema cerah penuh warna untuk dashboard pemasaran dan eksperimen.">
          <slot />
        </ThemePrismOneUiSpectrumPanel>
      </main>
      <ThemePrismOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.prism-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 94, 125, 0.16), transparent 22%),
    radial-gradient(circle at top right, rgba(71, 219, 255, 0.16), transparent 22%),
    linear-gradient(180deg, #fff8fb 0%, #f8fbff 100%);
}
.prism-layout__sidebar {
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
.prism-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 296px;
  height: 100vh;
  @media (min-width: 1024px) {
    display: none;
  }
}
.prism-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(54, 33, 75, 0.24);
  backdrop-filter: blur(4px);
}
.prism-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}
.prism-layout__main {
  padding: 16px 16px 30px;
}
.prism-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.prism-fade-enter-active,
.prism-fade-leave-active {
  transition: opacity 0.2s ease;
}
.prism-fade-enter-from,
.prism-fade-leave-to {
  opacity: 0;
}
.prism-slide-enter-active,
.prism-slide-leave-active {
  transition: transform 0.22s ease;
}
.prism-slide-enter-from,
.prism-slide-leave-to {
  transform: translateX(-100%);
}
</style>
