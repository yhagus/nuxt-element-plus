<script setup lang="ts">
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const sidebarWidth = 320;

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
  <div class="atlas-two-layout">
    <aside class="atlas-two-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeAtlasOneLayoutSidebar />
    </aside>

    <Transition name="atlas-two-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="atlas-two-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="atlas-two-slide">
      <aside v-if="mobileSidebarOpen" class="atlas-two-layout__drawer">
        <ThemeAtlasOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="atlas-two-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="atlas-two-layout__header">
        <ThemeAtlasOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="atlas-two-layout__main">
        <section class="atlas-two-layout__overview">
          <article class="atlas-two-layout__summary atlas-two-layout__summary--feature">
            <span class="atlas-two-layout__eyebrow">Atlas Two</span>
            <h1>Workspace untuk monitoring wilayah dan distribusi</h1>
            <p>
              Varian ini mempertahankan header Atlas dengan dropdown akun dan membungkus halaman di surface yang lebih editorial.
            </p>
          </article>
          <article class="atlas-two-layout__summary">
            <strong>284</strong>
            <span>Node aktif</span>
          </article>
          <article class="atlas-two-layout__summary">
            <strong>17</strong>
            <span>Hub membutuhkan tindakan</span>
          </article>
        </section>

        <div class="atlas-two-layout__frame">
          <div class="atlas-two-layout__frame-head">
            <div>
              <span class="atlas-two-layout__eyebrow">Map Desk</span>
              <h2>Area kerja utama</h2>
            </div>
            <div class="atlas-two-layout__chips">
              <span>Regions</span>
              <span>Fleet</span>
              <span>Hubs</span>
            </div>
          </div>
          <div class="atlas-two-layout__slot">
            <slot />
          </div>
        </div>
      </main>

      <ThemeAtlasOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.atlas-two-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(47, 162, 119, 0.16), transparent 24%),
    linear-gradient(180deg, #f4fbf6 0%, #eef5f1 100%);
}

.atlas-two-layout__sidebar {
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

.atlas-two-layout__drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 320px;
  height: 100vh;

  @media (min-width: 1024px) {
    display: none;
  }
}

.atlas-two-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(12, 32, 28, 0.3);
  backdrop-filter: blur(4px);
}

.atlas-two-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 18px 18px 0;
}

.atlas-two-layout__main {
  padding: 18px 18px 32px;
}

.atlas-two-layout__overview {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.6fr) repeat(2, minmax(0, 1fr));
  }
}

.atlas-two-layout__summary,
.atlas-two-layout__frame {
  border: 1px solid rgba(208, 225, 217, 0.94);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 20px 60px rgba(61, 101, 90, 0.1);
}

.atlas-two-layout__summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  min-height: 160px;
  padding: 24px;

  strong {
    color: #173732;
    font-size: 38px;
    line-height: 1;
  }

  span:last-child {
    color: #66827b;
    font-size: 14px;
  }
}

.atlas-two-layout__summary--feature {
  h1 {
    margin: 8px 0 12px;
    color: #173732;
    font-size: 34px;
    line-height: 1.04;
  }

  p {
    max-width: 720px;
    margin: 0;
    color: #5d7a72;
    line-height: 1.8;
  }
}

.atlas-two-layout__eyebrow {
  color: #5a8476;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.atlas-two-layout__frame {
  padding: 24px;
}

.atlas-two-layout__frame-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;

  h2 {
    margin: 8px 0 0;
    color: #173732;
    font-size: 24px;
  }
}

.atlas-two-layout__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  span {
    padding: 8px 12px;
    border-radius: 999px;
    background: #edf5f0;
    color: #285248;
    font-size: 12px;
    font-weight: 700;
  }
}

.atlas-two-layout__slot {
  min-height: 420px;
}

.atlas-two-fade-enter-active,
.atlas-two-fade-leave-active {
  transition: opacity 0.2s ease;
}

.atlas-two-fade-enter-from,
.atlas-two-fade-leave-to {
  opacity: 0;
}

.atlas-two-slide-enter-active,
.atlas-two-slide-leave-active {
  transition: transform 0.22s ease;
}

.atlas-two-slide-enter-from,
.atlas-two-slide-leave-to {
  transform: translateX(-100%);
}
</style>
