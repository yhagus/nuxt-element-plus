<script setup lang="ts">
const collapseState = useState<boolean>('theme-modern-3-sidebar-collapsed', () => false);
const route = useRoute();

const DESKTOP_BREAKPOINT = 1024;
const expandedWidth = 288;
const collapsedWidth = 76;

const isDesktop = ref(false);
const isCollapse = ref(false);
const mobileSidebarOpen = ref(false);

const sidebarWidth = computed(() => {
  if (!isDesktop.value) {
    return 0;
  }

  return isCollapse.value ? collapsedWidth : expandedWidth;
});

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

watch(isCollapse, value => collapseState.value = value, { immediate: true });
watch(collapseState, value => isCollapse.value = Boolean(value), { immediate: true });

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
  <div class="modern-three-layout">
    <aside class="modern-three-layout__sidebar modern-three-layout__sidebar--desktop" :style="{ width: `${sidebarWidth}px` }">
      <ThemeModern2LayoutSidebar :is-collapse="isCollapse" />
    </aside>

    <Transition name="modern-three-fade">
      <button
        v-if="mobileSidebarOpen"
        type="button"
        class="modern-three-layout__overlay"
        aria-label="Tutup sidebar"
        @click="closeMobileSidebar"
      />
    </Transition>

    <Transition name="modern-three-slide">
      <aside v-if="mobileSidebarOpen" class="modern-three-layout__sidebar modern-three-layout__sidebar--mobile">
        <ThemeModern2LayoutSidebar :is-collapse="false" />
      </aside>
    </Transition>

    <div class="modern-three-layout__content" :style="{ paddingLeft: `${sidebarWidth}px` }">
      <header class="modern-three-layout__header">
        <button
          type="button"
          class="modern-three-layout__collapse-toggle"
          @click="toggleSidebar"
        >
          <NIcon v-if="isCollapse" name="solar:alt-arrow-right-outline" size="1.25em" />
          <NIcon v-else name="solar:alt-arrow-left-outline" size="1.25em" />
        </button>
        <ThemeModern2LayoutHeader @toggle-sidebar="toggleSidebar" />
      </header>

      <main class="modern-three-layout__main">
        <section class="modern-three-layout__hero">
          <article class="modern-three-layout__hero-card modern-three-layout__hero-card--wide">
            <span class="modern-three-layout__eyebrow">Modern Three</span>
            <h2 class="modern-three-layout__title">
              Shell example with recursive menu and profile actions
            </h2>
            <p class="modern-three-layout__description">
              Varian ini memakai sidebar bertingkat dari `modern-2` dan dropdown profil bawaan untuk contoh layout admin yang lebih kaya.
            </p>
            <div class="modern-three-layout__tags">
              <span>Recursive submenu</span>
              <span>Profile dropdown</span>
              <span>Responsive drawer</span>
            </div>
          </article>

          <article class="modern-three-layout__hero-card">
            <span class="modern-three-layout__metric-label">Pending review</span>
            <strong class="modern-three-layout__metric-value">28</strong>
            <span class="modern-three-layout__metric-delta">+6 dari kemarin</span>
          </article>

          <article class="modern-three-layout__hero-card">
            <span class="modern-three-layout__metric-label">SLA sehat</span>
            <strong class="modern-three-layout__metric-value">97.4%</strong>
            <span class="modern-three-layout__metric-delta">Target terlampaui</span>
          </article>
        </section>

        <section class="modern-three-layout__workspace">
          <div class="modern-three-layout__panel">
            <div class="modern-three-layout__panel-heading">
              <div>
                <span class="modern-three-layout__panel-eyebrow">Workspace</span>
                <h3>Konten utama</h3>
              </div>
              <div class="modern-three-layout__panel-actions">
                <button type="button">
                  Ekspor
                </button>
                <button type="button">
                  Filter
                </button>
              </div>
            </div>
            <div class="modern-three-layout__slot">
              <slot />
            </div>
          </div>

          <aside class="modern-three-layout__rail">
            <div class="modern-three-layout__note">
              <span class="modern-three-layout__panel-eyebrow">Checklist</span>
              <ul>
                <li>Dropdown profil dengan logout tersedia di header.</li>
                <li>Sidebar mendukung submenu bertingkat secara rekursif.</li>
                <li>State collapse dipisah dari `modern-2`.</li>
              </ul>
            </div>

            <div class="modern-three-layout__note">
              <span class="modern-three-layout__panel-eyebrow">Queue</span>
              <div class="modern-three-layout__queue-item">
                <strong>Validasi katalog</strong>
                <span>12 item menunggu approval</span>
              </div>
              <div class="modern-three-layout__queue-item">
                <strong>Sync cabang</strong>
                <span>Berjalan 4 dari 9 region</span>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <ThemeModern2LayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modern-three-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(73, 112, 255, 0.12), transparent 24%),
    linear-gradient(180deg, #eef3fb 0%, #f7f9fc 100%);
}

