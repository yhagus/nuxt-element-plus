<script setup lang="ts">
const collapseState = useState<boolean>('sidebar_collapse');
const collapse = ref(false);
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const isMobile = ref(false);
const mobileSidebarOpen = ref(false);

const desktopSidebarWidth = computed(() => (collapse.value ? 60 : 256));
const contentPaddingLeft = computed(() => (isMobile.value ? 0 : desktopSidebarWidth.value));

function setCollapse(value: boolean) {
  collapse.value = value;
}

function syncViewport() {
  isMobile.value = window.innerWidth < DESKTOP_BREAKPOINT;

  if (!isMobile.value) {
    mobileSidebarOpen.value = false;
  }
}

function toggleSidebar() {
  if (isMobile.value) {
    mobileSidebarOpen.value = !mobileSidebarOpen.value;
    return;
  }

  setCollapse(!collapse.value);
}

function closeMobileSidebar() {
  mobileSidebarOpen.value = false;
}

watch(collapse, (newState) => {
  collapseState.value = newState;
}, { immediate: true });

watch(collapseState, (newState) => {
  collapse.value = Boolean(newState);
}, { immediate: true });

watch(() => route.fullPath, () => {
  if (isMobile.value) {
    closeMobileSidebar();
  }
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
  <div class="app-layout">
    <aside
      :style="{ width: `${desktopSidebarWidth}px` }"
      class="fixed left-0 top-0 z-20 hidden max-h-screen duration-300 lg:block"
    >
      <ThemeModern2LayoutSidebar :is-collapse="collapse" />
    </aside>

    <Transition name="fade">
      <button
        v-if="isMobile && mobileSidebarOpen"
        type="button"
        class="fixed inset-0 z-30 bg-black/45 backdrop-blur-[2px] lg:hidden"
        aria-label="Close sidebar"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="slide-sidebar">
      <aside
        v-if="isMobile && mobileSidebarOpen"
        class="fixed left-0 top-0 z-40 h-screen w-64 lg:hidden"
      >
        <ThemeModern2LayoutSidebar :is-collapse="false" />
      </aside>
    </Transition>

    <div class="relative min-h-screen duration-300" :style="{ paddingLeft: `${contentPaddingLeft}px` }">
      <header class="sticky top-0 z-20 h-fit p-0">
        <button
          type="button"
          class="absolute -left-3 top-8 z-100 hidden h-6 w-6 cursor-pointer rounded-full border border-gray-100 bg-white p-0 text-gray-800 duration-300 lg:flex lg:items-center lg:justify-center"
          @click="toggleSidebar"
        >
          <NIcon v-if="!collapse" name="solar:alt-arrow-left-outline" size="1.5em" />
          <NIcon v-else name="solar:alt-arrow-right-outline" size="1.5em" />
        </button>
        <ThemeModern2LayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>
      <main :style="{ minHeight: 'calc(100vh - 90px)' }" class="bg-gray-0 p-3 sm:p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  overflow-x: clip;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-sidebar-enter-active,
.slide-sidebar-leave-active {
  transition: transform 0.24s ease;
}

.slide-sidebar-enter-from,
.slide-sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
