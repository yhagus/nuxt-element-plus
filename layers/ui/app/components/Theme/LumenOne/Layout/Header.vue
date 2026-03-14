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
  <div class="lumen-header">
    <div class="lumen-header__left">
      <button type="button" class="lumen-header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>
      <div>
        <span class="lumen-header__eyebrow">Lumen Cloud</span>
        <h1 class="lumen-header__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="lumen-header__breadcrumbs">
          <NuxtLink
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            class="lumen-header__breadcrumb"
            :class="{ 'lumen-header__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="menuRef" class="lumen-header__right">
      <div class="lumen-header__search">
        Cari project, customer, atau report
      </div>
      <div class="lumen-header__profile">
        <button type="button" class="lumen-header__profile-button" @click.stop="toggleMenu">
          <span class="lumen-header__profile-name">{{ displayName }}</span>
          <span class="lumen-header__profile-avatar">
            <img v-if="user?.avatar?.url" :src="user.avatar.url" :alt="displayName" class="lumen-header__profile-image">
            <NIcon v-else name="lucide:user-round" size="16px" />
          </span>
        </button>

        <div v-if="menuOpen" class="lumen-header__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="lumen-header__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="lumen-header__menu-item lumen-header__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lumen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid #dbe7f6;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 18px 40px rgba(92, 121, 164, 0.08);
  backdrop-filter: blur(12px);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.lumen-header__left,
.lumen-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lumen-header__right {
  flex-wrap: wrap;
  justify-content: flex-end;
}

.lumen-header__toggle {
  width: 42px;
  height: 42px;
  border: 1px solid #dbe7f6;
  border-radius: 14px;
  background: #fff;
  color: #35507c;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.lumen-header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #7092c2;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.lumen-header__title {
  margin: 0;
  color: #2c4367;
  font-size: 24px;
}

.lumen-header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.lumen-header__breadcrumb {
  color: #8aa0bc;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
  }
}

.lumen-header__breadcrumb--active {
  color: #2c4367;
}

.lumen-header__search {
  min-height: 42px;
  padding: 10px 14px;
  border: 1px solid #dbe7f6;
  border-radius: 999px;
  color: #8aa0bc;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.74);
}

.lumen-header__profile {
  position: relative;
}

.lumen-header__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 4px 6px 4px 14px;
  border: 1px solid #dbe7f6;
  border-radius: 999px;
  background: #fff;
  color: #2c4367;
  cursor: pointer;
}

.lumen-header__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}

.lumen-header__profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #eef4fd;
}

.lumen-header__profile-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.lumen-header__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border: 1px solid #dbe7f6;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(92, 121, 164, 0.14);
}

.lumen-header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #2c4367;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #f3f7fd;
  }
}

.lumen-header__menu-item--danger {
  color: #c96e62;
}
</style>
