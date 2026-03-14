<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1080;
const sidebarWidth = 210;
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
  <div class="outline-layout">
    <aside class="outline-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeOutlineOneLayoutSidebar />
    </aside>

    <Transition name="outline-fade">
      <button v-if="drawerOpen" type="button" class="outline-layout__overlay" aria-label="Tutup menu" @click="closeDrawer" />
    </Transition>

    <Transition name="outline-slide">
      <aside v-if="drawerOpen" class="outline-layout__drawer">
        <ThemeOutlineOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="outline-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="outline-layout__header">
        <ThemeOutlineOneLayoutHeader @toggle-drawer="toggleDrawer" />
      </header>

      <main class="outline-layout__main">
        <div class="outline-layout__stats">
          <ThemeOutlineOneUiFrameStat label="Users" value="842" />
          <ThemeOutlineOneUiFrameStat label="Roles" value="18" />
          <ThemeOutlineOneUiFrameStat label="Groups" value="7" />
        </div>

        <ThemeOutlineOneUiFrameBoard title="Outline Workspace">
          <slot />
        </ThemeOutlineOneUiFrameBoard>
      </main>

      <ThemeOutlineOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.outline-layout {
  min-height: 100vh;
  background: #f7f7f7;
}

.outline-layout__sidebar {
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

.outline-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 210px;
  height: 100vh;

  @media (min-width: 1080px) {
    display: none;
  }
}

.outline-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(0, 0, 0, 0.18);
}

.outline-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}

.outline-layout__main {
  padding: 16px 16px 24px;
}

.outline-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.outline-fade-enter-active,
.outline-fade-leave-active {
  transition: opacity 0.18s ease;
}

.outline-fade-enter-from,
.outline-fade-leave-to {
  opacity: 0;
}

.outline-slide-enter-active,
.outline-slide-leave-active {
  transition: transform 0.2s ease;
}

.outline-slide-enter-from,
.outline-slide-leave-to {
  transform: translateX(-100%);
}
</style>
