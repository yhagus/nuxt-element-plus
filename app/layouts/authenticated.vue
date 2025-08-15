<script setup lang="ts">
interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  badge?: string;
  badgeType?: 'info' | 'success' | 'warning' | 'danger';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'question';
  timestamp: Date;
  read: boolean;
}

interface AuthenticatedLayoutProps {
  // Header props
  headerFixed?: boolean;
  headerBackground?: string;
  headerTextColor?: string;
  // Sidebar props
  sidebarWidth?: number;
  sidebarBackground?: string;
  sidebarTextColor?: string;
  sidebarActiveColor?: string;
  // Content props
  contentBackground?: string;
  // Footer props
  footerBackground?: string;
  footerTextColor?: string;
  footerBorderColor?: string;
  showFooter?: boolean;
  // Logo props
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

const props = withDefaults(defineProps<AuthenticatedLayoutProps>(), {
  headerFixed: true,
  headerBackground: '#2c3e50',
  headerTextColor: '#ffffff',
  sidebarWidth: 280,
  sidebarBackground: '#34495e',
  sidebarTextColor: '#ecf0f1',
  sidebarActiveColor: '#3498db',
  contentBackground: '#f8f9fa',
  footerBackground: '#ffffff',
  footerTextColor: '#6b7280',
  footerBorderColor: '#e5e7eb',
  showFooter: false,
  logoSrc: '/logo.png',
  logoAlt: 'Logo',
  logoWidth: 120,
  logoHeight: 40,
});

// Mobile sidebar state
const sidebarOpen = ref(false);

// Sample menu items
const menuItems = ref<MenuItem[]>([
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    route: '/authenticated',
  },
  {
    id: 'components',
    label: 'UI Components',
    icon: 'lucide:palette',
    route: '/ui',
  },
  {
    id: 'data',
    label: 'Data Management',
    icon: 'lucide:database',
    children: [
      {
        id: 'tables',
        label: 'Data Tables',
        route: '/data/tables',
      },
      {
        id: 'forms',
        label: 'Forms',
        route: '/data/forms',
      },
      {
        id: 'reports',
        label: 'Reports',
        route: '/data/reports',
      },
    ],
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'lucide:users',
    children: [
      {
        id: 'user-list',
        label: 'All Users',
        route: '/users',
      },
      {
        id: 'user-roles',
        label: 'Roles & Permissions',
        route: '/users/roles',
      },
    ],
  },
]);

// Sample notifications
const notifications = ref<Notification[]>([
  {
    id: '1',
    title: 'New Publisher Request',
    message: 'Cathy Bechsteair submitted a new publisher request',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: '2',
    title: 'System Warning',
    message: 'High CPU usage detected on server 2',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
  },
  {
    id: '3',
    title: 'Error Alert',
    message: 'Failed to process payment for order #12345',
    type: 'error',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
  },
  {
    id: '4',
    title: 'Question',
    message: 'Do you want to enable two-factor authentication?',
    type: 'question',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    read: false,
  },
]);

// Computed styles
const cssVars = computed(() => ({
  '--sidebar-width': `${props.sidebarWidth}px`,
  '--content-bg': props.contentBackground,
}));

// Mobile menu toggle
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

// Close mobile sidebar on route change
const route = useRoute();
watch(() => route.path, () => {
  sidebarOpen.value = false;
});
</script>

<template>
  <div class="authenticated-layout" :style="cssVars">
    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      class="mobile-overlay"
      @click="toggleSidebar"
    />

    <!-- Sidebar -->
    <LayoutSidebar
      :menu-items="menuItems"
      :open="sidebarOpen"
      :width="sidebarWidth"
      :background="sidebarBackground"
      :text-color="sidebarTextColor"
      :active-color="sidebarActiveColor"
      :logo-src="logoSrc"
      :logo-alt="logoAlt"
      :logo-width="logoWidth"
      :logo-height="logoHeight"
      @close="sidebarOpen = false"
    />

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Header -->
      <LayoutHeader
        :fixed="headerFixed"
        :background="headerBackground"
        :text-color="headerTextColor"
        :notifications="notifications"
        @toggle-sidebar="toggleSidebar"
      >
        <template #title>
          <slot name="title" />
        </template>
      </LayoutHeader>

      <!-- Content -->
      <main class="content" :class="{ 'content--header-fixed': headerFixed }">
        <slot />

        <!-- Footer (optional) -->
        <LayoutFooter
          v-if="showFooter"
          :background="footerBackground"
          :text-color="footerTextColor"
          :border-color="footerBorderColor"
        />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.authenticated-layout {
  --header-height: 64px;
  --sidebar-width: 280px;
  --content-bg: #f8f9fa;

  display: flex;
  height: 100vh;
  background-color: var(--content-bg);
}

// Mobile Overlay
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;

  @media (min-width: 1024px) {
    display: none;
  }
}

// Main Content
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;

  @media (min-width: 1024px) {
    margin-left: 0;
  }
}

// Content
.content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;

  &--header-fixed {
    height: calc(100vh - var(--header-height));
  }

  @media (max-width: 1023px) {
    &--header-fixed {
      height: calc(100vh - var(--header-height));
    }
  }
}

// Responsive Design
@media (max-width: 1023px) {
  .main-content {
    width: 100%;
  }
}
</style>
