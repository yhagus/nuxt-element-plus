# Repository Guidelines

## MAIN RULES, MUST READ BEFORE GOING TO THE NEXT RULE
- This project is a monorepo at it's core.
- We put styling and components theming (base, non-page component) in layers/ui.
- We put composables in layers/base.
- The sub apps structure is being put in `apps`, for example `apps/admin` or `apps/template`.
- Creating component of a page is fine inside the apps. For example if admin have `dashboard.vue`, then it's okay to put, for example, a dashboard component like `RecentUserActivity` in that apps.
- When prompting, if I forgot to mention which `apps` is the context, you may ask me. But if I said things shortly like "in admin..." it most likely mean in `apps/admin`.
- The next rule will only explain about what's happening each app, not explaining anything outside of folder `apps/<app>`.

## Project Structure & Module Organization
- `app/` is the primary Nuxt application code (components, pages, composables, plugins, middleware, utils, types).
- `server/` holds server-side routes or handlers if added later.
- `shared/` contains cross-cutting code shared between app/server. Typically for `types` and `utils`
- `public/` stores static assets served as-is.
- DTOs live in `layers/base/shared/types/dto` with one interface per file, using lower-cased `*.dto.ts` filenames and re-exported from the module index. All the DTO(s) also available via import '#dto'.
- Configuration lives in `nuxt.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `vitest.config.ts`.

## Build, Test, and Development Commands
- `pnpm build` builds the production bundle.

## Coding Style & Naming Conventions
- ESLint is based on `@antfu/eslint-config` with semicolons enabled.
- Vue SFC block order is enforced: `<script>`, `<template>`, `<style>`.
- Naming: PascalCase for components and types, camelCase for composables and utilities, kebab-case for pages/middleware, SCREAMING_SNAKE_CASE for env vars.
- For form, we will store the UI component in folder components/Form. Example: components/Form/User/Create.vue, components/Form/User/Edit.vue.
- If the inputs are too many, you may split it in two (grid-like view). Where the inputs will be left to right when user presses tab (next).
- When you do a page that has DataTable, preferable to declare computed variable of `tableData`, `tableMeta`, and `columns`. You also define your own key in tableData in case you have formatting like example or wording, so columns are just accepting as is.
- All columns preferably have `align: 'center'` and `visible: true`.
- Labels shall be localized to Indonesia (ID, id, id-ID)
- I will provide an example of a DataTable:
```typescript
const tableData = computed(() => {
  return data.value?.data?.map(bundle => ({
    id: bundle.id,
    code: bundle.code,
    name: bundle.name,
    description: bundle.description,
    transactionTypes: bundle.bundle_transaction_type.join(', '),
    price: bundle.price,
    rentalPrice: bundle.rental_price,
    rentalDuration: bundle.rental_duration,
    priceOverride: bundle.is_price_override ? 'Yes' : 'No',
    status: bundle.is_active ? 'Active' : 'Inactive',
  })) ?? [];
});
const tableMeta = computed(() => {
  return {
    afterCursor: data.value?.meta?.next_cursor,
    hasMore: data.value?.meta?.has_next_page,
  };
});
const columns: TableColumn[] = [
  {
    label: 'Kode',
    prop: 'code',
    visible: true,
  },
  {
    label: 'Nama',
    prop: 'name',
    visible: true,
  },
  {
    label: 'Deskripsi',
    prop: 'description',
    visible: true,
  },
  {
    label: 'Tipe Transaksi',
    prop: 'transactionTypes',
    visible: true,
  },
  {
    label: 'Harga',
    prop: 'price',
    visible: true,
  },
  {
    label: 'Harga Sewa',
    prop: 'rentalPrice',
    visible: true,
  },
  {
    label: 'Durasi Sewa',
    prop: 'rentalDuration',
    visible: true,
  },
  {
    label: 'Price Override',
    prop: 'priceOverride',
    visible: true,
  },
  {
    label: 'Status',
    prop: 'status',
    visible: true,
  },
];
```

## UI Styling
- Do not use CSS. Only use SCSS.

## Configuration Notes
- Node.js 22+ is required (see `package.json` engines).
- This Nuxt app is SPA-oriented with TailwindCSS and i18n configured; follow existing patterns in `app/`.

### API Communication

The application expects a REST API backend with:
- Bearer token authentication
- Standardized error response format with `errors` field
- Token refresh endpoint at `/auth/refresh`
- Base API URL configured via server route `/servers`

## Core Development Patterns (MEMORIZE FOR FUTURE SESSIONS)

**API Endpoint Usage**:

- **ALWAYS use `api` handlers** - Never use `$fetch` directly
- Example: `api.auth.getAccessToken(form)`, `api.users.create(data)`
- Handlers are in `app/api/modules/` with proper TypeScript definitions
- Automatic token refresh, error handling, and Sentry integration built-in

**Form Handling (CRITICAL)**:

- **ALWAYS wrap forms with `useForm()`** - Never use manual form state or reactive()
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
- Prefer wrapper components in `layers/ui` (Ui components) instead of using Element Plus components directly in app pages/forms.

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

**Standard Form Component Structure**:

Here I will give an example if the resource is called `Bundle`

.../Create.vue:
```vue
<script setup lang="ts">
const form = useForm({
  name: null,
  // form fields
  ...
});
const errors = computed<Record<string, string[]>>(() => form.errors?.data ?? {});

