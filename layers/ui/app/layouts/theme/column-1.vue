<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1100;
const sidebarWidth = 280;
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

function toggleSidebar() {
  if (!isDesktop.value) {
    drawerOpen.value = !drawerOpen.value;
  }
}

function closeSidebar() {
  drawerOpen.value = false;
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
  <div class="column-layout">
    <aside class="column-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeColumnOneLayoutSidebar />
    </aside>

    <Transition name="column-fade">
      <button
        v-if="drawerOpen"
        type="button"
        class="column-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeSidebar"
      />
    </Transition>

    <Transition name="column-slide">
      <aside v-if="drawerOpen" class="column-layout__drawer">
        <ThemeColumnOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="column-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="column-layout__header">
        <ThemeColumnOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="column-layout__main">
        <div class="column-layout__stats">
          <ThemeColumnOneUiFactCard label="Orders" value="1,284" />
          <ThemeColumnOneUiFactCard label="Gross" value="Rp 4.2 M" />
          <ThemeColumnOneUiFactCard label="Returns" value="14" />
        </div>

        <ThemeColumnOneUiCanvas title="Column Workspace">
          <slot />
        </ThemeColumnOneUiCanvas>
      </main>

      <ThemeColumnOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.column-layout {
  min-height: 100vh;
  background: #f6f1ea;
}

.column-layout__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  display: none;
  height: 100vh;

  @media (min-width: 1100px) {
    display: block;
  }
}

.column-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 280px;
  height: 100vh;

  @media (min-width: 1100px) {
    display: none;
  }
}

.column-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(54, 38, 26, 0.24);
}

.column-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}

.column-layout__main {
  padding: 16px 16px 28px;
}

.column-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.column-fade-enter-active,
.column-fade-leave-active {
  transition: opacity 0.2s ease;
}

.column-fade-enter-from,
.column-fade-leave-to {
  opacity: 0;
}

.column-slide-enter-active,
.column-slide-leave-active {
  transition: transform 0.22s ease;
}

.column-slide-enter-from,
.column-slide-leave-to {
  transform: translateX(-100%);
}
</style>
