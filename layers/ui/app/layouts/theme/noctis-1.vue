<script setup lang="ts">
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 300;

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
  <div class="noctis-layout">
    <aside class="noctis-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeNoctisOneLayoutSidebar />
    </aside>

    <Transition name="noctis-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="noctis-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="noctis-slide">
      <aside v-if="mobileSidebarOpen" class="noctis-layout__drawer">
        <ThemeNoctisOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="noctis-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="noctis-layout__header">
        <ThemeNoctisOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="noctis-layout__main">
        <div class="noctis-layout__hero">
          <ThemeNoctisOneUiLuxeCard label="Gross Volume" value="Rp 18.2 M" footnote="Premium segment +14%" tone="gold" />
          <ThemeNoctisOneUiLuxeCard label="VIP Accounts" value="284" footnote="12 onboarding pending" tone="plum" />
        </div>

        <ThemeNoctisOneUiVelvetPanel title="Premium Workspace" description="Tema gelap dengan aksen mewah dan panel glossy.">
          <slot />
        </ThemeNoctisOneUiVelvetPanel>
      </main>

      <ThemeNoctisOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.noctis-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(214, 171, 84, 0.14), transparent 22%),
    linear-gradient(180deg, #111018 0%, #151320 48%, #0f0d16 100%);
}

.noctis-layout__sidebar {
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

.noctis-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 300px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.noctis-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(6, 4, 12, 0.54);
  backdrop-filter: blur(4px);
}

.noctis-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}

.noctis-layout__main {
  padding: 16px 16px 30px;
}

.noctis-layout__hero {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.noctis-fade-enter-active,
.noctis-fade-leave-active {
  transition: opacity 0.2s ease;
}

.noctis-fade-enter-from,
.noctis-fade-leave-to {
  opacity: 0;
}

.noctis-slide-enter-active,
.noctis-slide-leave-active {
  transition: transform 0.22s ease;
}

.noctis-slide-enter-from,
.noctis-slide-leave-to {
  transform: translateX(-100%);
}
</style>
