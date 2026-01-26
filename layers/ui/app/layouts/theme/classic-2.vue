<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

interface ClassicMenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  badge?: string;
  badgeType?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  children?: ClassicMenuItem[];
}

interface HeaderAction {
  id: string;
  label: string;
  icon: string;
}

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  href: string;
}

interface ClassicLayoutProps {
  headerBackground?: string;
  headerTextColor?: string;
  sidebarBackground?: string;
  sidebarTextColor?: string;
  sidebarActiveColor?: string;
  sidebarWidth?: number;
  contentBackground?: string;
  logoSrc?: string;
  logoAlt?: string;
  brandTitle?: string;
}

const props = withDefaults(defineProps<ClassicLayoutProps>(), {
  headerBackground: '#1f2d3d',
  headerTextColor: '#ffffff',
  sidebarBackground: '#2f3b52',
  sidebarTextColor: '#c2c7d0',
  sidebarActiveColor: '#3c8dbc',
  sidebarWidth: 260,
  contentBackground: '#ecf0f5',
  logoSrc: '/logo.png',
  logoAlt: 'Logo',
  brandTitle: 'Admin',
});

const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);
const isDesktop = ref(false);
const route = useRoute();
const { title } = useTitle();
const { user } = useAuthStore();

const userName = computed(() => {
  return user.value?.username ?? user.value?.email ?? '';
});

const menuItems = ref<ClassicMenuItem[]>([
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    route: '/',
  },
  {
    id: 'settings',
    label: 'Pengaturan',
    icon: 'lucide:cog',
    route: '/settings',
    children: [
      {
        id: 'partners',
        label: 'Partner',
        icon: 'lucide:handshake',
        route: '/settings/partners',
      },
    ],
  },
]);

const headerActions = ref<HeaderAction[]>([
  // { id: 'search', label: 'Search', icon: 'lucide:search' },
  // { id: 'tasks', label: 'Tasks', icon: 'lucide:list-checks' },
  // { id: 'fullscreen', label: 'Fullscreen', icon: 'lucide:maximize' },
  { id: 'logout', label: 'Sign Out', icon: 'lucide:log-out' },
]);

const notifications = ref<NotificationItem[]>([
  {
    id: 'notif-1',
    title: 'Server update',
    body: 'Maintenance window scheduled for tonight at 23:00.',
    href: '/notifications/server-update',
  },
  {
    id: 'notif-2',
    title: 'New comment',
    body: 'You have a new comment on the Q3 report.',
    href: '/notifications/q3-comment',
  },
  {
    id: 'notif-3',
    title: 'Invoice ready',
    body: 'Invoice #INV-1203 is ready to review.',
    href: '/notifications/invoice-inv-1203',
  },
]);

const cssVars = computed(() => ({
  '--classic-header-bg': props.headerBackground,
  '--classic-header-text': props.headerTextColor,
  '--classic-sidebar-bg': props.sidebarBackground,
  '--classic-sidebar-text': props.sidebarTextColor,
  '--classic-sidebar-active': props.sidebarActiveColor,
  '--classic-sidebar-width': `${props.sidebarWidth}px`,
  '--classic-content-bg': props.contentBackground,
}));

function handleHeaderAction(_id: string) {
  // Placeholder for header action handlers.
}

const notificationsOpen = ref(false);

function toggleNotifications() {
  notificationsOpen.value = !notificationsOpen.value;
}

function toggleSidebar() {
  if (isDesktop.value) {
    sidebarCollapsed.value = !sidebarCollapsed.value;
    if (process.client) {
      localStorage.setItem('classic-2-sidebar-collapsed', String(sidebarCollapsed.value));
    }
    return;
  }

  sidebarOpen.value = !sidebarOpen.value;
}

function isItemActive(item: ClassicMenuItem): boolean {
  return Boolean(item.route && route.path === item.route);
}

function hasActiveChild(item: ClassicMenuItem): boolean {
  if (!item.children?.length) {
    return false;
  }

  return item.children.some(child => isItemActive(child) || hasActiveChild(child));
}

