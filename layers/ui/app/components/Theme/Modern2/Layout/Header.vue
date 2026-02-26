<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggleSidebar'): void;
}>();
const { title } = useTitle();
const { breadcrumbs, activeBreadcrumb } = useBreadcrumbs();
interface HeaderNotification {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  referenceType: string;
  referenceId: string;
  read: boolean;
}

const { user } = useAuthStore();

const notificationOpen = ref(false);
const profileOpen = ref(false);
const headerActionsRef = ref<HTMLElement | null>(null);

const notifications = ref<HeaderNotification[]>([
  {
    id: 'notif-1',
    title: 'Pengguna baru',
    description: 'Akun baru berhasil dibuat.',
    createdAt: '2026-02-01 09:30:00',
    referenceType: '/users',
    referenceId: '1',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Laporan selesai',
    description: 'Laporan bulanan siap diunduh.',
    createdAt: '2026-02-02 10:15:00',
    referenceType: '/reports',
    referenceId: '2',
    read: false,
  },
]);

const totalNotifications = computed(() => notifications.value.filter(item => !item.read).length);

const { logout: signOut } = useAuthStore();

function closeDropdowns() {
  notificationOpen.value = false;
  profileOpen.value = false;
}

function toggleNotification() {
  notificationOpen.value = !notificationOpen.value;
  if (notificationOpen.value) {
    profileOpen.value = false;
  }
}

function toggleProfile() {
  profileOpen.value = !profileOpen.value;
  if (profileOpen.value) {
    notificationOpen.value = false;
  }
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null;
  if (!target || !headerActionsRef.value) {
    return;
  }

  if (!headerActionsRef.value.contains(target)) {
    closeDropdowns();
  }
}

async function logout() {
  closeDropdowns();
  await signOut();
  await navigateTo('/sign-in');
}

async function readAll() {
  if (!notifications.value.length) {
    return;
  }

  notifications.value = notifications.value.map(item => ({
    ...item,
    read: true,
  }));
}

async function handleView(notification: HeaderNotification) {
  notifications.value = notifications.value.map(item =>
    item.id === notification.id ? { ...item, read: true } : item,
  );
  closeDropdowns();
  await navigateTo(`${notification.referenceType}/${notification.referenceId}`);
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<template>
  <div class="header-wrapper">
    <div class="header-leading">
      <button type="button" class="mobile-menu-btn" aria-label="Open sidebar" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="22px" />
      </button>
      <div class="title-group">
        <h1 class="title">
          {{ title }}
        </h1>
        <nav v-if="breadcrumbs.length" class="breadcrumbs" aria-label="Breadcrumb">
          <NuxtLink
            v-for="(crumb, index) in breadcrumbs"
            :key="crumb.path"
            :to="crumb.path"
            class="breadcrumb-item"
            :class="{ 'breadcrumb-item--active': crumb.path === activeBreadcrumb?.path }"
            :aria-current="crumb.path === activeBreadcrumb?.path ? 'page' : undefined"
          >
            <span>{{ crumb.name }}</span>
            <svg
              v-if="index < breadcrumbs.length - 1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              class="breadcrumb-separator"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M9.29 6.71a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-4.58 4.58a1 1 0 1 1-1.42-1.42L13.17 12L9.29 8.12a1 1 0 0 1 0-1.41Z"
              />
            </svg>
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div ref="headerActionsRef" class="header-actions">
      <div class="notification">
        <NuxtLink to="/inbox" class="icon-button">
          <span v-if="totalNotifications" class="notification-badge">{{ totalNotifications }}</span>
          <NIcon name="lucide:inbox" size="30px" class="text-gray-800" />
        </NuxtLink>
      </div>

      <div class="profile-block">
        <button type="button" class="profile-summary" @click.stop="toggleProfile">
          <span class="profile-text">
            <span class="profile-name">
              {{ user?.first_name ?? '-' }} {{ user?.last_name ?? '' }}
            </span>
            <!--            <tag-role :type="user?.user.display_name" class="w-fit" /> -->
          </span>
          <span class="avatar-circle">
            <NIcon name="mdi:user" size="2em" />
          </span>
        </button>

        <div v-if="profileOpen" class="dropdown profile-dropdown" @click.stop>
          <NuxtLink to="/settings/profile">
            <button type="button" class="logout-btn">
              Profile
            </button>
          </NuxtLink>
          <button type="button" class="logout-btn" @click="logout">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  min-height: 90px;
  padding: 1rem 1rem;
  border-bottom: 1px solid var(--color-gray-100);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.header-leading {
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.mobile-menu-btn {
  width: 34px;
  height: 34px;
  border: 1px solid var(--color-gray-100);
  border-radius: 10px;
  background: #fff;
  color: var(--color-gray-800);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.title-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-gray-900);
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  white-space: nowrap;
  max-width: min(60vw, 560px);
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  color: var(--color-gray-400);
  font-size: 14px;
  font-weight: 400;

  &--active {
    color: var(--color-gray-800);
    pointer-events: none;
  }
}

.breadcrumb-separator {
  color: var(--color-gray-500);
}

.header-actions {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.icon-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  background: #ef4444;
  color: #fff;
  font-size: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-block {
  position: relative;
}

.profile-summary {
  border: 0;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.profile-text {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.profile-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray-900);
}

.avatar-circle {
  width: 42px;
  height: 42px;
  border-radius: 9999px;
  background: var(--color-gray-100);
  color: var(--color-gray-800);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 60;
  border: 1px solid var(--color-gray-100);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 20px 35px rgba(15, 23, 42, 0.12);
}

.notification-dropdown {
  width: 400px;
  padding: 1rem;
}

.notification-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.notification-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-gray-900);
}

.mark-all {
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--color-theme-500);
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.notification-list {
  max-height: 50vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification-item {
  width: 100%;
  border: 0;
  border-radius: 8px;
  background: color-mix(in srgb, var(--color-primary) 10%, white);
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.notification-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-name {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-gray-900);
}

.notification-dot {
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: var(--color-primary);
}

.notification-time,
.notification-description,
.notification-empty {
  font-size: 12px;
  color: var(--color-gray-600);
}

.notification-empty {
  padding: 0.5rem 0;
}

.profile-dropdown {
  width: 180px;
  padding: 0.5rem;
}

.logout-btn {
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.625rem 0.75rem;
  text-align: left;
  color: var(--color-gray-800);

  &:hover {
    background: var(--color-gray-50);
  }
}

@media (min-width: 1024px) {
  .header-wrapper {
    padding: 1rem 2rem;
  }

  .mobile-menu-btn {
    display: none;
  }
}

@media (max-width: 767px) {
  .header-wrapper {
    min-height: 74px;
    align-items: flex-start;
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
  }

  .title {
    font-size: 1rem;
  }

  .breadcrumbs {
    max-width: 44vw;
    gap: 0;
  }

  .breadcrumb-item {
    font-size: 12px;
  }

  .header-actions {
    margin-left: auto;
    gap: 0.5rem;
  }

  .profile-text {
    display: none;
  }

  .avatar-circle {
    width: 36px;
    height: 36px;
  }

  .dropdown {
    width: min(320px, calc(100vw - 1.5rem));
    right: -0.25rem;
  }
}
</style>
