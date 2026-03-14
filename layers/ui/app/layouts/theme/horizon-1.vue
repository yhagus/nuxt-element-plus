<script setup lang="ts">
const collapseState = useState<boolean>('theme-horizon-1-sidebar-collapsed', () => false);
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const sidebarExpandedWidth = 288;
const sidebarCollapsedWidth = 104;

const isDesktop = ref(false);
const isCollapse = ref(false);
const mobileSidebarOpen = ref(false);

const sidebarWidth = computed(() => (isDesktop.value ? (isCollapse.value ? sidebarCollapsedWidth : sidebarExpandedWidth) : 0));

function syncViewport() {
  if (!process.client) {
    return;
  }

  isDesktop.value = window.innerWidth >= DESKTOP_BREAKPOINT;

  if (isDesktop.value) {
    mobileSidebarOpen.value = false;
    return;
  }

  isCollapse.value = false;
}

function toggleSidebar() {
  if (isDesktop.value) {
    isCollapse.value = !isCollapse.value;
    return;
  }

  mobileSidebarOpen.value = !mobileSidebarOpen.value;
}

function closeMobileSidebar() {
  mobileSidebarOpen.value = false;
}

watch(isCollapse, (value) => {
  collapseState.value = value;
}, { immediate: true });

watch(collapseState, (value) => {
  isCollapse.value = Boolean(value);
}, { immediate: true });

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
  <div class="horizon-layout">
    <aside class="horizon-layout__sidebar horizon-layout__sidebar--desktop" :style="{ width: `${sidebarWidth}px` }">
      <ThemeHorizonOneLayoutSidebar :is-collapse="isCollapse" />
    </aside>

    <Transition name="horizon-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="horizon-layout__overlay"
        aria-label="Tutup sidebar"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="horizon-slide">
      <aside v-if="mobileSidebarOpen" class="horizon-layout__sidebar horizon-layout__sidebar--mobile">
        <ThemeHorizonOneLayoutSidebar :is-collapse="false" />
      </aside>
    </Transition>

    <div class="horizon-layout__content" :style="{ paddingLeft: `${sidebarWidth}px` }">
      <header class="horizon-layout__header">
        <ThemeHorizonOneLayoutHeader
          :is-collapse="isCollapse"
          :is-desktop="isDesktop"
          @toggle-sidebar="toggleSidebar"
        />
      </header>
      <main class="horizon-layout__main">
        <slot />
      </main>
      <ThemeHorizonOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.horizon-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(233, 127, 72, 0.12), transparent 28%),
    linear-gradient(180deg, #f6f1e8 0%, #f3efe7 40%, #efe7da 100%);
}

.horizon-layout__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  height: 100vh;
}

.horizon-layout__sidebar--desktop {
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
}

.horizon-layout__sidebar--mobile {
  width: 288px;

  @media (min-width: 1024px) {
    display: none;
  }
}

.horizon-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(26, 24, 22, 0.42);
  backdrop-filter: blur(4px);
}

.horizon-layout__content {
  position: relative;
  min-height: 100vh;
  transition: padding-left 0.24s ease;
}

.horizon-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 12px 12px 0;

  @media (min-width: 768px) {
    padding: 16px 16px 0;
  }

  @media (min-width: 1280px) {
    padding: 20px 20px 0;
  }
}

.horizon-layout__main {
  padding: 16px 12px 28px;

  @media (min-width: 768px) {
    padding: 20px 16px 32px;
  }

  @media (min-width: 1280px) {
    padding: 24px 20px 36px;
  }
}

.horizon-fade-enter-active,
.horizon-fade-leave-active {
  transition: opacity 0.2s ease;
}

.horizon-fade-enter-from,
.horizon-fade-leave-to {
  opacity: 0;
}

.horizon-slide-enter-active,
.horizon-slide-leave-active {
  transition: transform 0.22s ease;
}

.horizon-slide-enter-from,
.horizon-slide-leave-to {
  transform: translateX(-100%);
}
</style>
