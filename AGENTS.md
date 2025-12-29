# Repository Guidelines

## Project Structure & Module Organization
- `app/` is the primary Nuxt application code (components, pages, composables, plugins, middleware, utils, types).
- `server/` holds server-side routes or handlers if added later.
- `shared/` contains cross-cutting code shared between app/server. Typically for `types` and `utils`
- `public/` stores static assets served as-is.
- Configuration lives in `nuxt.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `vitest.config.ts`.

## Build, Test, and Development Commands
- `pnpm build` builds the production bundle.

## Coding Style & Naming Conventions
- ESLint is based on `@antfu/eslint-config` with semicolons enabled.
- Vue SFC block order is enforced: `<script>`, `<template>`, `<style>`.
- Naming: PascalCase for components and types, camelCase for composables and utilities, kebab-case for pages/middleware, SCREAMING_SNAKE_CASE for env vars.

## UI Styling
- Do not use CSS. Only use SCSS.

## Configuration Notes
- Node.js 22+ is required (see `package.json` engines).
- This Nuxt app is SPA-oriented with TailwindCSS and i18n configured; follow existing patterns in `app/`.

### API Communication

The application expects a REST API backend with:
- Bearer token authentication
- Standardized error response format with `errors` field
- Token refresh endpoint at `/v1/auth/refresh`
- Base URL configured via server route `/servers`

## Core Development Patterns (MEMORIZE FOR FUTURE SESSIONS)

**API Endpoint Usage**:

- **ALWAYS use `api` handlers** - Never use `$fetch` directly
- Example: `api.auth.getAccessToken(form)`, `api.users.create(data)`
- Handlers are in `app/api/modules/` with proper TypeScript definitions
- Automatic token refresh, error handling, and Sentry integration built-in

**Form Handling (CRITICAL)**:

- **ALWAYS wrap forms with `useForm()`** - Never manual form state
- Auto-converts to FormData when files detected: `const form = useForm({ name: '', avatar: null })`
- Built-in states: `form.processing` (loading), `form.errors` (validation errors)
- Usage: `<UiForm v-model="form" @submit="submitHandler">`
- Submit: `await api.endpoint.method(form)` - form automatically serialized

**UI Component Standards**:

- **Forms**: `<UiForm v-model="form" @submit="handler">` - never native `<form>`
- **Form Fields**: `<UiFormItem label="Name" prop="name" required>` wrapper required
- **Inputs**: `<UiInput v-model="form.field" type="email" placeholder="..." />`
- **Buttons**: `<UiButton :loading="form.processing" variant="primary" type="submit">`
- **Checkboxes**: `<UiCheckbox v-model="form.remember">Remember me</UiCheckbox>`
- **Loading States**: `<LoadingState type="form|table|card|spinner|list" />`

**Component Usage Patterns**:

- **UI Components**: `<UiButton />`, `<UiDataTable />` (from `components/Ui/`)
- **Form Components**: `<FormUserCreate />`, `<FormUserEdit />` (from `components/Form/<Feature>/`)
- **Feature Components**: `<UserSelectUser />`, `<UserTabRole />` (from `components/<Feature>/`)
- **Layout Components**: `<LayoutHeader />`, `<LayoutSidebar />`, `<LayoutFooter />` (from `components/Layout/`)

**Success Notifications**:

- **useToast**: `const toast = useToast(); toast.success('message')` - Simple toast notification
- **useNotification**: `const notification = useNotification(); notification.success('title', 'message')` - Detailed notification popup
- Types available: `success`, `warning`, `info`, `error`, `primary`
- Options: `{ duration: 3000, position: 'top-right' }`

**Cookie & Auth Management**:

- Token storage: `const token = useCookie(ACCESS_TOKEN); token.value = response.access_token`
- Force reload after auth: `await reloadNuxtApp({ force: true })`
- Immediate cookie refresh: `refreshCookie(ACCESS_TOKEN)`
- User state: `const { user, setUser, clearUser } = useAuthStore()`

**Navigation & Routing**:

- Programmatic: `await navigateTo('/path')`
- Layout control: `definePageMeta({ layout: false })`
- Middleware: Applied automatically, redirects to `/sign-in` when needed

**Element Plus Integration**:

- Pagination: `layout="sizes, ->, prev, pager, next"` for proper positioning
- Theming: CSS variables `--ui-primary`, `--ui-hover` with SCSS
- Sizes: `small`, `default`, `large` variants standard
- Custom styling: Always use SCSS nested selectors with Element Plus patterns

**Layout System**:

- Use modular layout components: `<LayoutHeader />`, `<LayoutSidebar />`, `<LayoutFooter />`
- Theme customization via props: `headerBackground`, `sidebarBackground`, etc.
- Default theme colors maintained for consistency
- Responsive design built-in for mobile/desktop viewports

**File Upload Pattern**:

```javascript
const form = useForm({
  name: '',
  email: '',
  avatar: null // File will auto-trigger FormData conversion
});

// When user selects file, form automatically becomes FormData
async function handleSubmit() {
  await api.users.create(form); // Automatically sent as FormData
}
```

**Standard Component Structure**:

```vue
<script setup lang="ts">
const form = useForm({
  // form fields
});

async function handleSubmit() {
  await api.module.method(form, {
    onResponse({ response }) {
      if (response.ok) {
        // Success notifications:
        const toast = useToast();
        toast.success('Data saved successfully!');
      }
    }
  });

  // Handle other success actions (navigation, etc.)
}
</script>

<template>
  <UiForm v-model="form" @submit="handleSubmit">
    <UiFormItem label="Field" prop="field" required>
      <UiInput v-model="form.field" />
    </UiFormItem>
    <UiButton :loading="form.processing" type="submit">
      Submit
    </UiButton>
  </UiForm>
</template>
```

This architecture provides a scalable, maintainable component system with clear separation of concerns between UI primitives, forms, business logic, and layout components.
