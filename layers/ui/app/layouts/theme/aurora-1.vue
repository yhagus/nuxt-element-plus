<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 292;
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
  <div class="aurora-layout">
    <aside class="aurora-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeAuroraOneLayoutSidebar />
    </aside>
    <Transition name="aurora-fade">
      <button v-if="mobileSidebarOpen" type="button" class="aurora-layout__overlay" aria-label="Tutup navigasi" @click="closeMobileSidebar" />
    </Transition>
    <Transition name="aurora-slide">
      <aside v-if="mobileSidebarOpen" class="aurora-layout__drawer">
        <ThemeAuroraOneLayoutSidebar />
      </aside>
    </Transition>
    <div class="aurora-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="aurora-layout__header">
        <ThemeAuroraOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>
      <main class="aurora-layout__main">
        <div class="aurora-layout__stats">
          <ThemeAuroraOneUiHaloCard label="Sessions" value="12.8k" tone="mint" />
          <ThemeAuroraOneUiHaloCard label="Conversion" value="5.1%" tone="violet" />
          <ThemeAuroraOneUiHaloCard label="Revenue" value="Rp 3.7 M" tone="gold" />
        </div>
        <ThemeAuroraOneUiMistPanel title="Aurora Workspace" description="Tema lembut dengan gradien dingin dan glow yang ringan.">
          <slot />
        </ThemeAuroraOneUiMistPanel>
      </main>
      <ThemeAuroraOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.aurora-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(125, 255, 219, 0.14), transparent 24%),
    radial-gradient(circle at top right, rgba(177, 121, 255, 0.12), transparent 22%),
    linear-gradient(180deg, #f7fcff 0%, #f3f6ff 100%);
}
.aurora-layout__sidebar {
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
.aurora-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 292px;
  height: 100vh;
  @media (min-width: 1024px) {
    display: none;
  }
}
.aurora-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(63, 82, 122, 0.22);
  backdrop-filter: blur(4px);
}
.aurora-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}
.aurora-layout__main {
  padding: 16px 16px 30px;
}
.aurora-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.aurora-fade-enter-active,
.aurora-fade-leave-active {
  transition: opacity 0.2s ease;
}
.aurora-fade-enter-from,
.aurora-fade-leave-to {
  opacity: 0;
}
.aurora-slide-enter-active,
.aurora-slide-leave-active {
  transition: transform 0.22s ease;
}
.aurora-slide-enter-from,
.aurora-slide-leave-to {
  transform: translateX(-100%);
}
</style>
