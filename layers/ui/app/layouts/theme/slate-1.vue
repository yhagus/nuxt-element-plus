<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 284;
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
  <div class="slate-layout">
    <aside class="slate-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeSlateOneLayoutSidebar />
    </aside>
    <Transition name="slate-fade">
      <button v-if="mobileSidebarOpen" type="button" class="slate-layout__overlay" aria-label="Tutup navigasi" @click="closeMobileSidebar" />
    </Transition>
    <Transition name="slate-slide">
      <aside v-if="mobileSidebarOpen" class="slate-layout__drawer">
        <ThemeSlateOneLayoutSidebar />
      </aside>
    </Transition>
    <div class="slate-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="slate-layout__header">
        <ThemeSlateOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>
      <main class="slate-layout__main">
        <div class="slate-layout__stats">
          <ThemeSlateOneUiBoardStat label="Backlog" value="128" />
          <ThemeSlateOneUiBoardStat label="Sprint" value="24" />
          <ThemeSlateOneUiBoardStat label="Blocked" value="3" />
        </div>
        <ThemeSlateOneUiBoardPanel title="Slate Workspace" description="Tema board abu-biru yang netral untuk operasi produk dan delivery.">
          <slot />
        </ThemeSlateOneUiBoardPanel>
      </main>
      <ThemeSlateOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.slate-layout {
  min-height: 100vh;
  background: linear-gradient(180deg, #eef2f6 0%, #e8edf3 100%);
}
.slate-layout__sidebar {
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
.slate-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 284px;
  height: 100vh;
  @media (min-width: 1024px) {
    display: none;
  }
}
.slate-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(24, 35, 46, 0.26);
}
.slate-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}
.slate-layout__main {
  padding: 16px 16px 30px;
}
.slate-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.slate-fade-enter-active,
.slate-fade-leave-active {
  transition: opacity 0.2s ease;
}
.slate-fade-enter-from,
.slate-fade-leave-to {
  opacity: 0;
}
.slate-slide-enter-active,
.slate-slide-leave-active {
  transition: transform 0.22s ease;
}
.slate-slide-enter-from,
.slate-slide-leave-to {
  transform: translateX(-100%);
}
</style>
