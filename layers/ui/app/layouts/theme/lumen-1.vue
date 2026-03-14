<script setup lang="ts">
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 296;

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
  <div class="lumen-layout">
    <aside class="lumen-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeLumenOneLayoutSidebar />
    </aside>

    <Transition name="lumen-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="lumen-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="lumen-slide">
      <aside v-if="mobileSidebarOpen" class="lumen-layout__drawer">
        <ThemeLumenOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="lumen-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="lumen-layout__header">
        <ThemeLumenOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="lumen-layout__main">
        <div class="lumen-layout__stats">
          <ThemeLumenOneUiPulseCard label="MRR" value="Rp 1.8 M" detail="+7.1% bulan ini" tone="blue" />
          <ThemeLumenOneUiPulseCard label="Churn" value="1.2%" detail="Turun 0.3 poin" tone="mint" />
          <ThemeLumenOneUiPulseCard label="Activation" value="82%" detail="Uji onboarding baru" tone="peach" />
        </div>

        <ThemeLumenOneUiSoftPanel title="Lumen Workspace" description="Tema SaaS/admin yang ringan dengan komponen lembut dan cerah.">
          <slot />
        </ThemeLumenOneUiSoftPanel>
      </main>

      <ThemeLumenOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.lumen-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(106, 157, 255, 0.12), transparent 22%),
    radial-gradient(circle at top left, rgba(104, 215, 188, 0.12), transparent 22%),
    linear-gradient(180deg, #f8fbff 0%, #f3f7fd 100%);
}

.lumen-layout__sidebar {
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

.lumen-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 296px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.lumen-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(53, 80, 124, 0.2);
  backdrop-filter: blur(4px);
}

.lumen-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}

.lumen-layout__main {
  padding: 16px 16px 30px;
}

.lumen-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.lumen-fade-enter-active,
.lumen-fade-leave-active {
  transition: opacity 0.2s ease;
}

.lumen-fade-enter-from,
.lumen-fade-leave-to {
  opacity: 0;
}

.lumen-slide-enter-active,
.lumen-slide-leave-active {
  transition: transform 0.22s ease;
}

.lumen-slide-enter-from,
.lumen-slide-leave-to {
  transform: translateX(-100%);
}
</style>
