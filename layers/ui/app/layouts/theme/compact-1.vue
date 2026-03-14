<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 248;
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
  <div class="compact-layout">
    <aside class="compact-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeCompactOneLayoutSidebar />
    </aside>
    <Transition name="compact-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="compact-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>
    <Transition name="compact-slide">
      <aside v-if="mobileSidebarOpen" class="compact-layout__drawer">
        <ThemeCompactOneLayoutSidebar />
      </aside>
    </Transition>
    <div class="compact-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="compact-layout__header">
        <ThemeCompactOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>
      <main class="compact-layout__main">
        <div class="compact-layout__stats">
          <ThemeCompactOneUiMiniStat label="MRR" value="1.2M" />
          <ThemeCompactOneUiMiniStat label="Orders" value="248" />
          <ThemeCompactOneUiMiniStat label="Open" value="11" />
        </div>
        <ThemeCompactOneUiDensePanel title="Compact Workspace">
          <slot />
        </ThemeCompactOneUiDensePanel>
      </main>
      <ThemeCompactOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.compact-layout {
  min-height: 100vh;
  background: #f3f6fb;
}

.compact-layout__sidebar {
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

.compact-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 248px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.compact-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(20, 33, 52, 0.24);
}

.compact-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 10px 10px 0;
}

.compact-layout__main {
  padding: 10px 10px 18px;
}

.compact-layout__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 10px;
}

.compact-fade-enter-active,
.compact-fade-leave-active {
  transition: opacity 0.18s ease;
}

.compact-fade-enter-from,
.compact-fade-leave-to {
  opacity: 0;
}

.compact-slide-enter-active,
.compact-slide-leave-active {
  transition: transform 0.2s ease;
}

.compact-slide-enter-from,
.compact-slide-leave-to {
  transform: translateX(-100%);
}
</style>
