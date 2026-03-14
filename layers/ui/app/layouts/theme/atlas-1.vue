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
  <div class="atlas-layout">
    <aside class="atlas-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeAtlasOneLayoutSidebar />
    </aside>

    <Transition name="atlas-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="atlas-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="atlas-slide">
      <aside v-if="mobileSidebarOpen" class="atlas-layout__drawer">
        <ThemeAtlasOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="atlas-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="atlas-layout__header">
        <ThemeAtlasOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="atlas-layout__main">
        <div class="atlas-layout__hero">
          <ThemeAtlasOneUiInsightCard title="Cakupan Wilayah" value="38 provinsi" subtitle="Semua region aktif dan tersinkron." accent="emerald" />
          <ThemeAtlasOneUiInsightCard title="Distribusi Harian" value="124 rute" subtitle="12 rute baru ditinjau pagi ini." accent="amber" />
        </div>

        <ThemeAtlasOneUiSurface title="Workspace Atlas" description="Tema bernuansa peta operasional dengan panel data datar dan terang.">
          <slot />
        </ThemeAtlasOneUiSurface>
      </main>

      <ThemeAtlasOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.atlas-layout {
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(30, 122, 102, 0.06), transparent 18%),
    linear-gradient(90deg, rgba(40, 96, 180, 0.04), transparent 22%), linear-gradient(180deg, #f9fbf7 0%, #f4f7f5 100%);
}

.atlas-layout__sidebar {
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

.atlas-layout__drawer {
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

.atlas-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(12, 32, 28, 0.34);
  backdrop-filter: blur(4px);
}

.atlas-layout__content {
  min-height: 100vh;
}

.atlas-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}

.atlas-layout__main {
  padding: 16px 16px 30px;
}

.atlas-layout__hero {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.atlas-fade-enter-active,
.atlas-fade-leave-active {
  transition: opacity 0.2s ease;
}

.atlas-fade-enter-from,
.atlas-fade-leave-to {
  opacity: 0;
}

.atlas-slide-enter-active,
.atlas-slide-leave-active {
  transition: transform 0.22s ease;
}

.atlas-slide-enter-from,
.atlas-slide-leave-to {
  transform: translateX(-100%);
}
</style>
