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
  <div class="grid-header">
    <div class="grid-header__left">
      <button type="button" class="grid-header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>
      <div>
        <span class="grid-header__eyebrow">Grid Terminal</span>
        <h1 class="grid-header__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="grid-header__breadcrumbs">
          <NuxtLink
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            class="grid-header__breadcrumb"
            :class="{ 'grid-header__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="menuRef" class="grid-header__right">
      <div class="grid-header__command">
        watch --live metrics
      </div>
      <div class="grid-header__profile">
        <button type="button" class="grid-header__profile-button" @click.stop="toggleMenu">
          <span class="grid-header__profile-name">{{ displayName }}</span>
          <span class="grid-header__profile-avatar">
            <img v-if="user?.avatar?.url" :src="user.avatar.url" :alt="displayName" class="grid-header__profile-image">
            <NIcon v-else name="lucide:user-round" size="16px" />
          </span>
        </button>

        <div v-if="menuOpen" class="grid-header__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="grid-header__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="grid-header__menu-item grid-header__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid rgba(43, 255, 146, 0.16);
  border-radius: 16px;
  background: rgba(8, 17, 14, 0.92);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.grid-header__left,
.grid-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.grid-header__right {
  flex-wrap: wrap;
  justify-content: flex-end;
}

.grid-header__toggle {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(43, 255, 146, 0.16);
  border-radius: 12px;
  background: rgba(43, 255, 146, 0.04);
  color: #71ffba;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.grid-header__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #6effb8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.grid-header__title {
  margin: 0;
  color: #dcffe9;
  font-size: 24px;
}

.grid-header__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.grid-header__breadcrumb {
  color: #7bcba0;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
  }
}

.grid-header__breadcrumb--active {
  color: #dcffe9;
}

.grid-header__command {
  min-height: 40px;
  padding: 10px 14px;
  border: 1px solid rgba(43, 255, 146, 0.16);
  border-radius: 999px;
  color: #71ffba;
  font-size: 13px;
  font-family: monospace;
}

.grid-header__profile {
  position: relative;
}

.grid-header__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 4px 6px 4px 14px;
  border: 1px solid rgba(43, 255, 146, 0.16);
  border-radius: 999px;
  background: rgba(43, 255, 146, 0.04);
  color: #dcffe9;
  cursor: pointer;
}

.grid-header__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}

.grid-header__profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(43, 255, 146, 0.14);
}

.grid-header__profile-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.grid-header__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border: 1px solid rgba(43, 255, 146, 0.16);
  border-radius: 16px;
  background: #08110e;
}

.grid-header__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #dcffe9;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: rgba(43, 255, 146, 0.08);
  }
}

.grid-header__menu-item--danger {
  color: #ff9b9b;
}
</style>
