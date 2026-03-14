<script setup lang="ts">
defineProps<{
  isDesktop: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleSidebar'): void;
}>();

const { title } = useTitle();
const { breadcrumbs, activeBreadcrumb } = useBreadcrumbs();
const { user, logout } = useAuthStore();

const menuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const displayName = computed(() => {
  const fullName = [user.value?.first_name, user.value?.last_name].filter(Boolean).join(' ').trim();
  return fullName || user.value?.username || user.value?.email || 'Operator';
});

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null;
  if (!target || !menuRef.value) {
    return;
  }

  if (!menuRef.value.contains(target)) {
    closeMenu();
  }
}

async function handleLogout() {
  closeMenu();
  await logout();
  await navigateTo('/sign-in');
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<template>
  <ThemeSignalOneUiGlassPanel class="header-grid">
    <div class="header-grid__left">
      <button type="button" class="header-grid__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>

      <div class="header-grid__copy">
        <span class="header-grid__eyebrow">Signal Console</span>
        <h1 class="header-grid__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="header-grid__breadcrumbs">
          <NuxtLink
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            class="header-grid__breadcrumb"
            :class="{ 'header-grid__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="menuRef" class="header-grid__right">
      <ThemeSignalOneUiCommandChip label="Region" value="AP-SG-02" tone="neutral" />
      <ThemeSignalOneUiCommandChip label="Mode" value="Protected" tone="success" />

      <div class="header-grid__profile">
        <button type="button" class="header-grid__profile-button" @click.stop="toggleMenu">
          <span class="header-grid__avatar">
            <img v-if="user?.avatar?.url" :src="user.avatar.url" :alt="displayName" class="header-grid__avatar-image">
            <NIcon v-else name="lucide:user-round" size="16px" />
          </span>
          <span class="header-grid__profile-name">{{ displayName }}</span>
        </button>

        <div v-if="menuOpen" class="header-grid__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="header-grid__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="header-grid__menu-item header-grid__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </ThemeSignalOneUiGlassPanel>
</template>

<style scoped lang="scss">
.header-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.header-grid__left,
.header-grid__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-grid__left {
  min-width: 0;
}

.header-grid__right {
  flex-wrap: wrap;
  justify-content: flex-end;
}

.header-grid__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 14px;
  background: rgba(85, 149, 255, 0.14);
  color: #d7e6ff;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.header-grid__copy {
  min-width: 0;
}

.header-grid__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #78a8ff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.header-grid__title {
  margin: 0;
  color: #f4f8ff;
  font-size: 24px;
}

.header-grid__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.header-grid__breadcrumb {
  color: #89a4cf;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
    color: #486489;
  }
}

.header-grid__breadcrumb--active {
  color: #e7f0ff;
}

.header-grid__profile {
  position: relative;
}

.header-grid__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 4px 12px 4px 4px;
  border: 0;
  border-radius: 999px;
  background: rgba(85, 149, 255, 0.12);
  color: #e7f0ff;
  cursor: pointer;
}

.header-grid__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
}

.header-grid__avatar-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.header-grid__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}

.header-grid__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 18px;
  background: #0d1a2d;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
}

.header-grid__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #d7e6ff;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: rgba(85, 149, 255, 0.12);
  }
}

.header-grid__menu-item--danger {
  color: #ff9a8f;
}
</style>
