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
  <div class="aurora-two-layout">
    <aside class="aurora-two-layout__sidebar" :style="{ width: `${sidebarWidth}px` }">
      <ThemeAuroraOneLayoutSidebar />
    </aside>

    <Transition name="aurora-two-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="aurora-two-layout__overlay"
        aria-label="Tutup navigasi"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="aurora-two-slide">
      <aside v-if="mobileSidebarOpen" class="aurora-two-layout__drawer">
        <ThemeAuroraOneLayoutSidebar />
      </aside>
    </Transition>

    <div class="aurora-two-layout__content" :style="{ paddingLeft: `${isDesktop ? sidebarWidth : 0}px` }">
      <header class="aurora-two-layout__header">
        <ThemeAuroraOneLayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="aurora-two-layout__main">
        <section class="aurora-two-layout__hero">
          <article class="aurora-two-layout__intro">
            <span class="aurora-two-layout__eyebrow">Aurora Two</span>
            <h1>Varian ringan untuk dashboard yang lebih presentasional</h1>
            <p>
              Cocok untuk shell halaman yang ingin tetap lembut secara visual, sambil membawa header dengan dropdown profil bawaan.
            </p>
          </article>

          <div class="aurora-two-layout__metrics">
            <ThemeAuroraOneUiHaloCard label="Session aktif" value="18.2k" tone="mint" />
            <ThemeAuroraOneUiHaloCard label="Konversi" value="5.8%" tone="violet" />
            <ThemeAuroraOneUiHaloCard label="Revenue" value="Rp 4.1 M" tone="gold" />
          </div>
        </section>

        <div class="aurora-two-layout__panel">
          <div class="aurora-two-layout__panel-head">
            <div>
              <span class="aurora-two-layout__eyebrow">Workspace</span>
              <h2>Kontainer halaman</h2>
            </div>
            <div class="aurora-two-layout__badges">
              <span>Soft glow</span>
              <span>Profile menu</span>
              <span>Responsive</span>
            </div>
          </div>

          <ThemeAuroraOneUiMistPanel title="Aurora Surface" description="Page content ditempatkan di dalam panel berkabut dengan jarak yang lebih luas.">
            <slot />
          </ThemeAuroraOneUiMistPanel>
        </div>
      </main>

      <ThemeAuroraOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.aurora-two-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(125, 255, 219, 0.16), transparent 24%),
    radial-gradient(circle at top right, rgba(177, 121, 255, 0.16), transparent 22%),
    linear-gradient(180deg, #f7fbff 0%, #eef2ff 100%);
}

.aurora-two-layout__sidebar {
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

.aurora-two-layout__drawer {
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

.aurora-two-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(63, 82, 122, 0.22);
  backdrop-filter: blur(4px);
}

.aurora-two-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 18px 18px 0;
}

.aurora-two-layout__main {
  padding: 18px 18px 32px;
}

.aurora-two-layout__hero,
.aurora-two-layout__panel {
  border: 1px solid rgba(214, 221, 255, 0.9);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 24px 60px rgba(117, 124, 196, 0.12);
}

.aurora-two-layout__hero {
  padding: 24px;
  margin-bottom: 18px;
}

.aurora-two-layout__intro {
  margin-bottom: 18px;

  h1 {
    max-width: 760px;
    margin: 8px 0 12px;
    color: #232e53;
    font-size: 34px;
    line-height: 1.06;
  }

  p {
    max-width: 720px;
    margin: 0;
    color: #5e678d;
    line-height: 1.8;
  }
}

.aurora-two-layout__eyebrow {
  color: #727dc0;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.aurora-two-layout__metrics {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.aurora-two-layout__panel {
  padding: 24px;
}

.aurora-two-layout__panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  h2 {
    margin: 8px 0 0;
    color: #232e53;
    font-size: 24px;
  }
}

.aurora-two-layout__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  span {
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(114, 125, 192, 0.12);
    color: #4d5682;
    font-size: 12px;
    font-weight: 700;
  }
}

.aurora-two-fade-enter-active,
.aurora-two-fade-leave-active {
  transition: opacity 0.2s ease;
}

.aurora-two-fade-enter-from,
.aurora-two-fade-leave-to {
  opacity: 0;
}

.aurora-two-slide-enter-active,
.aurora-two-slide-leave-active {
  transition: transform 0.22s ease;
}

.aurora-two-slide-enter-from,
.aurora-two-slide-leave-to {
  transform: translateX(-100%);
}
</style>
