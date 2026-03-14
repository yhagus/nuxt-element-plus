<script setup lang="ts">
const props = defineProps<{
  isCollapse: boolean;
  isDesktop: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleSidebar'): void;
}>();

const { title } = useTitle();
const { breadcrumbs, activeBreadcrumb } = useBreadcrumbs();
const { user, logout } = useAuthStore();

const actionsRef = ref<HTMLElement | null>(null);
const profileOpen = ref(false);

const displayName = computed(() => {
  const fullName = [user.value?.first_name, user.value?.last_name].filter(Boolean).join(' ').trim();
  return fullName || user.value?.username || user.value?.email || 'Admin';
});

const roleLabel = computed(() => user.value?.type || 'Administrator');

const initials = computed(() => {
  const words = displayName.value.split(' ').filter(Boolean);
  if (!words.length) {
    return 'AD';
  }

  return words.slice(0, 2).map(word => word[0]?.toUpperCase() ?? '').join('');
});

function toggleProfile() {
  profileOpen.value = !profileOpen.value;
}

function closeMenus() {
  profileOpen.value = false;
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null;
  if (!target || !actionsRef.value) {
    return;
  }

  if (!actionsRef.value.contains(target)) {
    closeMenus();
  }
}

async function handleLogout() {
  closeMenus();
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
  <div class="header-shell">
    <div class="header-shell__content">
      <div class="header-shell__leading">
        <button type="button" class="header-shell__toggle" @click="emit('toggleSidebar')">
          <NIcon
            :name="props.isDesktop && !props.isCollapse ? 'lucide:panel-left-close' : 'lucide:panel-left-open'"
            size="18px"
          />
        </button>

        <div class="header-shell__title-group">
          <span class="header-shell__eyebrow">Workspace</span>
          <h1 class="header-shell__title">
            {{ title || 'Dashboard' }}
          </h1>
          <nav v-if="breadcrumbs.length" class="header-shell__breadcrumbs" aria-label="Breadcrumb">
            <NuxtLink
              v-for="breadcrumb in breadcrumbs"
              :key="breadcrumb.path"
              :to="breadcrumb.path"
              class="header-shell__breadcrumb"
              :class="{ 'header-shell__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
            >
              {{ breadcrumb.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>

      <div ref="actionsRef" class="header-shell__actions">
        <div class="header-shell__command">
          <NIcon name="lucide:search" size="16px" />
          <span>Cari halaman, laporan, atau menu</span>
          <kbd class="header-shell__shortcut">/</kbd>
        </div>

        <div class="header-shell__profile">
          <button type="button" class="header-shell__profile-button" @click.stop="toggleProfile">
            <span class="header-shell__profile-copy">
              <span class="header-shell__profile-name">{{ displayName }}</span>
              <span class="header-shell__profile-role">{{ roleLabel }}</span>
            </span>
            <span class="header-shell__avatar">
              <img
                v-if="user?.avatar?.url"
                :src="user.avatar.url"
                :alt="displayName"
                class="header-shell__avatar-image"
              >
              <span v-else>{{ initials }}</span>
            </span>
          </button>

          <div v-if="profileOpen" class="header-shell__menu" @click.stop>
            <NuxtLink to="/settings/profile" class="header-shell__menu-item">
              Profil
            </NuxtLink>
            <button type="button" class="header-shell__menu-item header-shell__menu-item--danger" @click="handleLogout">
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-shell {
  padding: 1px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.55));
  box-shadow: 0 24px 60px rgba(97, 76, 57, 0.08);
}

.header-shell__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid rgba(145, 107, 71, 0.1);
  border-radius: 23px;
  background: rgba(255, 251, 245, 0.86);
  backdrop-filter: blur(16px);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.header-shell__leading {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.header-shell__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 14px;
  background: #fffaf3;
  color: #4f3424;
  box-shadow: inset 0 0 0 1px rgba(145, 107, 71, 0.12);
  cursor: pointer;
}

.header-shell__title-group {
  min-width: 0;
}

.header-shell__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9a7155;
}

.header-shell__title {
  margin: 0;
  font-size: 24px;
  line-height: 1.15;
  color: #2a1d16;
}

.header-shell__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin-top: 6px;
}

.header-shell__breadcrumb {
  position: relative;
  font-size: 13px;
  color: #8c745f;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 10px;
    color: #c6b19e;
  }
}

.header-shell__breadcrumb--active {
  color: #4f3424;
}

.header-shell__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 767px) {
    justify-content: space-between;
  }
}

.header-shell__command {
  display: none;
  align-items: center;
  gap: 10px;
  min-width: 300px;
  padding: 0 14px;
  height: 44px;
  border-radius: 16px;
  background: rgba(248, 239, 227, 0.95);
  color: #8c745f;
  box-shadow: inset 0 0 0 1px rgba(145, 107, 71, 0.12);

  @media (min-width: 900px) {
    display: inline-flex;
  }
}

.header-shell__shortcut {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 999px;
  background: #fff;
  color: #6b4e3b;
  font-size: 12px;
  font-family: inherit;
}

.header-shell__profile {
  position: relative;
}

.header-shell__profile-button {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 0;
  border-radius: 18px;
  background: #fff7ed;
  padding: 6px 6px 6px 14px;
  box-shadow: inset 0 0 0 1px rgba(145, 107, 71, 0.12);
  cursor: pointer;
}

.header-shell__profile-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 0;

  @media (max-width: 575px) {
    display: none;
  }
}

.header-shell__profile-name {
  font-size: 14px;
  font-weight: 700;
  color: #2a1d16;
}

.header-shell__profile-role {
  font-size: 12px;
  color: #8c745f;
}

.header-shell__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: linear-gradient(135deg, #c06d3f, #7e5038);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.header-shell__avatar-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.header-shell__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 18px;
  background: #fffdf9;
  box-shadow: 0 18px 40px rgba(87, 62, 41, 0.14);
}

.header-shell__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #3e2b1e;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #f8efe3;
  }
}

.header-shell__menu-item--danger {
  color: #a64b35;
}
</style>
