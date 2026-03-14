<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1080;
const sidebarWidth = 224;
const isDesktop = ref(false);
const drawerOpen = ref(false);

function syncViewport() {
  if (!process.client) {
    return;
  }

  isDesktop.value = window.innerWidth >= DESKTOP_BREAKPOINT;
  if (isDesktop.value) {
    drawerOpen.value = false;
  }
}

function toggleDrawer() {
  if (!isDesktop.value) {
    drawerOpen.value = !drawerOpen.value;
  }
}

function closeDrawer() {
  drawerOpen.value = false;
}

watch(() => route.fullPath, closeDrawer);

onMounted(() => {
  syncViewport();
  window.addEventListener('resize', syncViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewport);
});
</script>

<template>
  <div class="stack-layout">
    <aside class="stack-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeStackOneLayoutSidebar />
    </aside>

    <Transition name="stack-fade">
      <button v-if="drawerOpen" type="button" class="stack-layout__overlay" aria-label="Tutup menu" @click="closeDrawer" />
    </Transition>

    <Transition name="stack-slide">
      <aside v-if="drawerOpen" class="stack-layout__drawer">
        <ThemeStackOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="stack-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="stack-layout__header">
        <ThemeStackOneLayoutHeader @toggle-drawer="toggleDrawer" />
      </header>

      <main class="stack-layout__main">
        <div class="stack-layout__tiles">
          <ThemeStackOneUiStackCard label="Pinned" value="5" />
          <ThemeStackOneUiStackCard label="Shared" value="14" />
          <ThemeStackOneUiStackCard label="Notes" value="28" />
        </div>

        <ThemeStackOneUiStackBoard title="Stack Workspace">
          <slot />
        </ThemeStackOneUiStackBoard>
      </main>

      <ThemeStackOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.stack-layout {
  min-height: 100vh;
  background: #f4f2f7;
}

.stack-layout__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  display: none;
  height: 100vh;

  @media (min-width: 1080px) {
    display: block;
  }
}

.stack-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 224px;
  height: 100vh;

  @media (min-width: 1080px) {
    display: none;
  }
}

.stack-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(49, 37, 64, 0.22);
}

.stack-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 14px 14px 0;
}

.stack-layout__main {
  padding: 14px 14px 24px;
}

.stack-layout__tiles {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 14px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.stack-fade-enter-active,
.stack-fade-leave-active {
  transition: opacity 0.18s ease;
}

.stack-fade-enter-from,
.stack-fade-leave-to {
  opacity: 0;
}

.stack-slide-enter-active,
.stack-slide-leave-active {
  transition: transform 0.2s ease;
}

.stack-slide-enter-from,
.stack-slide-leave-to {
  transform: translateX(-100%);
}
</style>
