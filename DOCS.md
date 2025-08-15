# Nuxt Boilerplate Documentation

A comprehensive Nuxt 4 boilerplate application with Element Plus UI framework, authentication system, and modern development practices.

## Table of Contents

- [Application Architecture](#application-architecture)
- [Core Technologies](#core-technologies)
- [Project Structure](#project-structure)
- [Component System](#component-system)
- [Coding Standards](#coding-standards)
- [Development Patterns](#development-patterns)
- [API Documentation](#api-documentation)

## Application Architecture

### Overview

This is a **Single Page Application (SPA)** built with Nuxt 4, featuring:

- **Frontend-only architecture** (`ssr: false`)
- **Token-based authentication** with automatic refresh
- **Modular component system** with clear separation of concerns
- **Type-safe development** with TypeScript throughout
- **Modern CSS** with TailwindCSS v4
- **Comprehensive testing** with Vitest

### Core Architecture Principles

1. **Separation of Concerns**: Clear distinction between UI, business logic, and data layers
2. **Type Safety**: TypeScript interfaces and types for all data structures
3. **Composable Architecture**: Reusable logic through Vue 3 composables
4. **Component Modularity**: Atomic design principles with UI primitives and composed components
5. **API-First Design**: Centralized API handling with automatic error management

## Core Technologies

### Frontend Framework

- **[Nuxt 4](https://nuxt.com/)** - Vue.js framework with file-based routing, auto-imports, and SSR/SPA modes
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework with Composition API

### UI & Styling

- **[Element Plus](https://element-plus.org/)** - Vue 3 component library with comprehensive UI components
- **[TailwindCSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Iconify](https://iconify.design/)** - Universal icon framework (Lucide icons used primarily)

### Development Tools

- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript for better development experience
- **[ESLint](https://eslint.org/)** - Code linting with Antfu's configuration
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server

### State Management & Data

- **Vue 3 Composables** - Built-in state management using `ref`, `reactive`, and composables
- **Cookies** - Client-side storage for authentication tokens
- **Custom API Client** - Centralized HTTP client with automatic token refresh

### Authentication & Security

- **JWT Tokens** - Access and refresh token authentication
- **Sentry Integration** - Error monitoring and reporting
- **CSRF Protection** - Cross-site request forgery protection

## Project Structure

```
app/
├── api/                    # API route handlers and modules
│   └── modules/           # Feature-based API modules
│       └── auth/          # Authentication API handlers
├── components/            # Vue components (see Component System below)
├── composables/           # Reusable Vue 3 composables
├── constants/             # Application constants
├── layouts/               # Nuxt layout components
├── middleware/            # Route middleware
├── pages/                 # File-based routing pages
├── plugins/               # Nuxt plugins
├── types/                 # TypeScript type definitions
└── utils/                # Utility functions
```

## Component System

### Component Hierarchy

```
app/components/
├── Ui/                      # Base UI primitives
│   ├── Button.vue          # ✅ Reusable button component
│   ├── Input.vue           # ✅ Form input component
│   ├── Table.vue           # ✅ Data table component
│   ├── DataTable.vue       # ✅ Enhanced table with filtering
│   ├── Pagination.vue      # ✅ Pagination controls
│   └── LoadingState.vue    # ✅ Loading skeletons
│
├── Form/                   # Form handling & API operations
│   └── <Feature>/          # Feature-specific forms
│       ├── Create.vue      # Creation forms
│       ├── Edit.vue        # Edit forms
│       └── Update.vue      # Update forms
│
├── Layout/                 # Layout components
│   ├── Header.vue          # ✅ Application header
│   ├── Sidebar.vue         # ✅ Navigation sidebar
│   └── Footer.vue          # ✅ Application footer
│
└── <Feature>/              # Business logic components
    ├── Tab<Name>.vue       # Tab components
    ├── Select<Name>.vue    # Dropdown/select components
    └── List<Name>.vue      # List display components
```

### Component Usage Patterns

```vue
<!-- UI Components: Base primitives -->
<UiButton variant="primary" :loading="isLoading" @click="handleClick">
  Submit
</UiButton>

<!-- Form Components: API operations -->
<FormUserCreate @success="handleSuccess" />

<FormUserEdit :user-id="userId" @updated="handleUpdate" />

<!-- Feature Components: Business logic -->
<UserSelectUser v-model="selectedUser" @change="handleUserChange" />

<UserTabRole :user="currentUser" />

<!-- Layout Components: Application structure -->
<LayoutHeader :background="#custom - color" />

<LayoutSidebar :menu-items="menuItems" />
```

## Coding Standards

### Naming Conventions

#### PascalCase

- **Component files**: `Button.vue`, `UserCard.vue`, `SelectUser.vue`
- **Component usage**: `<UiButton />`, `<FormUserCreate />`, `<UserSelectUser />`
- **Feature folders**: `User/`, `Product/`, `Order/`
- **Interfaces & Types**: `interface UserData`, `type FormState`, `interface TableColumn`
- **Classes**: `class UserService`, `class ApiClient`
- **Enums**: `enum UserRole`, `enum OrderStatus`

#### camelCase

- **JavaScript variables**: `const userName = ref('')`, `let isLoading`
- **Functions**: `function handleSubmit()`, `const getUserData = ()`
- **Object properties**: `{ firstName, lastName, emailAddress }`
- **Composables**: `useAuth()`, `useForm()`, `useUserData()`
- **Event handlers**: `@click="handleClick"`, `@submit="handleFormSubmit"`
- **File names**:
  - Composables: `useAuth.ts`, `useTableColumnConfig.ts`
  - Utils: `typography.ts`, `validator.ts`, `helper.ts`
  - Plugins: `api.ts`, `csrf.ts`

#### kebab-case

- **Multi-word middleware**: `user-permission.ts`
- **Page files**: `user-profile.vue`, `order-history.vue`
- **CSS classes**: `.user-card`, `.form-input`, `.nav-item`
- **CSS custom properties**: `--primary-color`, `--sidebar-width`
- **HTML attributes**: `data-user-id`, `aria-label`

#### snake_case

- **API endpoints**: `/api/user_profile`, `/v1/get_user_list`
- **Database fields**: `user_id`, `created_at`, `first_name`
- **API response properties**: `{ user_id, first_name, last_name }`

#### SCREAMING_SNAKE_CASE

- **Environment variables**: `API_BASE_URL`, `DB_PASSWORD`, `NUXT_SECRET_KEY`
- **Global constants**: `const MAX_FILE_SIZE = 1024`, `const DEFAULT_TIMEOUT = 5000`

### TypeScript Structure

The `app/types/` directory follows a clear organization pattern:

```typescript
// types/component.d.ts - UI component-specific types
declare global {
  interface TableColumn {
    prop: string;
    label: string;
    visible?: boolean;
    // ...
  }
}

// types/model.d.ts - Business entity interfaces
declare global {
  interface User {
    id: string;
    email: string;
    role: {
      permissions: Permission[];
    };
  }
}

// types/nuxt.d.ts - Framework extensions
declare module '#app' {
  interface NuxtApp {
    $api: typeof $fetch;
  }
}
```

### Vue Component Structure

All Vue components follow this standardized structure:

```vue
<script setup lang="ts">
// 1. Imports
import { computed, ref } from 'vue';

// 2. Props & Emits
interface Props {
  // prop definitions
}
const props = withDefaults(defineProps<Props>(), {
  // defaults
});

const emit = defineEmits<Emits>();
interface Emits {
  // emit definitions
}
// 3. Composables
const { user } = useAuth();
const form = useForm({
  // form fields
});

// 4. Reactive state
const isLoading = ref(false);

// 5. Computed properties
const computedValue = computed(() => {
  // computation logic
});

// 6. Functions
async function handleSubmit() {
  // function logic
}
</script>

<template>
  <!-- Template with proper indentation and structure -->
</template>

<style lang="scss" scoped>
/* SCSS styles with nested selectors */
</style>
```

## Development Patterns

### API Integration

**Always use the centralized API client:**

```typescript
// ✅ Correct - Use API handlers
await api.auth.getAccessToken(form);
await api.users.create(userData);

// ❌ Incorrect - Don't use $fetch directly
await $fetch('/api/users', { method: 'POST', body: userData });
```

### Form Handling

**Always use the `useForm()` composable:**

```vue
<script setup lang="ts">
// ✅ Correct form handling
const form = useForm({
  name: '',
  email: '',
  avatar: null // Auto-converts to FormData when file selected
});

async function handleSubmit() {
  await api.users.create(form); // Form automatically serialized
}
</script>

<template>
  <UiForm v-model="form" @submit="handleSubmit">
    <UiFormItem label="Name" prop="name" required>
      <UiInput v-model="form.name" />
    </UiFormItem>
    <UiButton :loading="form.processing" type="submit">
      Submit
    </UiButton>
  </UiForm>
</template>
```

### Notifications

**Use the notification composables properly:**

```typescript
// ✅ Correct notification usage
const toast = useToast();
const notification = useNotification();

// Simple toast
toast.success('User created successfully!');

// Detailed notification
notification.success('Success', 'User has been created successfully', {
  duration: 5000
});
```

### Authentication & Navigation

```typescript
// Token management
const accessToken = useCookie(ACCESS_TOKEN);
accessToken.value = response.access_token;

// Force app reload after auth changes
await reloadNuxtApp({ force: true });

// Programmatic navigation
await navigateTo('/dashboard');

// Layout control
definePageMeta({ layout: false });
```

### Element Plus Theming

**Use CSS variables for consistent theming:**

```scss
.component {
  // Map props to CSS variables
  --el-color-primary: v-bind(primaryColor);
  --el-color-success: v-bind(successColor);

  // Use Element Plus patterns
  .el-button {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }
}
```

## API Documentation

### API Client Configuration

The application uses a centralized API client (`app/plugins/api.ts`) that provides:

- **Automatic token refresh** on 401 responses
- **Error handling** with Sentry integration
- **Request/response interceptors**
- **TypeScript interfaces** for all endpoints

### API Module Structure

```typescript
// app/api/modules/auth/index.ts
export default {
  async getAccessToken(credentials: LoginCredentials) {
    return await $api<AuthResponse>('/v1/auth/login', {
      method: 'POST',
      body: credentials
    });
  },

  async refreshToken() {
    return await $api<AuthResponse>('/v1/auth/refresh', {
      method: 'POST'
    });
  }
};
```

### Expected API Response Format

```typescript
interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

interface ApiMeta {
  currentPage: number;
  total: number;
  limit: number;
}
```

## Development Commands

### Basic Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint to check code quality
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm test` - Run Vitest tests
- `pnpm test:ui` - Run tests with UI

### Code Generators

The project includes powerful code generators to accelerate development:

#### API Module Generator

```bash
pnpm create:module <moduleName>
# Example: pnpm create:module cmo
```

**Creates**: `app/api/modules/<moduleName>/index.ts`
**Features**:

- Complete CRUD operations (`findAll`, `getAll`, `show`, `create`, `update`, `destroy`)
- TypeScript interfaces and error handling
- Integration with `useForm()` composable
- Auto-runs code generation and linting
- REST endpoints at `/v1/<moduleName>`

#### Form Component Generator

```bash
pnpm create:form <moduleName> <field1:type:rule> <field2:type:rule> ...
# Examples:
pnpm create:form User name:string:required email:string:required
pnpm create:form Profile bio:textarea:nullable age:number:required
pnpm create:form Settings password:password:required tags:tag-input:nullable
pnpm create:form Product category:select:required features:multiple-select:nullable
```

**Creates**: `app/components/Form/<moduleName>/Create.vue` and `Edit.vue`

**Supported Field Types**:

- `string` - Basic text input using `UiInput`
- `password` - Password input using `UiInput type="password"`
- `number` - Number input using `UiInput type="number"`
- `textarea` - Multi-line text using `UiInput type="textarea" :rows="5"`
- `select` - Single select dropdown using `UiSelect :options="[]"`
- `multiple-select` - Multi-select dropdown using `UiSelect :multiple="true"`
- `tag-input` - Tag input using `UiInputTag` component

**Features**:

- Element Plus form integration with validation
- Automatic `useForm()` composable with smart default values
- Support for required/nullable field validation rules
- Consistent form structure and proper component binding
- Type-appropriate default values (arrays for multi-select, null for select, etc.)

#### Page Generator

```bash
pnpm create:page <path> <typeInterface>
# Example: pnpm create:page configuration/bank IBank
```

**Creates**: `app/pages/<path>/index.vue`
**Features**:

- Complete data table page with CRUD operations
- Query parameter integration for search/filtering
- Table column configuration
- Reactive data fetching with API integration

#### Select Component Generator

```bash
pnpm create:select <path> <apiHandler>
# Example: pnpm create:select User/SelectUser user
```

**Creates**: `app/components/<path>.vue`
**Features**:

- Dropdown component with API data fetching
- Lazy loading with `useAsyncData()`
- Auto-generated camelCase keys
- v-model support and loading states

### Generator Usage Examples

```bash
# Create a complete feature set
pnpm create:module product              # API handlers
pnpm create:form Product name:string:required price:string:required
pnpm create:page products/index IProduct
pnpm create:select Product/SelectProduct product

# This creates:
# - app/api/modules/product/index.ts
# - app/components/Form/Product/Create.vue & Edit.vue
# - app/pages/products/index/index.vue
# - app/components/Product/SelectProduct.vue
```

## Environment Configuration

Required environment variables:

```env
# API Configuration
NUXT_PUBLIC_API_URL=https://api.example.com

# Authentication
NUXT_SECRET_KEY=your-secret-key

# Sentry (optional)
NUXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

---

This documentation provides a comprehensive guide to the application architecture, development patterns, and coding standards. Follow these guidelines to maintain consistency and quality across the codebase.
