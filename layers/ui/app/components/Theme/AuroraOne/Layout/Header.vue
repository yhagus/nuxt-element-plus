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
        <span class="header__eyebrow">Aurora Flow</span>
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
        Soft glow online
      </div>
      <div class="header__profile">
        <button type="button" class="header__profile-button" @click.stop="toggleMenu">
          <span class="header__profile-name">{{ displayName }}</span>
          <span class="header__profile-avatar">A</span>
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
  border: 1px solid rgba(163, 194, 255, 0.26);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 18px 44px rgba(109, 150, 255, 0.08);
  backdrop-filter: blur(16px);
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
  border: 1px solid rgba(163, 194, 255, 0.26);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.7);
  color: #4f72b5;
  cursor: pointer;
  @media (min-width: 1024px) {
    display: none;
  }
}
.header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #7aa0cf;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.header__title {
  margin: 0;
  color: #2f486b;
  font-size: 24px;
}
.header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}
.header__breadcrumb {
  color: #8ba0c0;
  font-size: 13px;
  text-decoration: none;
  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
  }
}
.header__breadcrumb--active {
  color: #2f486b;
}
.header__chip {
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(125, 255, 219, 0.3), rgba(177, 121, 255, 0.22));
  color: #3f5788;
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
  border: 1px solid rgba(163, 194, 255, 0.26);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  color: #2f486b;
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
  background: linear-gradient(135deg, #8affdd, #aa8cff);
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
  box-shadow: 0 18px 40px rgba(109, 150, 255, 0.14);
}
.header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #2f486b;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: #f4f8ff;
  }
}
.header__menu-item--danger {
  color: #c06b73;
}
</style>
