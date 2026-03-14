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
        <span class="header__eyebrow">Mono Desk</span>
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
        Monochrome mode
      </div>
      <div class="header__profile">
        <button type="button" class="header__profile-button" @click.stop="toggleMenu">
          <span class="header__profile-name">{{ displayName }}</span>
          <span class="header__profile-avatar">M</span>
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
  border: 2px solid #111;
  background: #fff;
  box-shadow: 8px 8px 0 #111;
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
  border: 2px solid #111;
  background: #fff;
  cursor: pointer;
  @media (min-width: 1024px) {
    display: none;
  }
}
.header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #555;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.header__title {
  margin: 0;
  color: #111;
  font-size: 24px;
}
.header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}
.header__breadcrumb {
  color: #666;
  font-size: 13px;
  text-decoration: none;
  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
  }
}
.header__breadcrumb--active {
  color: #111;
}
.header__chip {
  min-height: 42px;
  padding: 10px 14px;
  border: 2px solid #111;
  background: #fff;
  color: #111;
  font-size: 13px;
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
  border: 2px solid #111;
  background: #fff;
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
  border: 2px solid #111;
  background: #111;
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
  border: 2px solid #111;
  background: #fff;
  box-shadow: 6px 6px 0 #111;
}
.header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  background: transparent;
  color: #111;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
.header__menu-item--danger {
  color: #b94b4b;
}
</style>
