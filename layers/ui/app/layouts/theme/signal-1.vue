<script setup lang="ts">
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const railWidth = 96;

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
  <div class="signal-layout">
    <aside class="signal-layout__rail" :style="{ width: `${railWidth}px` }">
      <ThemeSignalOneLayoutSidebar compact />
    </aside>

    <Transition name="signal-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="signal-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="signal-slide">
      <aside v-if="mobileSidebarOpen" class="signal-layout__drawer">
        <ThemeSignalOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="signal-layout__content" :style="{ paddingLeft: `${isDesktop ? railWidth : 0}px` }">
      <header class="signal-layout__header">
        <ThemeSignalOneLayoutHeader :is-desktop="isDesktop" @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="signal-layout__main">
        <section class="signal-layout__chips">
          <ThemeSignalOneUiCommandChip label="Node Gateway" value="Online" tone="success" />
          <ThemeSignalOneUiCommandChip label="Queue" value="18 jobs" tone="neutral" />
          <ThemeSignalOneUiCommandChip label="Alert" value="2 prioritas" tone="warning" />
        </section>

        <ThemeSignalOneUiGlassPanel class="signal-layout__workspace">
          <slot />
        </ThemeSignalOneUiGlassPanel>
      </main>

      <ThemeSignalOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.signal-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(53, 132, 255, 0.12), transparent 22%),
    linear-gradient(180deg, #07111f 0%, #0a1728 48%, #08101d 100%);
}

.signal-layout__rail {
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

.signal-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 288px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.signal-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(3, 10, 19, 0.56);
  backdrop-filter: blur(4px);
}

.signal-layout__content {
  min-height: 100vh;
  transition: padding-left 0.2s ease;
}

.signal-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 14px 14px 0;
}

.signal-layout__main {
  padding: 14px 14px 26px;
}

.signal-layout__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.signal-layout__workspace {
  min-height: 320px;
}

.signal-fade-enter-active,
.signal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.signal-fade-enter-from,
.signal-fade-leave-to {
  opacity: 0;
}

.signal-slide-enter-active,
.signal-slide-leave-active {
  transition: transform 0.22s ease;
}

.signal-slide-enter-from,
.signal-slide-leave-to {
  transform: translateX(-100%);
}
</style>
