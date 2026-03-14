<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 230;
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
  <div class="ledger-layout">
    <aside class="ledger-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeLedgerOneLayoutSidebar />
    </aside>

    <Transition name="ledger-fade">
      <button v-if="drawerOpen" type="button" class="ledger-layout__overlay" aria-label="Tutup menu" @click="closeDrawer" />
    </Transition>

    <Transition name="ledger-slide">
      <aside v-if="drawerOpen" class="ledger-layout__drawer">
        <ThemeLedgerOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="ledger-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="ledger-layout__header">
        <ThemeLedgerOneLayoutHeader @toggle-drawer="toggleDrawer" />
      </header>

      <main class="ledger-layout__main">
        <div class="ledger-layout__row">
          <ThemeLedgerOneUiLedgerCell label="Receipts" value="84" />
          <ThemeLedgerOneUiLedgerCell label="Settled" value="79" />
          <ThemeLedgerOneUiLedgerCell label="Pending" value="5" />
        </div>

        <ThemeLedgerOneUiSheet title="Ledger Workspace">
          <slot />
        </ThemeLedgerOneUiSheet>
      </main>

      <ThemeLedgerOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ledger-layout {
  min-height: 100vh;
  background: #f7f8f3;
}

.ledger-layout__sidebar {
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

.ledger-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 230px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.ledger-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(55, 60, 36, 0.22);
}

.ledger-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 10px 10px 0;
}

.ledger-layout__main {
  padding: 10px 10px 18px;
}

.ledger-layout__row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin-bottom: 10px;
  border: 1px solid #d9dcc8;
  border-radius: 12px;
  overflow: hidden;
}

.ledger-fade-enter-active,
.ledger-fade-leave-active {
  transition: opacity 0.18s ease;
}

.ledger-fade-enter-from,
.ledger-fade-leave-to {
  opacity: 0;
}

.ledger-slide-enter-active,
.ledger-slide-leave-active {
  transition: transform 0.2s ease;
}

.ledger-slide-enter-from,
.ledger-slide-leave-to {
  transform: translateX(-100%);
}
</style>
