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

interface SidebarProps {
  menuItems: MenuItem[];
  open?: boolean;
  width?: number;
  background?: string;
  textColor?: string;
  activeColor?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

const props = withDefaults(defineProps<SidebarProps>(), {
  open: false,
  width: 280,
  background: '#34495e',
  textColor: '#ecf0f1',
  activeColor: '#3498db',
  logoSrc: '/logo.png',
  logoAlt: 'Logo',
  logoWidth: 120,
  logoHeight: 40,
});

defineEmits<{
  (e: 'close'): void;
}>();

// State for expandable menu items
const expandedMenus = ref<Set<string>>(new Set());

// Computed styles
const cssVars = computed(() => ({
  '--sidebar-width': `${props.width}px`,
  '--sidebar-bg': props.background,
  '--sidebar-text': props.textColor,
  '--sidebar-active': props.activeColor,
}));

function toggleMenu(menuId: string) {
  if (expandedMenus.value.has(menuId)) {
    expandedMenus.value.delete(menuId);
  }
  else {
    expandedMenus.value.add(menuId);
  }
}

function isMenuExpanded(menuId: string) {
  return expandedMenus.value.has(menuId);
}

// Handle route changes
const route = useRoute();
function isActiveRoute(menuRoute?: string) {
  if (!menuRoute)
    return false;
  return route.path === menuRoute || route.path.startsWith(`${menuRoute}/`);
}

// Close mobile sidebar on route change
watch(() => route.path, () => {
  if (props.open) {
    // Emit close event for mobile
    // The parent component will handle closing the sidebar
  }
});
</script>

<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--open': open }"
    :style="cssVars"
  >
    <!-- Logo Section -->
    <div class="sidebar__logo">
      <NuxtLink to="/authenticated" class="logo-link">
        <!-- <img
          :src="logoSrc"
          :alt="logoAlt"
          :width="logoWidth"
          :height="logoHeight"
          class="logo-image"
        > -->
        <div class="logo-text">
          <span class="logo-text__brand">Nuxt</span>
          <span class="logo-text__suffix">Boilerplate</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar__nav">
      <ul class="nav-list">
        <li v-for="item in menuItems" :key="item.id" class="nav-item">
          <!-- Menu item with children -->
          <div v-if="item.children" class="nav-item--expandable">
            <button
              class="nav-link nav-link--expandable"
              @click="toggleMenu(item.id)"
            >
              <NIcon v-if="item.icon" :name="item.icon" class="nav-icon" />
              <span class="nav-text">{{ item.label }}</span>
              <NIcon
                name="lucide:chevron-down"
                class="nav-arrow"
                :class="{ 'nav-arrow--expanded': isMenuExpanded(item.id) }"
              />
            </button>

            <!-- Submenu -->
            <ul
              class="nav-submenu"
              :class="{ 'nav-submenu--expanded': isMenuExpanded(item.id) }"
            >
              <li v-for="child in item.children" :key="child.id" class="nav-subitem">
                <NuxtLink
                  :to="child.route || '#'"
                  class="nav-sublink"
                  :class="{ 'nav-sublink--active': isActiveRoute(child.route) }"
                  @click="$emit('close')"
                >
                  <span class="nav-text">{{ child.label }}</span>
                  <span
                    v-if="child.badge"
                    class="nav-badge"
                    :class="`nav-badge--${child.badgeType || 'info'}`"
                  >
                    {{ child.badge }}
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Simple menu item -->
          <NuxtLink
            v-else
            :to="item.route || '#'"
            class="nav-link"
            :class="{ 'nav-link--active': isActiveRoute(item.route) }"
            @click="$emit('close')"
          >
            <NIcon v-if="item.icon" :name="item.icon" class="nav-icon" />
            <span class="nav-text">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
// Sidebar
.sidebar {
  --header-height: 64px;
  --sidebar-width: 280px;
  --sidebar-bg: #34495e;
  --sidebar-text: #ecf0f1;
  --sidebar-active: #3498db;
  --shadow-lg: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--sidebar-bg);
  transform: translateX(-100%);
  z-index: 50;
  overflow-y: auto;

  @media (min-width: 1024px) {
    position: static;
    transform: translateX(0);
    flex-shrink: 0;
  }

  &--open {
    transform: translateX(0);
  }

  // Logo Section
  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--header-height);
    padding: 0 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .logo-link {
      display: flex;
      align-items: center;
      justify-content: center;

      .logo-image {
        max-width: 100%;
        height: auto;
        object-fit: contain;
      }
    }

    .logo-text {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--sidebar-text);

      &__brand {
        color: var(--sidebar-active);
      }

      &__suffix {
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        font-size: 1rem;
      }
    }
  }

  // Navigation
  &__nav {
    padding: 1rem 0;
  }
}

// Navigation Styles
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.25rem;

  &--expandable {
    .nav-submenu {
      &--expanded {
        max-height: 200px;
        opacity: 1;
        padding-left: 1rem;
        border-left: 2px solid rgba(255, 255, 255, 0.1);
        margin-left: 1rem;
        margin-top: 0.5rem;
      }
    }
  }
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: var(--sidebar-text);
  text-decoration: none;
  transition: var(--transition);
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &--active {
    background-color: var(--sidebar-active);
    color: white;
  }

  &--expandable {
    justify-content: space-between;
  }
}

.nav-icon {
  font-size: 20px;
  margin-right: 0.75rem;
  width: 20px;
  height: 20px;
}

.nav-arrow {
  font-size: 16px;
  transition: var(--transition);

  &--expanded {
    transform: rotate(180deg);
  }
}

.nav-text {
  flex: 1;
}

.nav-badge {
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;

  &--info {
    background-color: #3498db;
    color: white;
  }
  &--success {
    background-color: #27ae60;
    color: white;
  }
  &--warning {
    background-color: #f39c12;
    color: white;
  }
  &--danger {
    background-color: #e74c3c;
    color: white;
  }
}

// Submenu
.nav-submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: var(--transition);
}

.nav-subitem {
  margin-bottom: 0.125rem;
}

.nav-sublink {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: var(--transition);
  border-radius: 4px;
  margin: 0 0.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &--active {
    background-color: var(--sidebar-active);
    color: white;
  }
}

// Responsive Design
@media (max-width: 1023px) {
  .sidebar {
    box-shadow: var(--shadow-lg);
  }
}
</style>