const openItems = ref<string[]>([]);

function isItemOpen(item: ClassicMenuItem): boolean {
  return openItems.value.includes(item.id) || hasActiveChild(item);
}

function toggleItem(item: ClassicMenuItem) {
  if (!item.children?.length) {
    return;
  }

  if (openItems.value.includes(item.id)) {
    openItems.value = openItems.value.filter(id => id !== item.id);
    return;
  }

  openItems.value = [...openItems.value, item.id];
}

function syncOpenItems(items: ClassicMenuItem[], next: Set<string>) {
  items.forEach((item) => {
    if (item.children?.length) {
      if (hasActiveChild(item)) {
        next.add(item.id);
      }
      syncOpenItems(item.children, next);
    }
  });
}

watch(
  () => route.path,
  () => {
    const next = new Set(openItems.value);
    syncOpenItems(menuItems.value, next);
    openItems.value = Array.from(next);
    sidebarOpen.value = false;
    notificationsOpen.value = false;
  },
  { immediate: true },
);

function updateIsDesktop() {
  if (!process.client) {
    return;
  }

  const wasDesktop = isDesktop.value;
  isDesktop.value = window.matchMedia('(min-width: 1024px)').matches;
  if (!isDesktop.value) {
    sidebarCollapsed.value = false;
    return;
  }

  if (!wasDesktop) {
    const stored = localStorage.getItem('classic-2-sidebar-collapsed');
    sidebarCollapsed.value = stored === 'true';
  }
}

onMounted(() => {
  updateIsDesktop();

  if (process.client) {
    window.addEventListener('resize', updateIsDesktop);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', updateIsDesktop);
  }
});

const menuTreeProps = computed(() => ({
  items: menuItems.value,
  openItems: openItems.value,
  depth: 0,
  isDesktop: isDesktop.value,
  collapsed: sidebarCollapsed.value,
  isItemActive,
  hasActiveChild,
  isItemOpen,
  onToggle: toggleItem,
}));
</script>

<template>
  <div class="classic-layout" :style="cssVars">
    <header class="topbar">
      <div class="topbar__left">
        <button class="sidebar-toggle" type="button" @click="toggleSidebar">
          <NIcon name="lucide:menu" />
        </button>
        <div class="brand">
          <img v-if="logoSrc" :src="logoSrc" :alt="logoAlt">
          <span class="brand__title">{{ brandTitle }}</span>
        </div>
      </div>
      <div class="topbar__actions">
        <span v-if="userName" class="user-name">
          {{ userName }}
        </span>
        <div class="notifications">
          <button
            class="icon-button"
            type="button"
            aria-label="Notifications"
            data-tooltip="Notifications"
            @click="toggleNotifications"
          >
            <NIcon name="lucide:bell" />
          </button>
          <div v-if="notificationsOpen" class="notifications__panel">
            <div class="notifications__header">
              Notifications
            </div>
            <div class="notifications__list">
              <NuxtLink
                v-for="item in notifications"
                :key="item.id"
                :to="item.href"
                class="notifications__item"
              >
                <span class="notifications__title">{{ item.title }}</span>
                <span class="notifications__body">{{ item.body }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <button
          v-for="action in headerActions"
          :key="action.id"
          class="icon-button"
          type="button"
          :aria-label="action.label"
          :data-tooltip="action.label"
          @click="handleHeaderAction(action.id)"
        >
          <NIcon :name="action.icon" />
        </button>
      </div>
    </header>

    <div v-if="sidebarOpen" class="mobile-overlay" @click="toggleSidebar" />

    <div class="layout-body">
      <aside class="sidebar" :class="{ 'is-open': sidebarOpen, 'is-collapsed': sidebarCollapsed }">
        <div class="sidebar__header">
          <span>MENU NAVIGATION</span>
        </div>
        <nav class="sidebar__nav">
          <LayoutMenuTree v-bind="menuTreeProps" />
        </nav>
      </aside>

      <main class="content">
        <div v-if="title" class="content__title">
          {{ title }}
        </div>
        <div class="content__body">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classic-layout {
  --classic-header-height: 56px;

  min-height: 100vh;
  background: var(--classic-content-bg);
  color: #1f2d3d;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  height: var(--classic-header-height);
  background: var(--classic-header-bg);
  color: var(--classic-header-text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);

  &__left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--classic-header-text);
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-toggle {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    height: 32px;
    width: auto;
  }

  &__title {
    font-weight: 600;
    letter-spacing: 0.5px;
  }
}

