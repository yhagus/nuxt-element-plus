<script setup lang="ts">
interface FooterProps {
  background?: string;
  textColor?: string;
  borderColor?: string;
  copyright?: string;
  links?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

const props = withDefaults(defineProps<FooterProps>(), {
  background: '#ffffff',
  textColor: '#6b7280',
  borderColor: '#e5e7eb',
  copyright: '© 2025 Nuxt Boilerplate. All rights reserved.',
  links: () => [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Support', href: '/support' },
  ],
});

// Computed styles
const cssVars = computed(() => ({
  '--footer-bg': props.background,
  '--footer-text': props.textColor,
  '--footer-border': props.borderColor,
}));
</script>

<template>
  <footer class="footer" :style="cssVars">
    <div class="footer__container">
      <!-- Left side - Copyright -->
      <div class="footer__copyright">
        <slot name="copyright">
          {{ copyright }}
        </slot>
      </div>

      <!-- Right side - Links -->
      <div class="footer__links">
        <template v-for="link in links" :key="link.href">
          <NuxtLink
            v-if="!link.external"
            :to="link.href"
            class="footer__link"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            class="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </template>
        <slot name="links" />
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  --footer-bg: #ffffff;
  --footer-text: #6b7280;
  --footer-border: #e5e7eb;

  background-color: var(--footer-bg);
  border-top: 1px solid var(--footer-border);
  padding: 1rem 0;
  margin-top: auto;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width: 767px) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__copyright {
    font-size: 0.875rem;
    color: var(--footer-text);
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;

    @media (max-width: 767px) {
      justify-content: center;
    }
  }

  &__link {
    font-size: 0.875rem;
    color: var(--footer-text);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #374151;
    }
  }
}
</style>
