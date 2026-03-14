<script setup lang="ts">
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 272;

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
  <div class="orbit-layout">
    <aside class="orbit-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeOrbitOneLayoutSidebar />
    </aside>

    <Transition name="orbit-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="orbit-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="orbit-slide">
      <aside v-if="mobileSidebarOpen" class="orbit-layout__drawer">
        <ThemeOrbitOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="orbit-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="orbit-layout__header">
        <ThemeOrbitOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="orbit-layout__main">
        <div class="orbit-layout__stats">
          <ThemeOrbitOneUiStatTile label="ARR" value="Rp 12.4 M" note="+6.2% QoQ" />
          <ThemeOrbitOneUiStatTile label="Retention" value="94.2%" note="Stabil 8 minggu" />
          <ThemeOrbitOneUiStatTile label="Open tickets" value="14" note="2 prioritas tinggi" />
        </div>

        <ThemeOrbitOneUiFrameBlock title="Enterprise Workspace" description="Tema korporat yang lebih tenang, rapi, dan padat untuk dashboard internal.">
          <slot />
        </ThemeOrbitOneUiFrameBlock>
      </main>

      <ThemeOrbitOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.orbit-layout {
  min-height: 100vh;
  background: linear-gradient(180deg, #f4f7fb 0%, #eef2f7 100%);
}

.orbit-layout__sidebar {
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

.orbit-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 272px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.orbit-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(15, 23, 42, 0.28);
}

.orbit-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}

.orbit-layout__main {
  padding: 16px 16px 30px;
}

.orbit-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.orbit-fade-enter-active,
.orbit-fade-leave-active {
  transition: opacity 0.2s ease;
}

.orbit-fade-enter-from,
.orbit-fade-leave-to {
  opacity: 0;
}

.orbit-slide-enter-active,
.orbit-slide-leave-active {
  transition: transform 0.22s ease;
}

.orbit-slide-enter-from,
.orbit-slide-leave-to {
  transform: translateX(-100%);
}
</style>
