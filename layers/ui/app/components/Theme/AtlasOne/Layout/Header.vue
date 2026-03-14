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
  <div class="atlas-header">
    <div class="atlas-header__left">
      <button type="button" class="atlas-header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>

      <div class="atlas-header__copy">
        <span class="atlas-header__eyebrow">Atlas Network</span>
        <h1 class="atlas-header__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="atlas-header__breadcrumbs">
          <NuxtLink
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            class="atlas-header__breadcrumb"
            :class="{ 'atlas-header__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="menuRef" class="atlas-header__right">
      <div class="atlas-header__chip">
        <span class="atlas-header__chip-dot" />
        Region prioritas: Jawa Barat
      </div>

      <div class="atlas-header__profile">
        <button type="button" class="atlas-header__profile-button" @click.stop="toggleMenu">
          <span class="atlas-header__profile-name">{{ displayName }}</span>
          <span class="atlas-header__profile-avatar">
            <img v-if="user?.avatar?.url" :src="user.avatar.url" :alt="displayName" class="atlas-header__profile-image">
            <NIcon v-else name="lucide:user-round" size="16px" />
          </span>
        </button>

        <div v-if="menuOpen" class="atlas-header__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="atlas-header__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="atlas-header__menu-item atlas-header__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.atlas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid #d7e4dd;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 40px rgba(70, 98, 90, 0.08);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.atlas-header__left,
.atlas-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.atlas-header__left {
  min-width: 0;
}

.atlas-header__right {
  flex-wrap: wrap;
  justify-content: flex-end;
}

.atlas-header__toggle {
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 14px;
  background: #eff6f2;
  color: #215c50;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.atlas-header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #4e8477;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.atlas-header__title {
  margin: 0;
  color: #1d352e;
  font-size: 24px;
}

.atlas-header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.atlas-header__breadcrumb {
  color: #709089;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
    color: #b0c4bd;
  }
}

.atlas-header__breadcrumb--active {
  color: #1d352e;
}

.atlas-header__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  background: #eff6f2;
  color: #35685d;
  font-size: 13px;
  font-weight: 600;
}

.atlas-header__chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #2fa277;
}

.atlas-header__profile {
  position: relative;
}

.atlas-header__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 4px 6px 4px 14px;
  border: 0;
  border-radius: 999px;
  background: #1d352e;
  color: #f9fbf7;
  cursor: pointer;
}

.atlas-header__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}

.atlas-header__profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.atlas-header__profile-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.atlas-header__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(70, 98, 90, 0.16);
}

.atlas-header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #215c50;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #eff6f2;
  }
}

.atlas-header__menu-item--danger {
  color: #b35540;
}
</style>