async function handleSubmit() {
  await api.bundle.post(form, {
    onResponse({ response }) {
      if (response.ok) {
        // Success notifications:
        const toast = useToast();
        toast.success('Data saved successfully!');
      }
    }
  });
}
</script>

<template>
  <UiForm v-model="form" @submit="handleSubmit">
    <UiFormItem label="Field" prop="field" required :error="errors.field">
      <UiInput v-model="form.field" />
    </UiFormItem>
    <UiButton :loading="form.processing" type="submit">
      Submit
    </UiButton>
  </UiForm>
</template>
```

.../Edit.vue:
```vue
<script setup lang="ts">
interface Props {
  bundleId: string;
  bundle?: Partial<...Data>;
}
const props = defineProps<Props>();
const form = useForm({
  name: null,
  // form fields
  ...
});
const errors = computed<Record<string, string[]>>(() => form.errors?.data ?? {});

async function handleSubmit() {
  await api.bundle.patch(form, props.bundleId, {
    onResponse({ response }) {
      if (response.ok) {
        // Success notifications:
        const toast = useToast();
        toast.success('Data saved successfully!');
      }
    }
  });
}

watch(
  () => props.bundle,
  (bundle) => {
    if (!bundle) {
      return;
    }

    form.code = bundle.code ?? null;
    // ...
  },
  { immediate: true },
);
</script>

<template>
  <UiForm v-model="form" @submit="handleSubmit">
    <UiFormItem label="Field" prop="field" required :error="errors.field">
      <UiInput v-model="form.field" />
    </UiFormItem>
    <UiButton :loading="form.processing" type="submit">
      Submit
    </UiButton>
  </UiForm>
</template>
```

A full page of basic CRUD example of the resource entity `Bundle`, if it returns the meta of cursor pagination:
```vue
<script setup lang="ts">
import type { BundleEntity } from '#dto';

const route = useRoute();
const { setTitle } = useTitle();
const toast = useToast();

const { data, loading, loadMore } = await api.bundle.useIndex({
  query: {
    search: computed(() => route.query.search),
  },
});

const openCreate = ref(false);
const openEdit = ref(false);
const selectedBundle = ref<BundleEntity | null>(null);

const tableData = computed(() => {
  return data.value?.data?.map(bundle => ({
    id: bundle.id,
    code: bundle.code,
    name: bundle.name,
    description: bundle.description,
    transactionTypes: bundle.bundle_transaction_type.join(', '),
    price: bundle.price,
    rentalPrice: bundle.rental_price,
    rentalDuration: bundle.rental_duration,
    priceOverride: bundle.is_price_override ? 'Ya' : 'Tidak',
    status: bundle.is_active ? 'Aktif' : 'Nonaktif',
  })) ?? [];
});

