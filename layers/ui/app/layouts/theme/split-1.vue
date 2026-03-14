<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 220;
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

function closeSidebar() {
  mobileSidebarOpen.value = false;
}

watch(() => route.fullPath, closeSidebar);

onMounted(() => {
  syncViewport();
  window.addEventListener('resize', syncViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewport);
});
</script>

<template>
  <div class="split-layout">
    <aside class="split-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeSplitOneLayoutSidebar />
    </aside>

    <Transition name="split-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="split-layout__overlay"
        aria-label="Tutup menu"
        @click="closeSidebar"
      />
    </Transition>

    <Transition name="split-slide">
      <aside v-if="mobileSidebarOpen" class="split-layout__drawer">
        <ThemeSplitOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="split-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="split-layout__header">
        <ThemeSplitOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="split-layout__main">
        <div class="split-layout__grid">
          <ThemeSplitOneUiWorkspaceFrame title="Split Workspace">
            <slot />
          </ThemeSplitOneUiWorkspaceFrame>

          <aside class="split-layout__utility">
            <ThemeSplitOneUiStatChip label="Approvals" value="12" />
            <ThemeSplitOneUiStatChip label="Drafts" value="6" />
            <ThemeSplitOneUiStatChip label="Delay" value="1" />
          </aside>
        </div>
      </main>

      <ThemeSplitOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.split-layout {
  min-height: 100vh;
  background: #f6f8f9;
}

.split-layout__sidebar {
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

.split-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 220px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.split-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(34, 46, 52, 0.24);
}

.split-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 10px 10px 0;
}

.split-layout__main {
  padding: 10px;
}

.split-layout__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) 160px;
  }
}

.split-layout__utility {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.split-fade-enter-active,
.split-fade-leave-active {
  transition: opacity 0.18s ease;
}

.split-fade-enter-from,
.split-fade-leave-to {
  opacity: 0;
}

.split-slide-enter-active,
.split-slide-leave-active {
  transition: transform 0.2s ease;
}

.split-slide-enter-from,
.split-slide-leave-to {
  transform: translateX(-100%);
}
</style>