.modern-three-layout__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  height: 100vh;
}

.modern-three-layout__sidebar--desktop {
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
}

.modern-three-layout__sidebar--mobile {
  width: 288px;

  @media (min-width: 1024px) {
    display: none;
  }
}

.modern-three-layout__overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: 0;
  background: rgba(12, 18, 32, 0.44);
  backdrop-filter: blur(4px);
}

.modern-three-layout__content {
  min-height: 100vh;
  transition: padding-left 0.24s ease;
}

.modern-three-layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 18px 18px 0;
}

.modern-three-layout__collapse-toggle {
  position: absolute;
  top: 46px;
  left: -12px;
  z-index: 20;
  display: none;
  width: 28px;
  height: 28px;
  border: 1px solid #d7ddec;
  border-radius: 999px;
  background: #fff;
  color: #21324f;
  box-shadow: 0 14px 30px rgba(33, 50, 79, 0.12);
  cursor: pointer;

  @media (min-width: 1024px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

.modern-three-layout__main {
  padding: 18px 18px 30px;
}

.modern-three-layout__hero {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.8fr) repeat(2, minmax(0, 1fr));
  }
}

.modern-three-layout__hero-card,
.modern-three-layout__panel,
.modern-three-layout__note {
  border: 1px solid rgba(205, 215, 232, 0.9);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 48px rgba(45, 65, 102, 0.08);
}

.modern-three-layout__hero-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px;
}

.modern-three-layout__hero-card--wide {
  justify-content: center;
}

.modern-three-layout__eyebrow,
.modern-three-layout__panel-eyebrow {
  color: #64748b;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.modern-three-layout__title {
  margin: 0;
  color: #0f172a;
  font-size: 28px;
  line-height: 1.1;
}

.modern-three-layout__description {
  margin: 0;
  color: #536277;
  font-size: 14px;
  line-height: 1.7;
}

.modern-three-layout__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  span {
    padding: 8px 12px;
    border-radius: 999px;
    background: #e9eef9;
    color: #334155;
    font-size: 12px;
    font-weight: 700;
  }
}

.modern-three-layout__metric-label,
.modern-three-layout__metric-delta {
  color: #64748b;
  font-size: 13px;
}

.modern-three-layout__metric-value {
  color: #0f172a;
  font-size: 34px;
  line-height: 1;
}

.modern-three-layout__workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;

  @media (min-width: 1200px) {
    grid-template-columns: minmax(0, 1fr) 320px;
  }
}

.modern-three-layout__panel {
  padding: 22px;
}

.modern-three-layout__panel-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  h3 {
    margin: 6px 0 0;
    color: #0f172a;
    font-size: 22px;
  }
}

.modern-three-layout__panel-actions {
  display: flex;
  gap: 10px;

  button {
    padding: 10px 14px;
    border: 1px solid #d6deee;
    border-radius: 12px;
    background: #fff;
    color: #334155;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }
}

.modern-three-layout__slot {
  min-height: 360px;
}

.modern-three-layout__rail {
  display: grid;
  gap: 16px;
  align-content: start;
}

.modern-three-layout__note {
  padding: 20px;

  ul {
    margin: 14px 0 0;
    padding-left: 18px;
    color: #475569;
    line-height: 1.7;
  }
}

.modern-three-layout__queue-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 0;
  color: #475569;

  strong {
    color: #0f172a;
  }

  & + & {
    border-top: 1px solid #e2e8f0;
  }
}

.modern-three-fade-enter-active,
.modern-three-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modern-three-fade-enter-from,
.modern-three-fade-leave-to {
  opacity: 0;
}

.modern-three-slide-enter-active,
.modern-three-slide-leave-active {
  transition: transform 0.22s ease;
}

.modern-three-slide-enter-from,
.modern-three-slide-leave-to {
  transform: translateX(-100%);
}
</style>
