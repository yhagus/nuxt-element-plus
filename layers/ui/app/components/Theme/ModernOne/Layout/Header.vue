<script setup lang="ts">
const access = useCookie(ACCESS_TOKEN);
const dropdownRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const { user, clearUser } = useAuthStore();
const isNotificationsOpen = ref(false);

const notifications = ref([
  {
    id: 1,
    title: 'Pembaruan Sistem',
    body: 'Ada pembaruan keamanan yang telah diterapkan.',
    read: false,
  },
  {
    id: 2,
    title: 'Promotor Baru',
    body: 'Permintaan promotor baru membutuhkan persetujuan.',
    read: false,
  },
  {
    id: 3,
    title: 'Laporan Mingguan',
    body: 'Laporan performa minggu ini sudah tersedia.',
    read: true,
  },
]);

async function logout() {
  access.value = undefined;
  clearUser();
  reloadNuxtApp({
    path: R_SIGN_IN,
    persistState: false,
    force: true,
  });
}

const displayName = computed(() => user?.name ?? 'Admin');
const roleLabel = computed(() => (user as { type?: string } | null)?.type ?? 'Admin');
const initials = computed(() => {
  const parts = displayName.value.trim().split(' ').filter(Boolean);
  if (!parts.length) {
    return 'A';
  }
  return parts.slice(0, 2).map(part => part[0].toUpperCase()).join('');
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function toggleNotifications() {
  isNotificationsOpen.value = !isNotificationsOpen.value;
}

function markAllRead() {
  notifications.value = notifications.value.map(notification => ({
    ...notification,
    read: true,
  }));
}

function toggleRead(id: number) {
  notifications.value = notifications.value.map(notification => {
    if (notification.id !== id) {
      return notification;
    }

    return {
      ...notification,
      read: !notification.read,
    };
  });
}

const hasUnread = computed(() => notifications.value.some(notification => !notification.read));

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null;
  if (!dropdownRef.value || !target) {
    return;
  }
  if (!dropdownRef.value.contains(target)) {
    isOpen.value = false;
    isNotificationsOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<template>
  <div
    class="header"
  >
    <div id="__nuxt_breadcrumb" />
    <div class="header-profile" ref="dropdownRef">
      <div class="header-profile__notifications">
        <button
          type="button"
          class="header-profile__notif-button"
          :class="{ 'is-open': isNotificationsOpen }"
          @click="toggleNotifications"
        >
          <svg viewBox="0 0 24 24" class="header-profile__notif-icon" aria-hidden="true">
            <path
              d="M12 4a4 4 0 0 0-4 4v2.1c0 .6-.2 1.2-.6 1.7L6 13.5V16h12v-2.5l-1.4-1.7c-.4-.5-.6-1.1-.6-1.7V8a4 4 0 0 0-4-4Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 19a2 2 0 0 0 4 0"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span v-if="hasUnread" class="header-profile__notif-dot" />
        </button>
        <div v-if="isNotificationsOpen" class="header-profile__notif-menu">
          <div class="header-profile__notif-header">
            <span class="header-profile__notif-title">Notifikasi</span>
            <button type="button" class="header-profile__notif-action" @click="markAllRead">
              Tandai semua dibaca
            </button>
          </div>
          <div class="header-profile__notif-list">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="header-profile__notif-item"
              :class="{ 'is-unread': !notification.read }"
            >
              <div class="header-profile__notif-content">
                <span class="header-profile__notif-item-title">{{ notification.title }}</span>
                <span class="header-profile__notif-item-body">{{ notification.body }}</span>
              </div>
              <button
                type="button"
                class="header-profile__notif-toggle"
                @click="toggleRead(notification.id)"
              >
                {{ notification.read ? 'Belum Dibaca' : 'Dibaca' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="header-profile__info">
        <span class="header-profile__name">{{ displayName }}</span>
        <div class="header-profile__role">
          {{ roleLabel }}
        </div>
      </div>
      <button type="button" class="header-profile__avatar" @click="toggleDropdown">
        <img
          v-if="user?.avatar?.url"
          :src="user?.avatar?.url"
          :alt="displayName"
          class="header-profile__avatar-image"
        >
        <span v-else class="header-profile__avatar-initials">{{ initials }}</span>
      </button>
      <div v-if="isOpen" class="header-profile__menu">
        <button type="button" class="header-profile__menu-item" @click="logout">
          <NIcon class="header-profile__menu-icon" name="i-ph:sign-out-duotone" />
          {{ $t("auth.logout") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e0;
  padding: 12px 24px;
}

.header-profile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.header-profile__notifications {
  position: relative;
  margin-right: 6px;
}

.header-profile__notif-button {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid #e4e4e4;
  background-color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.header-profile__notif-button:hover,
.header-profile__notif-button.is-open {
  background-color: #f5f5f5;
  border-color: #d6d6d6;
}

.header-profile__notif-icon {
  width: 18px;
  height: 18px;
  color: #1b1b1b;
}

.header-profile__notif-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: #d93d3d;
}

.header-profile__notif-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
  z-index: 30;
  overflow: hidden;
}

.header-profile__notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid #efefef;
}

.header-profile__notif-title {
  font-weight: 600;
  color: #000000;
  font-size: 14px;
}

.header-profile__notif-action {
  border: 0;
  background: transparent;
  font-size: 12px;
  font-weight: 600;
  color: #d9ba61;
  cursor: pointer;
}

.header-profile__notif-list {
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
}

.header-profile__notif-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.header-profile__notif-item.is-unread {
  border-color: #e8ddc3;
  background-color: #fff9ec;
}

.header-profile__notif-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-profile__notif-item-title {
  font-weight: 600;
  color: #000000;
  font-size: 13px;
}

.header-profile__notif-item-body {
  color: #000000;
  font-size: 12px;
  line-height: 1.4;
}

.header-profile__notif-toggle {
  border: 0;
  background: transparent;
  font-size: 11px;
  font-weight: 600;
  color: #6b6b6b;
  cursor: pointer;
  white-space: nowrap;
}

.header-profile__info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.header-profile__name {
  font-weight: 600;
  color: #000000;
  font-size: 14px;
}

.header-profile__role {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f6e3a0, #d9ba61);
  border-radius: 999px;
  padding: 2px 10px;
  border: 1px solid #caa955;
  font-weight: 600;
  color: #1b1b1b;
  font-size: 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(217, 186, 97, 0.25);
}

.header-profile__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background-color: #f2f2f2;
  cursor: pointer;
  overflow: hidden;
}

.header-profile__avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-profile__avatar-initials {
  font-weight: 600;
  color: #000000;
  font-size: 12px;
}

.header-profile__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  z-index: 20;
}

.header-profile__menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  border: 0;
  background: transparent;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  color: #000000;
  font-weight: 500;
}

.header-profile__menu-item:hover {
  background-color: #f3f3f3;
}

.header-profile__menu-icon {
  font-size: 16px;
}
</style>
