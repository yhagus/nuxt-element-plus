<script setup lang="ts">
import type { PropType } from 'vue';
import { defineComponent, h, onBeforeUnmount, onMounted, resolveComponent } from 'vue';

interface ShadcnMenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  badge?: string;
  badgeType?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  children?: ShadcnMenuItem[];
}

interface ProfileMenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
}

interface ShadcnLayoutProps {
  sidebarWidth?: number;
  sidebarCollapsedWidth?: number;
  sidebarBackground?: string;
  sidebarTextColor?: string;
  sidebarActiveColor?: string;
  contentBackground?: string;
  brandTitle?: string;
  userName?: string;
}

const props = withDefaults(defineProps<ShadcnLayoutProps>(), {
  sidebarWidth: 280,
  sidebarCollapsedWidth: 78,
  sidebarBackground: 'rgba(32, 32, 32, 0.92)',
  sidebarTextColor: '#f6f6f6',
  sidebarActiveColor: '#111111',
  contentBackground: '#f8f8f8',
  brandTitle: 'ShadCN Console',
  userName: 'Avery Carter',
});

const route = useRoute();
const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);
const isDesktop = ref(false);

const menuItems = ref<ShadcnMenuItem[]>([
  {
    id: 'overview',
    label: 'Overview',
    icon: 'lucide:layout-grid',
    route: '/dashboard',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'lucide:folder-kanban',
    children: [
      {
        id: 'projects-all',
        label: 'All Projects',
        route: '/projects',
      },
      {
        id: 'projects-roadmap',
        label: 'Roadmap',
        route: '/projects/roadmap',
      },
      {
        id: 'projects-releases',
        label: 'Releases',
        route: '/projects/releases',
      },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    icon: 'lucide:users-round',
    children: [
      {
        id: 'team-members',
        label: 'Members',
        route: '/team',
      },
      {
        id: 'team-permissions',
        label: 'Permissions',
        route: '/team/permissions',
      },
    ],
  },
  {
    id: 'workspace',
    label: 'Workspace',
    icon: 'lucide:briefcase',
    children: [
      {
        id: 'workspace-settings',
        label: 'Settings',
        route: '/workspace/settings',
      },
      {
        id: 'workspace-billing',
        label: 'Billing',
        route: '/workspace/billing',
      },
      {
        id: 'workspace-security',
        label: 'Security',
        route: '/workspace/security',
      },
      {
        id: 'workspace-nested',
        label: 'Nested Structure',
        children: [
          {
            id: 'workspace-nested-level-1',
            label: 'Level One',
            route: '/workspace/nested/level-1',
          },
          {
            id: 'workspace-nested-level-2',
            label: 'Level Two',
            children: [
              {
                id: 'workspace-nested-level-2-a',
                label: 'Level Two A',
                route: '/workspace/nested/level-2-a',
              },
              {
                id: 'workspace-nested-level-2-b',
                label: 'Level Two B',
                children: [
                  {
                    id: 'workspace-nested-level-3',
                    label: 'Level Three',
                    children: [
                      {
                        id: 'workspace-nested-level-4',
                        label: 'Level Four',
                        route: '/workspace/nested/level-4',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const profileMenuItems = ref<ProfileMenuItem[]>([
  { id: 'profile', label: 'Profile', icon: 'lucide:user', route: '/profile' },
  { id: 'settings', label: 'Settings', icon: 'lucide:settings', route: '/settings' },
  { id: 'logout', label: 'Sign out', icon: 'lucide:log-out' },
]);

const avatarPool = [
  'https://i.pravatar.cc/100?img=12',
  'https://i.pravatar.cc/100?img=32',
  'https://i.pravatar.cc/100?img=45',
  'https://i.pravatar.cc/100?img=68',
];

const avatarSrc = ref(avatarPool[0]);

const cssVars = computed(() => ({
  '--shadcn-sidebar-width': `${props.sidebarWidth}px`,
  '--shadcn-sidebar-collapsed': `${props.sidebarCollapsedWidth}px`,
  '--shadcn-sidebar-bg': props.sidebarBackground,
  '--shadcn-sidebar-text': props.sidebarTextColor,
  '--shadcn-sidebar-active': props.sidebarActiveColor,
  '--shadcn-content-bg': props.contentBackground,
}));

function isItemActive(item: ShadcnMenuItem): boolean {
  return Boolean(item.route && route.path === item.route);
}

function hasActiveChild(item: ShadcnMenuItem): boolean {
  if (!item.children?.length) {
    return false;
  }

  return item.children.some(child => isItemActive(child) || hasActiveChild(child));
}

const openItems = ref<string[]>([]);

function isItemOpen(item: ShadcnMenuItem): boolean {
  return openItems.value.includes(item.id) || hasActiveChild(item);
}

function toggleItem(item: ShadcnMenuItem) {
  if (!item.children?.length) {
    return;
  }

  if (openItems.value.includes(item.id)) {
    openItems.value = openItems.value.filter(id => id !== item.id);
    return;
  }

  openItems.value = [...openItems.value, item.id];
}

function syncOpenItems(items: ShadcnMenuItem[], next: Set<string>) {
  items.forEach((item) => {
    if (item.children?.length) {
      if (hasActiveChild(item)) {
        next.add(item.id);
      }
      syncOpenItems(item.children, next);
    }
  });
}

function toggleSidebar() {
  if (isDesktop.value) {
    sidebarCollapsed.value = !sidebarCollapsed.value;
    if (process.client) {
      localStorage.setItem('shadcn-1-sidebar-collapsed', String(sidebarCollapsed.value));
    }
    return;
  }

  sidebarOpen.value = !sidebarOpen.value;
}

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
    const stored = localStorage.getItem('shadcn-1-sidebar-collapsed');
    sidebarCollapsed.value = stored === 'true';
  }
}

watch(
  () => route.path,
  () => {
    const next = new Set(openItems.value);
    syncOpenItems(menuItems.value, next);
    openItems.value = Array.from(next);
    sidebarOpen.value = false;
  },
  { immediate: true },
);

onMounted(() => {
  updateIsDesktop();
  if (process.client) {
    const index = Math.floor(Math.random() * avatarPool.length);
    avatarSrc.value = avatarPool[index];
    window.addEventListener('resize', updateIsDesktop);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', updateIsDesktop);
  }
});

const MenuTree = defineComponent({
  name: 'ShadcnMenuTree',
  props: {
    items: {
      type: Array as PropType<ShadcnMenuItem[]>,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  setup(menuProps) {
    const NuxtLink = resolveComponent('NuxtLink') as any;
    const NIcon = resolveComponent('NIcon') as any;
    const UiTooltip = resolveComponent('UiTooltip') as any;

    const renderItem = (item: ShadcnMenuItem) => {
      const active = isItemActive(item);
      const current = hasActiveChild(item);
      const open = isItemOpen(item);

      const classes = [
        'menu-item',
        active && 'is-active',
        current && 'is-current',
        open && 'is-open',
      ].filter(Boolean);

      const labelNodes = [
        item.icon
          ? h(NIcon, { name: item.icon, class: 'menu-icon' })
          : h('span', { class: 'menu-bullet' }),
        h('span', { class: 'menu-label' }, item.label),
        item.badge
          ? h(
              'span',
              { class: ['menu-badge', `menu-badge--${item.badgeType ?? 'info'}`] },
              item.badge,
            )
          : null,
        item.children?.length
          ? h('span', { class: 'menu-caret' })
          : null,
      ].filter(Boolean);

      const linkNode = item.route && !item.children?.length
        ? h(
            NuxtLink,
            {
              to: item.route,
              class: 'menu-link',
            },
            { default: () => labelNodes },
          )
        : h(
            'button',
            {
              type: 'button',
              class: 'menu-link',
              onClick: () => toggleItem(item),
            },
            labelNodes,
          );

      const node = (sidebarCollapsed.value && isDesktop.value)
        ? h(
            UiTooltip,
            {
              content: item.label,
              placement: 'right',
              showAfter: 500,
            },
            { default: () => linkNode },
          )
        : linkNode;

      return h('div', {
        class: classes,
        style: { '--menu-indent': `${menuProps.depth * 0.7}rem` },
      }, [
        node,
        item.children?.length
          ? h('div', { class: 'submenu' }, [
              h(MenuTree, {
                items: item.children,
                depth: menuProps.depth + 1,
              }),
            ])
          : null,
      ]);
    };

    return () => h('div', {
      class: ['menu-level', `menu-level--${menuProps.depth}`],
    }, menuProps.items.map(renderItem));
  },
});
</script>

<template>
  <div class="shadcn-layout" :style="cssVars" :class="{ 'is-collapsed': sidebarCollapsed }">
    <div v-if="sidebarOpen" class="mobile-overlay" @click="toggleSidebar" />

    <div class="layout-shell">
      <aside class="sidebar" :class="{ 'is-open': sidebarOpen, 'is-collapsed': sidebarCollapsed }">
        <div class="sidebar__header">
          <div class="brand">
            <div class="brand__mark">
              <NIcon name="lucide:hexagon" />
            </div>
            <span class="brand__title">{{ brandTitle }}</span>
          </div>
        </div>
        <nav class="sidebar__nav">
          <MenuTree :items="menuItems" />
        </nav>
      </aside>

      <main class="content">
        <header class="topbar">
          <div class="topbar__left">
            <button class="sidebar-toggle" type="button" @click="toggleSidebar">
              <NIcon name="lucide:panel-left" class="sidebar-toggle__icon" />
            </button>
          </div>
          <UiDropdown trigger="click">
            <button class="profile-trigger" type="button">
              <div class="profile-info">
                <span class="profile-name">{{ userName }}</span>
                <img :src="avatarSrc" alt="User avatar" class="profile-avatar">
              </div>
            </button>
            <template #dropdown>
              <div class="profile-dropdown">
                <NuxtLink
                  v-for="item in profileMenuItems"
                  :key="item.id"
                  :to="item.route || '#'"
                  class="profile-dropdown__item"
                >
                  <NIcon :name="item.icon" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </div>
            </template>
          </UiDropdown>
        </header>

        <section class="content__body">
          <slot />
        </section>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shadcn-layout {
  min-height: 100vh;
  background: var(--shadcn-content-bg);
  color: #1a1a1a;
  position: relative;
}

.layout-shell {
  display: flex;
  min-height: 100vh;
  min-width: 0;
}

.sidebar-toggle {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f6f6f6;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    background: #ededed;
    transform: translateY(-1px);
  }
}

.sidebar-toggle__icon {
  transition: transform 0.2s ease;
}

.shadcn-layout.is-collapsed .sidebar-toggle__icon {
  transform: rotate(-180deg);
}

.sidebar {
  width: var(--shadcn-sidebar-width);
  background: var(--shadcn-sidebar-bg);
  color: var(--shadcn-sidebar-text);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem;
  border-right: 1px solid rgba(26, 26, 26, 0.8);
  box-shadow: none;
  transition:
    width 0.2s ease,
    transform 0.2s ease;

  &__header {
    margin-bottom: 1.5rem;
    padding: 1rem 1.25rem;
  }

  &__nav {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
  }
}

.sidebar.is-collapsed {
  width: var(--shadcn-sidebar-collapsed);
  //padding: 1rem 0.5rem;

  .brand__title {
    display: none;
  }

  .sidebar__header {
    padding: 1rem 0.5rem;
  }

  .sidebar__nav {
    padding-right: 0;
  }

  :deep(.menu-label),
  :deep(.menu-badge),
  :deep(.menu-caret),
  :deep(.menu-bullet),
  :deep(.submenu) {
    display: none;
  }

  :deep(.menu-link) {
    justify-content: center;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &__mark {
    width: 28px;
    height: 28px;
    border-radius: 12px;
    background: #f6f6f6;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #1a1a1a;
    flex-shrink: 0;
  }

  &__title {
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.02em;
    color: #f6f6f6;
  }
}

.content {
  flex: 1;
  min-width: 0;
  padding: 1rem;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.topbar__left {
  display: flex;
  align-items: center;
}

.profile-trigger {
  border: none;
  background: transparent;
  cursor: pointer;
}

.profile-info {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  background: #f6f6f6;
  border: 1px solid #1a1a1a;
  transition: background 0.2s ease;

  &:hover {
    background: #ededed;
  }
}

.profile-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.profile-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-dropdown {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  min-width: 190px;
}

.profile-dropdown__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  color: #0f172a;
  text-decoration: none;
  font-size: 14px;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.08);
  }
}

.content__body {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: none;
  max-width: 100%;
  overflow-x: auto;
}

:deep(.menu-level) {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin: 0;
  padding: 0;
}

:deep(.menu-item) {
  &.is-open > .submenu {
    max-height: 1000px;
    opacity: 1;
  }

  &.is-active > .menu-link,
  &.is-current > .menu-link {
    background: rgba(246, 246, 246, 0.9);
    color: #111111;
  }
}

:deep(.menu-link) {
  width: 100%;
  border: none;
  background: transparent;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  padding-left: calc(0.8rem + var(--menu-indent, 0rem));
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  border-radius: 10px;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

:deep(.menu-link:hover) {
  background: rgba(246, 246, 246, 0.9);
  color: #111111;
}

:deep(.menu-icon) {
  width: 18px;
  height: 18px;
  font-size: 18px;
  flex-shrink: 0;
}

:deep(.menu-bullet) {
  padding-left: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
}

:deep(.menu-label) {
  flex: 1;
}

:deep(.menu-badge) {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

:deep(.menu-badge--primary) {
  background: #6366f1;
  color: #ffffff;
}

:deep(.menu-badge--info) {
  background: #38bdf8;
  color: #ffffff;
}

:deep(.menu-badge--success) {
  background: #22c55e;
  color: #ffffff;
}

:deep(.menu-badge--warning) {
  background: #f59e0b;
  color: #ffffff;
}

:deep(.menu-badge--danger) {
  background: #ef4444;
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
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.6);
  z-index: 20;
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    z-index: 25;

    &.is-open {
      transform: translateX(0);
    }
  }

  .content {
    padding: 1rem;
  }
}
</style>
