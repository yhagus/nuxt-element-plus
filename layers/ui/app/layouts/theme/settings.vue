<script setup lang="ts">
interface SettingsMenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  description?: string;
}

const menuItems: SettingsMenuItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: 'lucide:user',
    route: '/settings',
    description: 'Update your account profile information and email address.',
  },
  {
    id: 'password',
    label: 'Password',
    icon: 'lucide:key',
    route: '/settings/password',
    description: 'Ensure your account is using a long, random password.',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: 'lucide:palette',
    route: '/settings/appearance',
    description: 'Customize how your application looks and feels.',
  },
  {
    id: 'two-factor',
    label: '2-Step Verification',
    icon: 'lucide:shield-check',
    route: '/settings/two-factor',
    description: 'Add additional security to your account using two-factor authentication.',
  },
];

const route = useRoute();

const activeMenuItem = computed(() => {
  const currentPath = route.path;
  return menuItems.find(item =>
    item.route === currentPath
    || (item.route === '/settings' && currentPath === '/settings'),
  ) || menuItems[0];
});
</script>

<template>
  <NuxtLayout name="classic-1">
    <div class="settings-layout">
      <!-- Settings Header -->
      <div class="settings-header">
        <div class="settings-header__content">
          <h1 class="settings-header__title">
            Account Settings
          </h1>
          <p class="settings-header__description">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="settings-content">
        <!-- Side Navigation -->
        <aside class="settings-nav">
          <nav class="settings-nav__inner">
            <ul class="settings-nav__list">
              <li
                v-for="item in menuItems"
                :key="item.id"
                class="settings-nav__item"
              >
                <NuxtLink
                  :to="item.route"
                  class="settings-nav__link"
                  :class="{ 'settings-nav__link--active': activeMenuItem?.id === item.id }"
                >
                  <div class="settings-nav__icon">
                    <NIcon :name="item.icon" />
                  </div>
                  <div class="settings-nav__content">
                    <span class="settings-nav__label">{{ item.label }}</span>
                    <span class="settings-nav__description">{{ item.description }}</span>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="settings-main">
          <div class="settings-main__inner">
            <!-- Active Section Header -->
            <div class="settings-section-header">
              <div class="settings-section-icon">
                <NIcon :name="activeMenuItem?.icon || 'lucide:settings'" />
              </div>
              <div class="settings-section-info">
                <h2 class="settings-section-title">
                  {{ activeMenuItem?.label || 'Settings' }}
                </h2>
                <p class="settings-section-description">
                  {{ activeMenuItem?.description }}
                </p>
              </div>
            </div>

            <!-- Content Slot -->
            <div class="settings-section-content">
              <slot />
            </div>
          </div>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.settings-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Settings Header
.settings-header {
  padding: 2rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;

  &__content {
    max-width: 800px;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.5rem 0;
  }

  &__description {
    color: #6b7280;
    font-size: 1.125rem;
    margin: 0;
  }
}

// Settings Content Layout
.settings-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

// Settings Navigation
.settings-nav {
  position: sticky;
  top: 2rem;

  @media (max-width: 1023px) {
    position: static;
  }

  &__inner {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    margin-bottom: 0.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__link {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: #374151;
    transition: all 0.2s ease;
    gap: 0.75rem;

    &:hover {
      background-color: #f3f4f6;
      color: #111827;
    }

    &--active {
      background-color: #eff6ff;
      color: #2563eb;
      //border: 1px solid #dbeafe;

      .settings-nav__icon {
        color: #2563eb;
      }
    }
  }

  &__icon {
    flex-shrink: 0;
    font-size: 20px;
    width: 20px;
    height: 20px;
    margin-top: 0.125rem;
    color: #6b7280;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__label {
    display: block;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &__description {
    display: block;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
}

// Settings Main Content
.settings-main {
  min-width: 0;

  &__inner {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

// Settings Section
.settings-section-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem 2rem 1.5rem 2rem;
  border-bottom: 1px solid #f3f4f6;

  @media (max-width: 767px) {
    padding: 1.5rem 1rem 1rem 1rem;
  }
}

.settings-section-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: #eff6ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  font-size: 24px;
}

.settings-section-info {
  flex: 1;
  min-width: 0;
}

.settings-section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.settings-section-description {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.settings-section-content {
  padding: 2rem;

  @media (max-width: 767px) {
    padding: 1.5rem 1rem;
  }
}

// Mobile Navigation
@media (max-width: 1023px) {
  .settings-nav__inner {
    margin-bottom: 1rem;
  }

  .settings-nav__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
  }

  .settings-nav__link {
    padding: 0.75rem;
    text-align: center;
    flex-direction: column;
    gap: 0.5rem;
  }

  .settings-nav__description {
    display: none;
  }

  @media (max-width: 640px) {
    .settings-nav__list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