.icon-button {
  position: relative;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    background: #111827;
    color: #ffffff;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-6px);
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: translateY(0);
  }
}

.notifications {
  position: relative;
}

.notifications__panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  background: #ffffff;
  color: #111827;
  border-radius: 6px;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.2);
  overflow: hidden;
  z-index: 35;
}

.notifications__header {
  padding: 0.75rem 1rem;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.notifications__list {
  display: flex;
  flex-direction: column;
}

.notifications__item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.85rem 1rem;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
}

.notifications__title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.notifications__body {
  font-size: 12px;
  color: #6b7280;
}

.layout-body {
  display: flex;
  min-height: calc(100vh - var(--classic-header-height));
  min-width: 0;
}

.sidebar {
  width: var(--classic-sidebar-width);
  background: var(--classic-sidebar-bg);
  color: var(--classic-sidebar-text);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;

  &__header {
    padding: 1rem;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  &__nav {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 1rem;
  }
}

.sidebar.is-collapsed {
  width: 72px;

  .sidebar__header {
    height: 0;
    padding: 0;
    opacity: 0;
    overflow: hidden;
  }

  :deep(.menu-link) {
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  :deep(.menu-label),
  :deep(.menu-badge),
  :deep(.menu-caret),
  :deep(.menu-bullet),
  :deep(.submenu) {
    display: none;
  }
}

.content {
  flex: 1;
  padding: 1.5rem;
  min-width: 0;

  &__title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  &__body {
    background: #ffffff;
    border-radius: 6px;
    padding: 1.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    max-width: 100%;
    overflow-x: auto;
  }
}

:deep(.menu-level) {
  list-style: none;
  margin: 0;
  padding: 0;
}

:deep(.menu-link) {
  width: 100%;
  border: none;
  background: transparent;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1rem;
  padding-left: calc(1rem + var(--menu-indent, 0rem));
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

:deep(.menu-link:hover) {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

:deep(.menu-item.is-open > .submenu) {
  max-height: 1000px;
  opacity: 1;
}

:deep(.menu-item.is-active > .menu-link),
:deep(.menu-item.is-current > .menu-link) {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

:deep(.menu-icon) {
  width: 18px;
  height: 18px;
}

:deep(.menu-bullet) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
}

:deep(.menu-label) {
  flex: 1;
}

:deep(.menu-badge) {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

:deep(.menu-badge--primary) {
  background: #3c8dbc;
  color: #ffffff;
}

:deep(.menu-badge--info) {
  background: #00c0ef;
  color: #ffffff;
}

:deep(.menu-badge--success) {
  background: #00a65a;
  color: #ffffff;
}

:deep(.menu-badge--warning) {
  background: #f39c12;
  color: #ffffff;
}

:deep(.menu-badge--danger) {
  background: #dd4b39;
  color: #ffffff;
}
:deep(.menu-caret) {
  width: 6px;
  height: 6px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}

:deep(.menu-item.is-open > .menu-link .menu-caret) {
  transform: rotate(225deg);
}

:deep(.submenu) {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height 0.25s ease,
    opacity 0.25s ease;
  padding-left: 0;
}

:deep(.menu-level--1 .menu-link),
:deep(.menu-level--2 .menu-link),
:deep(.menu-level--3 .menu-link) {
  font-size: 13px;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: var(--classic-header-height);
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    z-index: 25;

    &.is-open {
      transform: translateX(0);
    }
  }

  .layout-body {
    min-height: calc(100vh - var(--classic-header-height));
  }

  .content {
    padding: 1rem;
  }
}
</style>
