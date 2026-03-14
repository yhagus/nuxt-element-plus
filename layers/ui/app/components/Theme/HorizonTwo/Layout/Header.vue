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
  <div class="header-frame">
    <div class="header-frame__left">
      <button type="button" class="header-frame__toggle" @click="emit('toggleSidebar')">
        <NIcon
          :name="props.isDesktop && !props.isCollapse ? 'lucide:panel-left-close' : 'lucide:panel-left-open'"
          size="18px"
        />
      </button>

      <div class="header-frame__copy">
        <span class="header-frame__eyebrow">Editorial Theme</span>
        <h1 class="header-frame__title">
          {{ title || 'Dashboard' }}
        </h1>
        <nav v-if="breadcrumbs.length" class="header-frame__breadcrumbs">
          <NuxtLink
            v-for="breadcrumb in breadcrumbs"
            :key="breadcrumb.path"
            :to="breadcrumb.path"
            class="header-frame__breadcrumb"
            :class="{ 'header-frame__breadcrumb--active': breadcrumb.path === activeBreadcrumb?.path }"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="menuRef" class="header-frame__right">
      <div class="header-frame__chip">
        <span class="header-frame__chip-dot" />
        Sinkron 2 menit lalu
      </div>
      <div class="header-frame__chip">
        Periode: 30 hari
      </div>

      <div class="header-frame__profile">
        <button type="button" class="header-frame__profile-button" @click.stop="toggleMenu">
          <span class="header-frame__profile-name">{{ displayName }}</span>
          <span class="header-frame__profile-avatar">
            <img v-if="user?.avatar?.url" :src="user.avatar.url" :alt="displayName" class="header-frame__profile-image">
            <NIcon v-else name="lucide:user-round" size="16px" />
          </span>
        </button>

        <div v-if="menuOpen" class="header-frame__menu" @click.stop>
          <NuxtLink to="/settings/profile" class="header-frame__menu-item">
            Profil
          </NuxtLink>
          <button type="button" class="header-frame__menu-item header-frame__menu-item--danger" @click="handleLogout">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-frame {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 26px;
  background: rgba(255, 252, 246, 0.88);
  box-shadow:
    inset 0 0 0 1px rgba(126, 157, 149, 0.16),
    0 24px 60px rgba(72, 96, 90, 0.08);
  backdrop-filter: blur(14px);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.header-frame__left,
.header-frame__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-frame__left {
  min-width: 0;
}

.header-frame__right {
  justify-content: flex-end;
  flex-wrap: wrap;
}

.header-frame__toggle {
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 16px;
  background: #edf6f1;
  color: #214d44;
  cursor: pointer;
}

.header-frame__copy {
  min-width: 0;
}

.header-frame__eyebrow {
  display: inline-block;
  margin-bottom: 4px;
  color: #4f7a71;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.header-frame__title {
  margin: 0;
  color: #173732;
  font-size: 24px;
}

.header-frame__breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.header-frame__breadcrumb {
  color: #66827b;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
    color: #a0b7b1;
  }
}

.header-frame__breadcrumb--active {
  color: #173732;
}

.header-frame__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  background: #edf6f1;
  color: #335d54;
  font-size: 13px;
  font-weight: 600;
}

.header-frame__chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #5ab39a;
}

.header-frame__profile {
  position: relative;
}

.header-frame__profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 4px 6px 4px 14px;
  border: 0;
  border-radius: 999px;
  background: #173732;
  color: #f7f4ed;
  cursor: pointer;
}

.header-frame__profile-name {
  @media (max-width: 575px) {
    display: none;
  }
}

.header-frame__profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
}

.header-frame__profile-image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.header-frame__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 18px;
  background: #fffdf9;
  box-shadow: 0 18px 40px rgba(57, 79, 74, 0.16);
}

.header-frame__menu-item {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #214d44;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #edf6f1;
  }
}

.header-frame__menu-item--danger {
  color: #b35a47;
}
</style>
