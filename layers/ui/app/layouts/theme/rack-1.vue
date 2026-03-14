<script setup lang="ts">
const route = useRoute();
const isDesktop = ref(false);
const drawerOpen = ref(false);

function syncViewport() {
  if (!process.client) {
    return;
  }

  isDesktop.value = window.innerWidth >= 1024;
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
  <div class="rack-layout">
    <Transition name="rack-fade">
      <button v-if="drawerOpen" type="button" class="rack-layout__overlay" aria-label="Tutup menu" @click="closeDrawer" />
    </Transition>

    <Transition name="rack-slide">
      <aside v-if="drawerOpen" class="rack-layout__drawer">
        <ThemeRackOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="rack-layout__shell">
      <header class="rack-layout__header">
        <ThemeRackOneLayoutHeader @toggle-drawer="toggleDrawer" />
      </header>

      <main class="rack-layout__main">
        <div class="rack-layout__grid">
          <aside class="rack-layout__aside">
            <ThemeRackOneLayoutSidebar />
          </aside>

          <div class="rack-layout__content">
            <div class="rack-layout__tiles">
              <ThemeRackOneUiStackTile label="Alerts" value="4" />
              <ThemeRackOneUiStackTile label="Jobs" value="21" />
              <ThemeRackOneUiStackTile label="Drafts" value="5" />
            </div>

            <ThemeRackOneUiRackPanel title="Rack Workspace">
              <slot />
            </ThemeRackOneUiRackPanel>
          </div>
        </div>
      </main>

      <ThemeRackOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.rack-layout {
  min-height: 100vh;
  padding: 10px;
  background: #f5f0ea;
}

.rack-layout__shell {
  min-height: calc(100vh - 20px);
  border-radius: 18px;
  background: #fcfaf7;
  box-shadow: inset 0 0 0 1px rgba(116, 91, 68, 0.12);
}

.rack-layout__header {
  position: sticky;
  top: 10px;
  z-index: 10;
  padding: 10px 10px 0;
}

.rack-layout__main {
  padding: 10px;
}

.rack-layout__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;

  @media (min-width: 1024px) {
    grid-template-columns: 220px minmax(0, 1fr);
  }
}

.rack-layout__aside {
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
}

.rack-layout__tiles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 10px;
}

.rack-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(63, 46, 30, 0.24);
}

.rack-layout__drawer {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 40;
  width: 220px;
  height: calc(100vh - 20px);
}

.rack-fade-enter-active,
.rack-fade-leave-active {
  transition: opacity 0.18s ease;
}

.rack-fade-enter-from,
.rack-fade-leave-to {
  opacity: 0;
}

.rack-slide-enter-active,
.rack-slide-leave-active {
  transition: transform 0.2s ease;
}

.rack-slide-enter-from,
.rack-slide-leave-to {
  transform: translateX(-100%);
}
</style>
