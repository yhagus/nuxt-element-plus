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
  if (isDesktop.value) {
    return;
  }

  mobileSidebarOpen.value = !mobileSidebarOpen.value;
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
  <div class="theme-layout">
    <aside class="theme-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeCloudConsoleOneLayoutSidebar />
    </aside>

    <Transition name="theme-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="theme-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="theme-slide">
      <aside v-if="mobileSidebarOpen" class="theme-layout__drawer">
        <ThemeCloudConsoleOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="theme-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="theme-layout__header">
        <ThemeCloudConsoleOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="theme-layout__main">
        <section class="grid gap-3 md:grid-cols-3">
          <ThemeCloudConsoleOneUiStatChip label="Active" value="128" tone="success" />
          <ThemeCloudConsoleOneUiStatChip label="Warning" value="12" tone="warning" />
          <ThemeCloudConsoleOneUiStatChip label="Critical" value="3" tone="danger" />
        </section>

        <ThemeCloudConsoleOneUiSurfacePanel
          title="Cloud Console"
          description="Konsol resource cloud dengan navigasi proyek dan panel detail."
        >
          <slot />
        </ThemeCloudConsoleOneUiSurfacePanel>
      </main>

      <ThemeCloudConsoleOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.theme-layout {
  min-height: 100vh;
  background: linear-gradient(180deg, #f6f8fb 0%, #eef3f9 100%);
  color: #17304d;
}

.theme-layout__sidebar {
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

.theme-layout__drawer {
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

.theme-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(20, 37, 64, 0.36);
  backdrop-filter: blur(4px);
}

.theme-layout__content {
  min-height: 100vh;
  transition: padding-left 0.22s ease;
}

.theme-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 12px 12px 0;
}

.theme-layout__main {
  padding: 12px 12px 24px;
  display: grid;
  gap: 14px;
}

.theme-fade-enter-active,
.theme-fade-leave-active {
  transition: opacity 0.2s ease;
}

.theme-fade-enter-from,
.theme-fade-leave-to {
  opacity: 0;
}

.theme-slide-enter-active,
.theme-slide-leave-active {
  transition: transform 0.22s ease;
}

.theme-slide-enter-from,
.theme-slide-leave-to {
  transform: translateX(-100%);
}
</style>
