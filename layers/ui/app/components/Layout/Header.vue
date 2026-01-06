<script setup lang="ts">
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'question';
  timestamp: Date;
  read: boolean;
}

interface HeaderProps {
  fixed?: boolean;
  background?: string;
  textColor?: string;
  notifications?: Notification[];
}

const props = withDefaults(defineProps<HeaderProps>(), {
  fixed: true,
  background: '#2c3e50',
  textColor: '#ffffff',
  notifications: () => [],
});

defineEmits<{
  (e: 'toggleSidebar'): void;
}>();

// Local state
const notificationOpen = ref(false);
const profileDropdownOpen = ref(false);

// User data
const { user } = useAuthStore();
const { title } = useTitle();

// Computed styles
const cssVars = computed(() => ({
  '--header-bg': props.background,
  '--header-text': props.textColor,
}));

// Close dropdowns when clicking outside
function closeDropdowns() {
  notificationOpen.value = false;
  profileDropdownOpen.value = false;
}

// Notification helpers
const unreadNotifications = computed(() =>
  props.notifications.filter(n => !n.read),
);

function getNotificationIcon(type: Notification['type']) {
  const icons = {
    info: 'lucide:info',
    warning: 'lucide:triangle-alert',
    error: 'lucide:circle-x',
    question: 'lucide:help-circle',
  };
  return icons[type];
}

function formatTimestamp(timestamp: Date) {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0)
    return `${days}d ago`;
  if (hours > 0)
    return `${hours}h ago`;
  if (minutes > 0)
    return `${minutes}m ago`;
  return 'Just now';
}

function markAsRead(notificationId: string) {
  const notification = props.notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
}
</script>

<template>
  <header
    class="header"
    :class="{ 'header--fixed': fixed }"
    :style="cssVars"
    @click="closeDropdowns"
  >
    <!-- Left side - Mobile menu button + Title -->
    <div class="header__left">
      <button
        class="mobile-menu-btn flex lg:hidden me-2"
        @click="$emit('toggleSidebar')"
      >
        <NIcon name="lucide:menu" />
      </button>

      <h1 class="header__title">
        <slot name="title">
          {{ title ?? 'Dashboard' }}
        </slot>
      </h1>
    </div>

    <!-- Right side - Notifications + Profile -->
    <div class="header__right">
      <!-- Notifications -->
      <div class="header-item">
        <button
          class="notification-btn"
          @click.stop="notificationOpen = !notificationOpen"
        >
          <NIcon name="lucide:bell" />
          <span
            v-if="unreadNotifications.length > 0"
            class="notification-badge"
          >
            {{ unreadNotifications.length }}
          </span>
        </button>

        <!-- Notification Dropdown -->
        <div
          v-if="notificationOpen"
          class="notification-dropdown"
          @click.stop
        >
          <div class="notification-header">
            <h3>Notifications</h3>
            <span class="notification-count">{{ unreadNotifications.length }} unread</span>
          </div>

          <div class="notification-list">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="notification-item"
              :class="{ 'notification-item--unread': !notification.read }"
              @click="markAsRead(notification.id)"
            >
              <div class="notification-icon">
                <NIcon
                  :name="getNotificationIcon(notification.type)"
                  :class="`notification-icon--${notification.type}`"
                />
              </div>
              <div class="notification-content">
                <h4 class="notification-title">
                  {{ notification.title }}
                </h4>
                <p class="notification-message">
                  {{ notification.message }}
                </p>
                <span class="notification-time">{{ formatTimestamp(notification.timestamp) }}</span>
              </div>
            </div>
          </div>

          <div class="notification-footer">
            <button class="btn-text">
              View all notifications
            </button>
          </div>
        </div>
      </div>

      <!-- Profile -->
      <div class="header-item">
        <button
          class="profile-btn"
          @click.stop="profileDropdownOpen = !profileDropdownOpen"
        >
          <img
            :src="user?.avatar || '/default-avatar.png'"
            :alt="user?.name || 'User'"
            class="profile-avatar"
          >
          <span class="profile-name hidden md:block">{{ user?.name || 'John Doe' }}</span>
          <NIcon name="lucide:chevron-down" class="profile-arrow" />
        </button>

        <!-- Profile Dropdown -->
        <div
          v-if="profileDropdownOpen"
          class="profile-dropdown"
          @click.stop
        >
          <div class="profile-info">
            <img
              :src="user?.avatar || '/default-avatar.png'"
              :alt="user?.name || 'User'"
              class="profile-info__avatar"
            >
            <div class="profile-info__details">
              <h3>{{ user?.name || 'John Doe' }}</h3>
              <p>{{ user?.email || 'john.doe@example.com' }}</p>
            </div>
          </div>

          <div class="profile-menu">
            <NuxtLink to="/settings" class="profile-menu__item">
              <NIcon name="lucide:user" />
              <span>Settings</span>
            </NuxtLink>
            <hr class="profile-menu__divider">
            <button class="profile-menu__item profile-menu__item--danger">
              <NIcon name="lucide:log-out" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// Header
