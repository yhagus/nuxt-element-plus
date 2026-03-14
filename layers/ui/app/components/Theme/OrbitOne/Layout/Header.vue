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
  return fullName || user.value?.username || user.value?.email || 'Admin';
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
  <div class="orbit-header">
    <div class="orbit-header__left">
      <button type="button" class="orbit-header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>
      <div class="orbit-header__copy">
        <span class="orbit-header__eyebrow">Orbit Enterprise</span>
        <h1 class="orbit-header__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="orbit-header__breadcrumbs">
          <NuxtLink
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            class="orbit-header__breadcrumb"
            :class="{ 'orbit-header__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="menuRef" class="orbit-header__right">
      <div class="orbit-header__search">
        Cari laporan atau modul
      </div>
      <div class="orbit-header__profile">
        <button type="button" class="orbit-header__profile-button" @click.stop="toggleMenu">
          <span class="orbit-header__profile-name">{{ displayName }}</span>
          <span class="orbit-header__profile-avatar">
            <img v-if="user?.avatar?.url" :src="user.avatar.url" :alt="displayName" class="orbit-header__profile-image">
            <NIcon v-else name="lucide:user-round" size="16px" />
          </span>
        </button>

        <div v-if="menuOpen" class="orbit-header__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="orbit-header__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="orbit-header__menu-item orbit-header__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.orbit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid #d8e0ea;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.orbit-header__left,
.orbit-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.orbit-header__right {
  flex-wrap: wrap;
  justify-content: flex-end;
}

.orbit-header__toggle {
  width: 42px;
  height: 42px;
  border: 1px solid #d8e0ea;
  border-radius: 12px;
  background: #fff;
  color: #1f3347;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.orbit-header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #6a7f95;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.orbit-header__title {
  margin: 0;
  color: #1f3347;
  font-size: 24px;
}

.orbit-header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.orbit-header__breadcrumb {
  color: #7d8ea0;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
  }
}

.orbit-header__breadcrumb--active {
  color: #1f3347;
}

.orbit-header__search {
  min-height: 42px;
  min-width: 240px;
  padding: 10px 14px;
  border: 1px solid #d8e0ea;
  border-radius: 999px;
  color: #8b99a8;
  font-size: 13px;
}

.orbit-header__profile {
  position: relative;
}

.orbit-header__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 4px 6px 4px 14px;
  border: 1px solid #d8e0ea;
  border-radius: 999px;
  background: #fff;
  color: #1f3347;
  cursor: pointer;
}

.orbit-header__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}

.orbit-header__profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #eef2f7;
}

.orbit-header__profile-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.orbit-header__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border: 1px solid #d8e0ea;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(31, 51, 71, 0.12);
}

.orbit-header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #1f3347;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #f4f7fb;
  }
}

.orbit-header__menu-item--danger {
  color: #b75648;
}
</style>
