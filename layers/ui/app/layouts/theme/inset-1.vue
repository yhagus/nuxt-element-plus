<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1100;
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
  <div class="inset-layout">
    <Transition name="inset-fade">
      <button v-if="mobileSidebarOpen" type="button" class="inset-layout__overlay" aria-label="Tutup menu" @click="closeSidebar" />
    </Transition>

    <Transition name="inset-slide">
      <aside v-if="mobileSidebarOpen" class="inset-layout__drawer">
        <ThemeInsetOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="inset-layout__shell">
      <aside class="inset-layout__sidebar">
        <ThemeInsetOneLayoutSidebar />
      </aside>

      <div class="inset-layout__content">
        <header class="inset-layout__header">
          <ThemeInsetOneLayoutHeader @toggle-sidebar="toggleSidebar" />
        </header>

        <main class="inset-layout__main">
          <div class="inset-layout__grid">
            <ThemeInsetOneUiInsetPanel title="Inset Workspace">
              <slot />
            </ThemeInsetOneUiInsetPanel>

            <aside class="inset-layout__quick">
              <ThemeInsetOneUiInsetStat label="Sync" value="Ok" />
              <ThemeInsetOneUiInsetStat label="Draft" value="9" />
            </aside>
          </div>
        </main>

        <ThemeInsetOneLayoutFooter />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inset-layout {
  min-height: 100vh;
  padding: 10px;
  background: #f7f4ef;
}

.inset-layout__shell {
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100vh - 20px);
  border-radius: 18px;
  background: #fffdf8;
  box-shadow: inset 0 0 0 1px rgba(122, 100, 72, 0.12);

  @media (min-width: 1100px) {
    grid-template-columns: 214px minmax(0, 1fr);
  }
}

.inset-layout__sidebar {
  display: none;

  @media (min-width: 1100px) {
    display: block;
  }
}

.inset-layout__header {
  position: sticky;
  top: 10px;
  z-index: 10;
  padding: 10px 10px 0;
}

.inset-layout__main {
  padding: 10px;
}

.inset-layout__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 1fr) 120px;
  }
}

.inset-layout__quick {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.inset-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(55, 41, 25, 0.22);
}

.inset-layout__drawer {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 40;
  width: 214px;
  height: calc(100vh - 20px);
}

.inset-fade-enter-active,
.inset-fade-leave-active {
  transition: opacity 0.18s ease;
}

.inset-fade-enter-from,
.inset-fade-leave-to {
  opacity: 0;
}

.inset-slide-enter-active,
.inset-slide-leave-active {
  transition: transform 0.2s ease;
}

.inset-slide-enter-from,
.inset-slide-leave-to {
  transform: translateX(-100%);
}
</style>