.header {
  --header-height: 64px;
  --header-bg: #2c3e50;
  --header-text: #ffffff;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --border-radius: 8px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  background-color: var(--header-bg);
  color: var(--header-text);
  padding: 0 1.5rem;
  box-shadow: var(--shadow);
  z-index: 30;

  &--fixed {
    position: sticky;
    top: 0;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    margin-left: 1rem;

    @media (min-width: 1024px) {
      margin-left: 0;
    }
  }
}

.mobile-menu-btn {
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  color: currentColor;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

// Header Items
.header-item {
  position: relative;
}

// Notifications
.notification-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  color: currentColor;
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 320px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  border: 1px solid #e5e7eb;
  z-index: 100;
}

.notification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
  }

  .notification-count {
    font-size: 0.75rem;
    color: #6b7280;
  }
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: var(--transition);
  border-bottom: 1px solid #f9fafb;

  &:hover {
    background-color: #f9fafb;
  }

  &--unread {
    background-color: #eff6ff;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: #3b82f6;
    }
  }
}

.notification-icon {
  margin-right: 0.75rem;

  svg {
    font-size: 20px;
    width: 20px;
    height: 20px;
  }

  .notification-icon--info {
    color: #3b82f6;
  }
  .notification-icon--warning {
    color: #f59e0b;
  }
  .notification-icon--error {
    color: #ef4444;
  }
  .notification-icon--question {
    color: #8b5cf6;
  }
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.notification-message {
  margin: 0.25rem 0;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.notification-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid #f3f4f6;
  text-align: center;
}

.btn-text {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    color: #1d4ed8;
  }
}

// Profile
.profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  color: currentColor;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.profile-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.profile-arrow {
  font-size: 16px;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 280px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  border: 1px solid #e5e7eb;
  z-index: 100;
}

.profile-info {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.75rem;
  }

  &__details {
    flex: 1;
    min-width: 0;

    h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
    }

    p {
      margin: 0.25rem 0 0 0;
      font-size: 0.75rem;
      color: #6b7280;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.profile-menu {
  &__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: #374151;
    text-decoration: none;
    transition: var(--transition);
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 0.875rem;

    &:hover {
      background-color: #f9fafb;
    }

    &--danger {
      color: #dc2626;

      &:hover {
        background-color: #fef2f2;
      }
    }

    svg {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  }

  &__divider {
    margin: 0.5rem 0;
    border: none;
    border-top: 1px solid #f3f4f6;
  }
}

// Utilities
.hidden {
  display: none;
}

@media (min-width: 768px) {
  .md\:block {
    display: block;
  }
}

@media (min-width: 1024px) {
  .lg\:hidden {
    display: none;
  }
}
</style>
