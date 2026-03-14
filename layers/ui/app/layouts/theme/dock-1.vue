<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const railWidth = 84;
const isDesktop = ref(false);
const mobileRailOpen = ref(false);

function syncViewport() {
  if (!process.client) {
    return;
  }

  isDesktop.value = window.innerWidth >= DESKTOP_BREAKPOINT;
  if (isDesktop.value) {
    mobileRailOpen.value = false;
  }
}

function toggleRail() {
  if (!isDesktop.value) {
    mobileRailOpen.value = !mobileRailOpen.value;
  }
}

function closeRail() {
  mobileRailOpen.value = false;
}

watch(() => route.fullPath, closeRail);

onMounted(() => {
  syncViewport();
  window.addEventListener('resize', syncViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewport);
});
</script>

<template>
  <div class="dock-layout">
    <aside class="dock-layout__rail" :style="{ width: `${railWidth}px` }">
      <ThemeDockOneLayoutRail />
    </aside>

    <Transition name="dock-fade">
      <button
        v-if="mobileRailOpen"
        type="button"
        class="dock-layout__overlay"
        aria-label="Tutup menu"
        @click="closeRail"
      />
    </Transition>

    <Transition name="dock-slide">
      <aside v-if="mobileRailOpen" class="dock-layout__drawer">
        <ThemeDockOneLayoutRail expanded />
      </aside>
    </Transition>

    <div class="dock-layout__content" :style="{ paddingLeft: `${isDesktop ? railWidth : 0}px` }">
      <header class="dock-layout__header">
        <ThemeDockOneLayoutHeader @toggle-rail="toggleRail" />
      </header>

      <main class="dock-layout__main">
        <div class="dock-layout__pills">
          <ThemeDockOneUiPill label="Queue" value="18" />
          <ThemeDockOneUiPill label="Sync" value="1m" />
          <ThemeDockOneUiPill label="CPU" value="42%" />
        </div>

        <ThemeDockOneUiDockPanel title="Dock Workspace">
          <slot />
        </ThemeDockOneUiDockPanel>
      </main>

      <ThemeDockOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dock-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(86, 166, 255, 0.1), transparent 22%),
    linear-gradient(180deg, #f4f8ff 0%, #eef3fb 100%);
}

.dock-layout__rail {
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

.dock-layout__drawer {
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

.dock-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(34, 54, 89, 0.24);
}

.dock-layout__content {
  min-height: 100vh;
}

.dock-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 10px 10px 0;
}

.dock-layout__main {
  padding: 10px 10px 18px;
}

.dock-layout__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.dock-fade-enter-active,
.dock-fade-leave-active {
  transition: opacity 0.18s ease;
}

.dock-fade-enter-from,
.dock-fade-leave-to {
  opacity: 0;
}

.dock-slide-enter-active,
.dock-slide-leave-active {
  transition: transform 0.2s ease;
}

.dock-slide-enter-from,
.dock-slide-leave-to {
  transform: translateX(-100%);
}
</style>
