# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint to check code quality
- `pnpm lint:fix` - Run ESLint with auto-fix

## Project Architecture

This is a Nuxt 4 application built as a Single Page Application (SPA) with Element Plus UI framework, i18n internationalization, and comprehensive authentication system.

### Key Architectural Patterns

**API Integration**:

- Custom `$api` plugin (`app/plugins/api.ts`) provides centralized HTTP client with automatic token refresh
- `useAPI()` composable wraps Nuxt's `useFetch` with the custom API client
- Automatic 401 handling with token refresh using cookies

**Form Handling**:

- Custom `useForm()` composable (`app/composables/useForm.ts`) provides comprehensive form state management
- Supports both JSON and FormData submission based on file presence
- Built-in error handling, processing states, and automatic request retry
- Reactive form data with automatic field exclusion for internal properties

**Authentication**:

- Token-based auth using `ACCESS_TOKEN` and `REFRESH_TOKEN` cookies
- Global user state managed via `useAuth()` composable
- Auth middleware for protected routes

**UI Components**:

- Element Plus integration with custom wrapper components in `app/components/Ui/`
- Form components built around Element Plus with validation support
- Modular layout system with separate Header, Sidebar, and Footer components

### Component Structure & Naming Rules

**Component Folder Structure**:

```
app/components/
├── Ui/                      # Base UI primitives (buttons, inputs, tables)
├── Form/                    # Form manipulation & API endpoints
│   └── <Feature>/           # Feature-based forms (Form/User/Create.vue)
├── Layout/                  # Layout components (Header.vue, Sidebar.vue)
└── <Feature>/               # Feature-specific business components
    ├── Tab<Something>.vue   # Tab components
    ├── Select<Feature>.vue  # Select/dropdown components
    └── List<Feature>.vue    # List components
```

**Casing Rules**:

- **PascalCase**: Component files (`Button.vue`, `UserCard.vue`), component usage (`<UiButton />`), feature folders (`User/`), interfaces (`interface UserData`), classes (`class UserService`), enums (`enum UserRole`)
- **camelCase**: JavaScript variables (`const userName`), functions (`function handleSubmit()`), object properties (`{ firstName, lastName }`), composables (`useAuth()`), event handlers (`@click="handleClick"`), file names for composables/utils/plugins (`useAuth.ts`, `validator.ts`, `api.ts`)
- **kebab-case**: Multi-word middleware files (`user-permission.ts`), page files (`user-profile.vue`), CSS classes (`.user-card`), CSS custom properties (`--primary-color`), HTML attributes (`data-user-id`)
- **snake_case**: API endpoints (`/api/user_profile`), database fields (`user_id`, `created_at`), API response properties (`{ user_id, first_name }`)
- **SCREAMING_SNAKE_CASE**: Environment variables (`API_BASE_URL`), global constants (`const MAX_FILE_SIZE`)

### TypeScript Declaration Files

The `app/types/` directory contains:

- **component.d.ts**: UI component-specific types (`TableColumn`, `DropdownItem`)
- **model.d.ts**: Business entity interfaces (`User`, permission structures)
- **nuxt.d.ts**: Framework extensions (adds `$api` to `NuxtApp`)
- **api.d.ts**: API response types (`ApiResponse<T>`, `ApiMeta`)
- **common.d.ts**: Shared utility types (`ID`, `SelectOption`)

### Directory Structure

- `app/api/` - API route definitions and modules
- `app/composables/` - Reusable composition functions (useAPI, useForm, useAuth, etc.)
- `app/components/` - Component system following the structure above
- `app/utils/` - Utility functions (file, typography, number, validator helpers)
- `app/constants/` - Application constants (auth tokens, etc.)
- `app/types/` - TypeScript type definitions
- `app/middleware/` - Route middleware (auth protection, etc.)
- `app/plugins/` - Nuxt plugins (API client, Element Plus, etc.)

### Configuration Notes

- Uses Antfu ESLint config with Vue/TypeScript support
- Vue block order enforced: script, template, style
- TailwindCSS v4 with Vite plugin integration
- SSR disabled (`ssr: false`) - pure SPA mode
- Node.js 22+ required
- Auto-imports enabled for `api` and `constants` directories

### API Communication

The application expects a REST API backend with:

- Bearer token authentication
- Standardized error response format with `errors` field
- Token refresh endpoint at `/v1/auth/refresh`
- Base URL configured via `runtimeConfig.public.apiUrl`

### Testing

Uses Vitest for testing. Run tests with standard Vitest commands.

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
- User state: `const { user, setUser, clearUser } = useAuth()`

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

## Code Generators

The project includes several code generators in the `console/` directory to accelerate development:

### create:module

**Command**: `pnpm create:module <moduleName>`
**Example**: `pnpm create:module cmo`
**Purpose**: Creates API module handlers with CRUD operations
**Location**: `app/api/modules/<moduleName>/index.ts`
**Features**:

- Generates `findAll()`, `getAll()`, `show()`, `create()`, `update()`, `destroy()` functions
- Uses proper TypeScript types and error handling
- Integrates with `useForm()` composable for form submissions
- Auto-runs `generate.mjs` and ESLint after creation
- Creates REST endpoints at `/v1/<moduleName>`

### create:form

**Command**: `pnpm create:form <moduleName> <field1:type:rule> <field2:type:rule> ...`
**Example**: `pnpm create:form User name:string:required email:string:required password:password:required`
**Purpose**: Creates form components with validation
**Location**: `app/components/Form/<moduleName>/Create.vue` and `Edit.vue`
**Supported Types**:

- `string` - Basic text input (`UiInput`)
- `password` - Password input (`UiInput type="password"`)
- `number` - Number input (`UiInput type="number"`)
- `textarea` - Text area (`UiInput type="textarea" :rows="5"`)
- `select` - Dropdown select (`UiSelect :options="[]"`)
- `multiple-select` - Multi-select dropdown (`UiSelect :options="[]" :multiple="true"`)
- `tag-input` - Tag input component (`UiInputTag`)
  **Features**:
- Generates both Create.vue and Edit.vue components
- Uses `useForm()` composable with appropriate default values
- Creates Element Plus form validation rules
- Supports required/nullable validation rules
- Auto-generates form items with proper component binding
- Smart default values based on field type (arrays for multi-select, null for select, etc.)

### create:page

**Command**: `pnpm create:page <path> <typeInterface>`
**Example**: `pnpm create:page configuration/bank IBank`
**Purpose**: Creates index pages with data tables and CRUD operations
**Location**: `app/pages/<path>/index.vue`
**Features**:

- Generates complete page with data fetching using `api.<module>.findAll()`
- Creates table columns configuration
- Includes CRUD operation handlers (store, update, delete)
- Sets up reactive data with query parameters
- Auto-generates page title and meta

### create:select

**Command**: `pnpm create:select <path> <apiHandler>`
**Example**: `pnpm create:select User/SelectUser user`
**Purpose**: Creates select/dropdown components that fetch data from API
**Location**: `app/components/<path>.vue`
**Features**:

- Generates select component using `UiSelect`
- Uses `useAsyncData()` with lazy loading
- Auto-generates camelCase key from component path
- Integrates with API module handlers
- Supports v-model binding and loading states

All generators follow the project's naming conventions and architectural patterns, ensuring consistency across generated code.