const tableMeta = computed(() => {
  return {
    afterCursor: data.value?.meta?.next_cursor,
    hasMore: data.value?.meta?.has_next_page,
  };
});

const columns: TableColumn[] = [
  { label: 'Kode', prop: 'code', visible: true, align: 'center' },
  { label: 'Nama', prop: 'name', visible: true, align: 'center' },
  { label: 'Deskripsi', prop: 'description', visible: true, align: 'center' },
  { label: 'Tipe Transaksi', prop: 'transactionTypes', visible: true, align: 'center' },
  { label: 'Harga', prop: 'price', visible: true, align: 'center' },
  { label: 'Harga Sewa', prop: 'rentalPrice', visible: true, align: 'center' },
  { label: 'Durasi Sewa', prop: 'rentalDuration', visible: true, align: 'center' },
  { label: 'Price Override', prop: 'priceOverride', visible: true, align: 'center' },
  { label: 'Status', prop: 'status', visible: true, align: 'center' },
  { label: 'Aksi', prop: 'action', visible: true, align: 'center', width: 80 },
];

async function handleEdit(id: string) {
  const response = await api.bundle.show(id);
  selectedBundle.value = response.data;
  openEdit.value = true;
}

async function handleDelete(id: string) {
  await api.bundle.destroy(id, {
    onResponse({ response }) {
      if (response.ok) {
        toast.success('Bundle berhasil dihapus.');
      }
    },
  });
}

const actionItems: DropdownItem[] = [
  {
    label: 'Edit',
    command: 'edit',
    icon: 'lucide:edit-3',
    onClick: (value) => handleEdit(value as string),
  },
  {
    label: 'Hapus',
    command: 'delete',
    icon: 'lucide:trash-2',
    onClick: (value) => handleDelete(value as string),
  },
];

async function handlePageChange(value: { search?: string }) {
  await URLRouteQuery({
    search: value.search,
  });
}

setTitle('Bundle');
definePageMeta({
  layout: 'app',
  middleware: ['auth'],
});
</script>

<template>
  <div>
    <UiDataCursorTable
      table-key="bundles-table"
      :data="tableData"
      :columns="columns"
      :meta="tableMeta"
      :loading="loading"
      :search-value="route.query.search"
      @on-page-change="handlePageChange"
      @on-load-more="() => loadMore()"
    >
      <template #toolbar>
        <UiButton variant="primary" @click="() => openCreate = true">
          Buat Bundle
        </UiButton>
      </template>
      <template #action="{ row }">
        <UiDropdown trigger="click" :dropdown-items="actionItems" :value="row.id">
          <UiButton variant="text" size="small" type="button">
            <NIcon name="lucide:more-horizontal" size="16px" />
          </UiButton>
        </UiDropdown>
      </template>
    </UiDataCursorTable>
  </div>

  <UiDialog v-model="openCreate" title="Buat Bundle">
    <FormBundleCreate />
  </UiDialog>
  <UiDialog v-model="openEdit" title="Ubah Bundle">
    <FormBundleEdit v-if="selectedBundle" :bundle-id="selectedBundle.id" :bundle="selectedBundle" />
  </UiDialog>
</template>

<style scoped lang="scss">
</style>
```

## Basic CRUD Page Checklist (Cursor paginator)
- Use `api.<resource>.useIndex({ query: { search: computed(() => route.query.search) } })` and destructure `data`, `loading`, `loadMore`, and `refresh`.
- Build `tableData`, `tableMeta`, and `columns` computed values; set all columns `align: 'center'`, `visible: true`, and action column `width: 80`.
- Use `<UiDataCursorTable />` with a toolbar button to open create dialog.
- Use `Form<Resource>Create` and `Form<Resource>Edit` in dialogs.
- **Forms must emit `onFinish`** when `response.ok` (same block as `toast.success`) and the page should close dialog + call `refresh()` on `@on-finish`.

This architecture provides a scalable, maintainable component system with clear separation of concerns between UI primitives, forms, business logic, and layout components.

## Basic CRUD Page Checklist (Offset paginator)
- 