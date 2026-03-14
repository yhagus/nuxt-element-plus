<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleSidebar'): void }>();
const { title } = useTitle();
const { breadcrumbs, activeBreadcrumb } = useBreadcrumbs();
const { user, logout } = useAuthStore();
const menuRef = ref<HTMLElement | null>(null);
const menuOpen = ref(false);
const displayName = computed(() => user.value?.username || user.value?.email || 'Admin');

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null;
  if (target && menuRef.value && !menuRef.value.contains(target)) {
    closeMenu();
  }
}

async function handleLogout() {
  closeMenu();
  await logout();
  await navigateTo('/sign-in');
}
onMounted(() => document.addEventListener('click', handleDocumentClick));
onBeforeUnmount(() => document.removeEventListener('click', handleDocumentClick));
</script>

<template>
  <div class="header">
    <div class="header__left">
      <button type="button" class="header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>
      <div>
        <span class="header__eyebrow">Ember Desk</span>
        <h1 class="header__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="header__breadcrumbs">
          <NuxtLink v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path" :to="breadcrumb.path" class="header__breadcrumb" :class="{ 'header__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }">
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
    <div ref="menuRef" class="header__right">
      <div class="header__chip">
        Heatmap active
      </div>
      <div class="header__profile">
        <button type="button" class="header__profile-button" @click.stop="toggleMenu">
          <span class="header__profile-name">{{ displayName }}</span>
          <span class="header__profile-avatar">E</span>
        </button>
        <div v-if="menuOpen" class="header__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="header__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="header__menu-item header__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 18px 40px rgba(255, 127, 86, 0.12);
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}
.header__left,
.header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header__right {
  flex-wrap: wrap;
  justify-content: flex-end;
}
.header__toggle {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 170, 120, 0.32);
  border-radius: 14px;
  background: #fff;
  color: #b85a3d;
  cursor: pointer;
  @media (min-width: 1024px) {
    display: none;
  }
}
.header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #d87453;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.header__title {
  margin: 0;
  color: #5c3426;
  font-size: 24px;
}
.header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}
.header__breadcrumb {
  color: #a27d6b;
  font-size: 13px;
  text-decoration: none;
  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
  }
}
.header__breadcrumb--active {
  color: #5c3426;
}
.header__chip {
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff9d6a, #ff6b6b);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.header__profile {
  position: relative;
}
.header__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 4px 6px 4px 14px;
  border: 1px solid rgba(255, 170, 120, 0.32);
  border-radius: 999px;
  background: #fff;
  color: #5c3426;
  cursor: pointer;
}
.header__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}
.header__profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff9d6a, #ff6b6b);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}
.header__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(255, 127, 86, 0.18);
}
.header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #5c3426;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: #fff1e8;
  }
}
.header__menu-item--danger {
  color: #d26a61;
}
</style>
