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
  return fullName || user.value?.username || user.value?.email || 'Executive';
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
  <div class="noctis-header">
    <div class="noctis-header__left">
      <button type="button" class="noctis-header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>
      <div>
        <span class="noctis-header__eyebrow">Noctis Collection</span>
        <h1 class="noctis-header__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="noctis-header__breadcrumbs">
          <NuxtLink
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            class="noctis-header__breadcrumb"
            :class="{ 'noctis-header__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="menuRef" class="noctis-header__right">
      <div class="noctis-header__pill">
        Private desk
      </div>
      <div class="noctis-header__profile">
        <button type="button" class="noctis-header__profile-button" @click.stop="toggleMenu">
          <span class="noctis-header__profile-name">{{ displayName }}</span>
          <span class="noctis-header__profile-avatar">
            <img v-if="user?.avatar?.url" :src="user.avatar.url" :alt="displayName" class="noctis-header__profile-image">
            <NIcon v-else name="lucide:user-round" size="16px" />
          </span>
        </button>

        <div v-if="menuOpen" class="noctis-header__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="noctis-header__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="noctis-header__menu-item noctis-header__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.noctis-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid rgba(214, 171, 84, 0.18);
  border-radius: 24px;
  background: rgba(24, 21, 35, 0.82);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(12px);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.noctis-header__left,
.noctis-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.noctis-header__right {
  flex-wrap: wrap;
  justify-content: flex-end;
}

.noctis-header__toggle {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(214, 171, 84, 0.18);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: #f7ead1;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.noctis-header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #c8b285;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.noctis-header__title {
  margin: 0;
  color: #faf3e6;
  font-size: 24px;
}

.noctis-header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.noctis-header__breadcrumb {
  color: #9f96b7;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
  }
}

.noctis-header__breadcrumb--active {
  color: #f7ead1;
}

.noctis-header__pill {
  min-height: 42px;
  padding: 10px 14px;
  border: 1px solid rgba(214, 171, 84, 0.18);
  border-radius: 999px;
  color: #d6ab54;
  font-size: 13px;
}

.noctis-header__profile {
  position: relative;
}

.noctis-header__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 4px 6px 4px 14px;
  border: 1px solid rgba(214, 171, 84, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: #faf3e6;
  cursor: pointer;
}

.noctis-header__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}

.noctis-header__profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(214, 171, 84, 0.16);
}

.noctis-header__profile-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.noctis-header__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border: 1px solid rgba(214, 171, 84, 0.18);
  border-radius: 18px;
  background: #181523;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

.noctis-header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #faf3e6;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: rgba(214, 171, 84, 0.1);
  }
}

.noctis-header__menu-item--danger {
  color: #e7a095;
}
</style>
