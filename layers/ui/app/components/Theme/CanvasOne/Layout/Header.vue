<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggleSidebar'): void;
}>();

const { title } = useTitle();
const { breadcrumbs, activeBreadcrumb } = useBreadcrumbs();
const { user, logout } = useAuthStore();

const menuRef = ref<HTMLElement | null>(null);
const menuOpen = ref(false);

const displayName = computed(() => {
  const fullName = [user.value?.first_name, user.value?.last_name].filter(Boolean).join(' ').trim();
  return fullName || user.value?.username || user.value?.email || 'Editor';
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
  <div class="canvas-header">
    <div class="canvas-header__left">
      <button type="button" class="canvas-header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>

      <div>
        <span class="canvas-header__eyebrow">Canvas Studio</span>
        <h1 class="canvas-header__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="canvas-header__breadcrumbs">
          <NuxtLink
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            class="canvas-header__breadcrumb"
            :class="{ 'canvas-header__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="menuRef" class="canvas-header__right">
      <ThemeCanvasOneUiBadgePanel label="Moodboard" value="Aktif" tone="cobalt" />

      <div class="canvas-header__profile">
        <button type="button" class="canvas-header__profile-button" @click.stop="toggleMenu">
          <span class="canvas-header__profile-name">{{ displayName }}</span>
          <span class="canvas-header__profile-avatar">
            <img v-if="user?.avatar?.url" :src="user.avatar.url" :alt="displayName" class="canvas-header__profile-image">
            <NIcon v-else name="lucide:user-round" size="16px" />
          </span>
        </button>

        <div v-if="menuOpen" class="canvas-header__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="canvas-header__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="canvas-header__menu-item canvas-header__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.canvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border: 2px solid #2d221d;
  border-radius: 28px;
  background: #fffdf7;
  box-shadow: 8px 8px 0 #2d221d;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.canvas-header__left,
.canvas-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.canvas-header__right {
  flex-wrap: wrap;
  justify-content: flex-end;
}

.canvas-header__toggle {
  width: 42px;
  height: 42px;
  border: 2px solid #2d221d;
  border-radius: 14px;
  background: #fff1dd;
  color: #2d221d;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.canvas-header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #b24c4c;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.canvas-header__title {
  margin: 0;
  color: #2d221d;
  font-size: 24px;
}

.canvas-header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.canvas-header__breadcrumb {
  color: #7e695f;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
  }
}

.canvas-header__breadcrumb--active {
  color: #2d221d;
}

.canvas-header__profile {
  position: relative;
}

.canvas-header__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 4px 6px 4px 14px;
  border: 2px solid #2d221d;
  border-radius: 999px;
  background: #fff;
  color: #2d221d;
  cursor: pointer;
}

.canvas-header__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}

.canvas-header__profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #f3e8da;
}

.canvas-header__profile-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.canvas-header__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border: 2px solid #2d221d;
  border-radius: 18px;
  background: #fffdf7;
  box-shadow: 6px 6px 0 #2d221d;
}

.canvas-header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #2d221d;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #fff1dd;
  }
}

.canvas-header__menu-item--danger {
  color: #b24c4c;
}
</style>
