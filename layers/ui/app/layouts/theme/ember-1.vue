<script setup lang="ts">
const route = useRoute();
const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 294;
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
function closeMobileSidebar() {
  mobileSidebarOpen.value = false;
}
watch(() => route.fullPath, closeMobileSidebar);
onMounted(() => {
  syncViewport();
  window.addEventListener('resize', syncViewport);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', syncViewport);
});
</script>

<template>
  <div class="ember-layout">
    <aside class="ember-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeEmberOneLayoutSidebar />
    </aside>
    <Transition name="ember-fade">
      <button v-if="mobileSidebarOpen" type="button" class="ember-layout__overlay" aria-label="Tutup navigasi" @click="closeMobileSidebar" />
    </Transition>
    <Transition name="ember-slide">
      <aside v-if="mobileSidebarOpen" class="ember-layout__drawer">
        <ThemeEmberOneLayoutSidebar />
      </aside>
    </Transition>
    <div class="ember-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="ember-layout__header">
        <ThemeEmberOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>
      <main class="ember-layout__main">
        <div class="ember-layout__stats">
          <ThemeEmberOneUiFlareCard label="Sales" value="Rp 4.6 M" />
          <ThemeEmberOneUiFlareCard label="Visits" value="18.3k" />
          <ThemeEmberOneUiFlareCard label="Leads" value="284" />
        </div>
        <ThemeEmberOneUiAshPanel title="Ember Workspace" description="Tema hangat dengan aksen oranye-merah untuk dashboard komersial.">
          <slot />
        </ThemeEmberOneUiAshPanel>
      </main>
      <ThemeEmberOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ember-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 153, 102, 0.14), transparent 24%),
    radial-gradient(circle at top right, rgba(255, 95, 95, 0.12), transparent 22%),
    linear-gradient(180deg, #fff7ef 0%, #fff3ea 100%);
}
.ember-layout__sidebar {
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
.ember-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 294px;
  height: 100vh;
  @media (min-width: 1024px) {
    display: none;
  }
}
.ember-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(88, 41, 24, 0.22);
  backdrop-filter: blur(4px);
}
.ember-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 16px 0;
}
.ember-layout__main {
  padding: 16px 16px 30px;
}
.ember-layout__stats {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.ember-fade-enter-active,
.ember-fade-leave-active {
  transition: opacity 0.2s ease;
}
.ember-fade-enter-from,
.ember-fade-leave-to {
  opacity: 0;
}
.ember-slide-enter-active,
.ember-slide-leave-active {
  transition: transform 0.22s ease;
}
.ember-slide-enter-from,
.ember-slide-leave-to {
  transform: translateX(-100%);
}
</style>
