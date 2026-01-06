<script setup lang="ts">
const dialogVisible = ref<boolean>(false);
const confirmationDialogVisible = ref<boolean>(false);
const dropdownItems = [
  { label: '✏️ Edit Profile', value: 'edit' },
  { label: '🗑️ Delete Account', value: 'delete' },
  { label: '🔗 Share Profile', value: 'share' },
  { label: '⚙️ Settings', value: 'settings' },
  { label: '📤 Export Data', value: 'export' },
];
const selectOptions = [
  { label: '🌟 Premium Plan', value: 'premium' },
  { label: '💎 Enterprise Plan', value: 'enterprise' },
  { label: '🚀 Starter Plan', value: 'starter' },
  { label: '👨‍💻 Developer Plan', value: 'developer' },
  { label: '🏢 Business Plan', value: 'business' },
];
const tableData = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Product Manager', status: 'Active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Marcus Rodriguez', email: 'marcus.r@startup.io', role: 'Lead Developer', status: 'Active', lastLogin: '5 minutes ago' },
  { id: 3, name: 'Elena Kowalski', email: 'elena.k@design.agency', role: 'UI/UX Designer', status: 'Away', lastLogin: '1 day ago' },
  { id: 4, name: 'James Thompson', email: 'j.thompson@enterprise.com', role: 'System Admin', status: 'Active', lastLogin: '30 minutes ago' },
  { id: 5, name: 'Aisha Patel', email: 'aisha.patel@tech.co', role: 'Data Analyst', status: 'Offline', lastLogin: '3 days ago' },
];
const formData = ref({
  name: 'Alexandra Johnson',
  email: 'alexandra.j@example.com',
  message: 'Hello! I would like to inquire about your premium services and potential partnership opportunities for our growing startup.',
});
const checkboxValue = ref(true);
const inputValue = ref('Claude AI Assistant');
const selectValue = ref('premium');
const tagValue = ref(['javascript', 'typescript', 'vue', 'nuxt', 'tailwind']);
const currentTab = ref('tab1');
const tabs = [
  { key: 'tab1', label: '📊 Dashboard' },
  { key: 'tab2', label: '👥 Team Members' },
  { key: 'tab3', label: '📈 Analytics' },
  { key: 'tab4', label: '⚙️ Settings' },
];

// DataTable example data
const employeeData = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    department: 'Product',
    position: 'Product Manager',
    salary: 95000,
    bonus: 15000,
    benefits: 8500,
    location: 'San Francisco',
    country: 'USA',
    joinDate: '2022-01-15',
    status: 'Active',
    projects: 12,
    rating: 4.8,
    skills: ['Product Strategy', 'Analytics', 'Leadership'],
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    email: 'marcus.r@startup.io',
    department: 'Engineering',
    position: 'Lead Developer',
    salary: 120000,
    bonus: 20000,
    benefits: 10500,
    location: 'Austin',
    country: 'USA',
    joinDate: '2021-03-22',
    status: 'Active',
    projects: 18,
    rating: 4.9,
    skills: ['Vue.js', 'Node.js', 'System Design'],
  },
  {
    id: 3,
    name: 'Elena Kowalski',
    email: 'elena.k@design.agency',
    department: 'Design',
    position: 'Senior Designer',
    salary: 78000,
    bonus: 12000,
    benefits: 7200,
    location: 'Berlin',
    country: 'Germany',
    joinDate: '2020-09-10',
    status: 'Active',
    projects: 25,
    rating: 4.7,
    skills: ['UI/UX', 'Figma', 'Design Systems'],
  },
  {
    id: 4,
    name: 'James Thompson',
    email: 'j.thompson@enterprise.com',
    department: 'Operations',
    position: 'System Admin',
    salary: 85000,
    bonus: 10000,
    benefits: 8000,
    location: 'London',
    country: 'UK',
    joinDate: '2019-11-05',
    status: 'Active',
    projects: 8,
    rating: 4.6,
    skills: ['DevOps', 'AWS', 'Security'],
  },
  {
    id: 5,
    name: 'Aisha Patel',
    email: 'aisha.patel@tech.co',
    department: 'Analytics',
    position: 'Data Analyst',
    salary: 70000,
    bonus: 8000,
    benefits: 6500,
    location: 'Mumbai',
    country: 'India',
    joinDate: '2023-02-14',
    status: 'Probation',
    projects: 5,
    rating: 4.5,
    skills: ['Python', 'SQL', 'Tableau'],
  },
];

// DataTable columns with nested structure
const employeeColumns: TableColumn[] = [
  {
    label: 'No',
    prop: 'No',
    type: 'index',
    align: 'center',
    width: 50,
    visible: true,
  },
  {
    prop: 'name',
    label: 'Employee Name',
    width: 200,
    visible: true,
    sort: true,
  },
  {
    prop: 'contact',
    label: 'Contact Information',
    visible: true,
    children: [
      {
        prop: 'email',
        label: 'Email Address',
        width: 250,
        visible: true,
      },
      {
        prop: 'location',
        label: 'Location',
        width: 120,
        visible: true,
      },
      {
        prop: 'country',
        label: 'Country',
        width: 100,
        visible: true,
      },
    ],
  },
  {
    prop: 'employment',
    label: 'Employment Details',
    visible: true,
    children: [
      {
        prop: 'department',
        label: 'Department',
        width: 120,
        visible: true,
      },
      {
        prop: 'position',
        label: 'Position',
        width: 150,
        visible: true,
      },
      {
        prop: 'joinDate',
        label: 'Join Date',
        width: 120,
        visible: true,
      },
      {
        prop: 'status',
        label: 'Status',
        width: 100,
        visible: true,
      },
    ],
  },
  {
    prop: 'compensation',
    label: 'Compensation Package',
    visible: true,
    children: [
      {
        prop: 'salary',
        label: 'Base Salary',
        width: 120,
        visible: true,
        align: 'right',
      },
      {
        prop: 'bonus',
        label: 'Annual Bonus',
        width: 120,
        visible: true,
        align: 'right',
      },
      {
        prop: 'benefits',
        label: 'Benefits',
        width: 100,
        visible: true,
        align: 'right',
      },
    ],
  },
  {
    prop: 'performance',
    label: 'Performance',
    visible: true,
    children: [
      {
        prop: 'projects',
        label: 'Projects',
        width: 80,
        visible: true,
        align: 'center',
      },
      {
        prop: 'rating',
        label: 'Rating',
        width: 80,
        visible: true,
        align: 'center',
      },
    ],
  },
  {
    prop: 'skills',
    label: 'Skills',
    width: 200,
    visible: true,
  },
];

// Pagination meta for DataTable
const tableMeta = ref({
  currentPage: 1,
  limit: 25,
  total: 247,
  totalPages: 10,
});

// Filter options for DataTable
const tableFilters = ref({
  department: [
    { label: 'Engineering', value: 'engineering', count: 45 },
    { label: 'Product', value: 'product', count: 23 },
    { label: 'Design', value: 'design', count: 18 },
    { label: 'Operations', value: 'operations', count: 12 },
    { label: 'Analytics', value: 'analytics', count: 8 },
  ],
  status: [
    { label: 'Active', value: 'active', count: 89 },
    { label: 'Probation', value: 'probation', count: 12 },
    { label: 'Inactive', value: 'inactive', count: 5 },
  ],
  location: [
    { label: 'San Francisco', value: 'san_francisco', count: 34 },
    { label: 'Austin', value: 'austin', count: 28 },
    { label: 'Berlin', value: 'berlin', count: 22 },
    { label: 'London', value: 'london', count: 18 },
    { label: 'Mumbai', value: 'mumbai', count: 14 },
  ],
});

// Active filters for DataTable
const activeTableFilters = ref([
  { key: 'department', label: 'Department', value: 'engineering', displayValue: 'Engineering' },
  { key: 'status', label: 'Status', value: 'active', displayValue: 'Active' },
]);

// Export options for DataTable
const exportOptions = ref([
  { label: 'Export to PDF', value: 'pdf', icon: '📄' },
  { label: 'Export to CSV', value: 'csv', icon: '📊' },
  { label: 'Export to Excel', value: 'xlsx', icon: '📗' },
]);
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-6xl space-y-12">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">
          UI Components Showcase
        </h1>
        <p class="mt-2 text-gray-600">
          All custom UI components from app/components/_Ui
        </p>
      </div>

      <!-- Buttons -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          Buttons
        </h2>
        <div class="flex flex-wrap gap-4">
          <UiButton>Default Button</UiButton>
          <UiButton variant="primary">
            Primary Button
          </UiButton>
          <UiButton variant="secondary">
            Secondary Button
          </UiButton>
          <UiButton variant="danger">
            Danger Button
          </UiButton>
          <UiButton disabled>
            Disabled Button
          </UiButton>
          <UiButton loading>
            Loading Button
          </UiButton>
        </div>
      </section>

      <!-- Custom Themed Buttons -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          Custom Themed Buttons
        </h2>
        <p class="text-gray-600">
          Examples of buttons with custom colors using SASS theming
        </p>

        <div class="space-y-6">
          <!-- Brand Colors -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Brand Colors
            </h3>
            <div class="flex flex-wrap gap-4">
              <UiButton
                variant="primary"
                color="#6366f1"
                border-radius="8px"
              >
                Indigo Brand
              </UiButton>
              <UiButton
                variant="success"
                color="#10b981"
                border-radius="12px"
              >
                Emerald Success
              </UiButton>
              <UiButton
                variant="warning"
                color="#f59e0b"
                border-radius="6px"
              >
                Amber Warning
              </UiButton>
              <UiButton
                variant="danger"
                color="#ef4444"
                border-radius="16px"
              >
                Red Danger
              </UiButton>
              <UiButton
                variant="info"
                color="#8b5cf6"
                border-radius="20px"
              >
                Purple Info
              </UiButton>
            </div>
          </div>

          <!-- Modern Gradients -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Modern Colors
            </h3>
            <div class="flex flex-wrap gap-4">
              <UiButton
                variant="primary"
                color="#ff6b6b"
                border-radius="25px"
                round
              >
                Coral Pink
              </UiButton>
              <UiButton
                variant="success"
                color="#4ecdc4"
                border-radius="4px"
              >
                Teal Fresh
              </UiButton>
              <UiButton
                variant="warning"
                color="#ffa726"
                border-radius="12px"
              >
                Orange Warm
              </UiButton>
              <UiButton
                variant="info"
                color="#42a5f5"
                border-radius="8px"
              >
                Sky Blue
              </UiButton>
            </div>
          </div>

          <!-- Dark Theme -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Dark Theme
            </h3>
            <div class="flex flex-wrap gap-4">
              <UiButton
                variant="primary"
                color="#1f2937"
                border-radius="6px"
              >
                Dark Slate
              </UiButton>
              <UiButton
                variant="success"
                color="#374151"
                border-radius="8px"
              >
                Dark Gray
              </UiButton>
              <UiButton
                variant="danger"
                color="#7c2d12"
                border-radius="10px"
              >
                Dark Orange
              </UiButton>
            </div>
          </div>

          <!-- Size Variants with Custom Colors -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Size Variants
            </h3>
            <div class="flex flex-wrap items-center gap-4">
              <UiButton
                variant="primary"
                color="#8b5cf6"
                border-radius="4px"
                size="small"
              >
                Small Purple
              </UiButton>
              <UiButton
                variant="primary"
                color="#8b5cf6"
                border-radius="6px"
                size="default"
              >
                Default Purple
              </UiButton>
              <UiButton
                variant="primary"
                color="#8b5cf6"
                border-radius="8px"
                size="large"
              >
                Large Purple
              </UiButton>
            </div>
          </div>

          <!-- Special Shapes -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Special Shapes
            </h3>
            <div class="flex flex-wrap items-center gap-4">
              <UiButton
                variant="primary"
                color="#ec4899"
                border-radius="25px"
                round
              >
                Rounded Pink
              </UiButton>
              <UiButton
                variant="success"
                color="#059669"
                circle
                title="Circle Button"
              >
                ✓
              </UiButton>
              <UiButton
                variant="warning"
                color="#d97706"
                border-radius="2px"
              >
                Sharp Edges
              </UiButton>
              <UiButton
                variant="info"
                color="#0284c7"
                border-radius="16px"
                text
              >
                Text Button
              </UiButton>
            </div>
          </div>

          <!-- Interactive Examples -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Interactive Examples
            </h3>
            <div class="flex flex-wrap gap-4">
              <UiButton
                variant="primary"
                color="#7c3aed"
                :loading="true"
                border-radius="8px"
                @click="() => useToast().success('Purple button clicked!')"
              >
                Click Me (Purple)
              </UiButton>
              <UiButton
                variant="success"
                color="#16a34a"
                :loading="true"
                border-radius="12px"
                @click="() => useNotification().success('Success!', 'Green themed button works perfectly')"
              >
                Show Notification
              </UiButton>
              <UiButton
                variant="warning"
                color="#ea580c"
                border-radius="6px"
                loading
              >
                Loading State
              </UiButton>
              <UiButton
                variant="danger"
                color="#dc2626"
                border-radius="10px"
                disabled
              >
                Disabled State
              </UiButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Form Components -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">
          Form Components
        </h2>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <UiFormItem label="Text Input" required>
              <UiInput v-model="inputValue" placeholder="Enter text here" />
            </UiFormItem>

            <UiFormItem label="Select Dropdown">
              <UiSelect v-model="selectValue" :options="selectOptions" placeholder="Choose an option" />
            </UiFormItem>

            <UiFormItem label="Tags Input">
              <UiInputTag v-model="tagValue" placeholder="Add tags" />
            </UiFormItem>

            <UiFormItem label="Checkbox">
              <UiCheckbox v-model="checkboxValue">
                I agree to the terms
              </UiCheckbox>
            </UiFormItem>
          </div>

          <UiForm v-model="formData" class="space-y-4">
            <UiFormItem label="Full Name" prop="name" required>
              <UiInput v-model="formData.name" placeholder="Your full name" />
            </UiFormItem>
            <UiFormItem label="Email" prop="email" required>
              <UiInput v-model="formData.email" type="email" placeholder="your@email.com" />
            </UiFormItem>
            <UiFormItem label="Message" prop="message">
              <UiInput v-model="formData.message" type="textarea" placeholder="Your message" />
            </UiFormItem>
            <div class="flex justify-end">
              <UiButton type="submit">
                Submit Form
              </UiButton>
            </div>
          </UiForm>
        </div>
      </section>

      <!-- Dialogs -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          Dialogs
        </h2>
        <div class="flex gap-4">
          <UiButton @click="() => dialogVisible = true">
            Open Dialog: {{ dialogVisible }}
          </UiButton>

          <UiConfirmationDialog
            title="Delete Item"
            message="Are you sure you want to delete this item? This action cannot be undone."
            @confirm="confirmationDialogVisible = false"
            @cancel="confirmationDialogVisible = false"
          >
            <UiButton @click="() => confirmationDialogVisible = true">
              Open Confirmation
            </UiButton>
          </UiConfirmationDialog>
        </div>

        <UiDialog v-model="dialogVisible" title="Sample Dialog">
          <p>This is a sample dialog content. You can put any content here.</p>
          <template #footer>
            <UiButton @click="dialogVisible = false">
              Close
            </UiButton>
          </template>
        </UiDialog>
      </section>

      <!-- Dropdown -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          Dropdown
        </h2>
        <UiDropdown :items="dropdownItems" @select="(item) => console.log('Selected:', item)">
          <UiButton>Actions ▼</UiButton>
        </UiDropdown>
      </section>

      <!-- Tabs -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          Tabs
        </h2>
        <UiTab v-model="currentTab" :tabs="tabs">
          <div v-if="currentTab === 'tab1'" class="p-6">
            <h3 class="mb-4 text-lg font-medium">
              📊 Dashboard Overview
            </h3>
            <div class="grid gap-4 md:grid-cols-3">
              <div class="rounded-lg bg-blue-50 p-4">
                <p class="text-2xl font-bold text-blue-600">
                  1,247
                </p>
                <p class="text-sm text-gray-600">
                  Total Users
                </p>
              </div>
              <div class="rounded-lg bg-green-50 p-4">
                <p class="text-2xl font-bold text-green-600">
                  $24,580
                </p>
                <p class="text-sm text-gray-600">
                  Monthly Revenue
                </p>
              </div>
              <div class="rounded-lg bg-purple-50 p-4">
                <p class="text-2xl font-bold text-purple-600">
                  89.5%
                </p>
                <p class="text-sm text-gray-600">
                  Success Rate
                </p>
              </div>
            </div>
          </div>
          <div v-else-if="currentTab === 'tab2'" class="p-6">
            <h3 class="mb-4 text-lg font-medium">
              👥 Team Members
            </h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  SC
                </div>
                <div>
                  <p class="font-medium">
                    Sarah Chen
                  </p>
                  <p class="text-sm text-gray-500">
                    Product Manager
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                <div class="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                  MR
                </div>
                <div>
                  <p class="font-medium">
                    Marcus Rodriguez
                  </p>
                  <p class="text-sm text-gray-500">
                    Lead Developer
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                <div class="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                  EK
                </div>
                <div>
                  <p class="font-medium">
                    Elena Kowalski
                  </p>
                  <p class="text-sm text-gray-500">
                    UI/UX Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="currentTab === 'tab3'" class="p-6">
            <h3 class="mb-4 text-lg font-medium">
              📈 Analytics Performance
            </h3>
            <div class="space-y-4">
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <p class="mb-2 text-sm font-medium text-gray-700">
                  Page Views
                </p>
                <div class="h-2 rounded-full bg-gray-200">
                  <div class="h-2 w-3/4 rounded-full bg-blue-500" />
                </div>
                <p class="mt-1 text-xs text-gray-500">
                  18,542 views this month
                </p>
              </div>
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <p class="mb-2 text-sm font-medium text-gray-700">
                  Conversion Rate
                </p>
                <div class="h-2 rounded-full bg-gray-200">
                  <div class="h-2 w-4/5 rounded-full bg-green-500" />
                </div>
                <p class="mt-1 text-xs text-gray-500">
                  4.2% conversion rate
                </p>
              </div>
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <p class="mb-2 text-sm font-medium text-gray-700">
                  User Engagement
                </p>
                <div class="h-2 rounded-full bg-gray-200">
                  <div class="h-2 w-2/3 rounded-full bg-purple-500" />
                </div>
                <p class="mt-1 text-xs text-gray-500">
                  7m 23s average session
                </p>
              </div>
            </div>
          </div>
          <div v-else-if="currentTab === 'tab4'" class="p-6">
            <h3 class="mb-4 text-lg font-medium">
              ⚙️ System Settings
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                <div>
                  <p class="font-medium">
                    Email Notifications
                  </p>
                  <p class="text-sm text-gray-500">
                    Receive updates via email
                  </p>
                </div>
                <UiCheckbox v-model="checkboxValue" />
              </div>
              <div class="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                <div>
                  <p class="font-medium">
                    Auto-save
                  </p>
                  <p class="text-sm text-gray-500">
                    Automatically save changes
                  </p>
                </div>
                <UiCheckbox :model-value="true" />
              </div>
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <p class="mb-2 font-medium">
                  Default Language
                </p>
                <UiSelect
                  model-value="en"
                  :options="[
                    { label: 'English', value: 'en' },
                    { label: 'Spanish', value: 'es' },
                    { label: 'French', value: 'fr' },
                  ]"
                />
              </div>
            </div>
          </div>
        </UiTab>
      </section>

      <!-- States -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">
          State Components
        </h2>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-4 text-lg font-medium">
              Empty State
            </h3>
            <UiEmptyState
              title="No Projects Found"
              description="You haven't created any projects yet. Start by creating your first project to see it here."
            />
          </div>

          <div>
            <h3 class="mb-4 text-lg font-medium">
              Data State
            </h3>
            <UiDataState
              :loading="false"
              :error="false"
              :empty="false"
              :data="tableData"
            >
              <div class="rounded bg-green-50 p-4 text-green-800">
                ✅ Data loaded successfully! Found {{ tableData.length }} team members with active projects.
              </div>
            </UiDataState>
          </div>
        </div>

        <div class="space-y-6">
          <h3 class="text-lg font-medium">
            Loading States
          </h3>
          <div class="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 class="mb-2 font-medium">
                Spinner Loading
              </h4>
              <UiLoadingState type="spinner" />
            </div>

            <div>
              <h4 class="mb-2 font-medium">
                List Loading
              </h4>
              <div class="max-h-64 overflow-hidden">
                <UiLoadingState type="list" />
              </div>
            </div>
          </div>

          <div>
            <h4 class="mb-2 font-medium">
              Card Loading
            </h4>
            <div class="max-h-96 overflow-hidden">
              <UiLoadingState type="card" />
            </div>
          </div>

          <div>
            <h4 class="mb-2 font-medium">
              Form Loading
            </h4>
            <div class="max-h-96 overflow-hidden">
              <UiLoadingState type="form" />
            </div>
          </div>
        </div>
      </section>

      <!-- DataTable with Nested Columns -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          DataTable with Nested Columns
        </h2>
        <p class="text-gray-600">
          Advanced data table with grouped headers, column visibility controls, search, and pagination
        </p>

        <div class="space-y-6">
          <!-- Basic DataTable Example -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Employee Management Table
            </h3>
            <div class="rounded-lg bg-white p-6 shadow-sm">
              <p class="mb-4 text-sm text-gray-600">
                Features: Nested columns, column visibility toggle, search, selection, and pagination
              </p>

              <UiDataTable
                :data="employeeData"
                :columns="employeeColumns"
                :meta="tableMeta"
                :filters="tableFilters"
                :active-filters="activeTableFilters"
                :export-options="exportOptions"
                table-key="employee-table"
                @selection-change="(rows) => console.log('Selected rows:', rows)"
                @on-page-change="(params) => console.log('Page changed:', params)"
                @on-search="(query) => console.log('Search query:', query)"
                @on-filter-change="(filter) => console.log('Filter changed:', filter)"
                @on-export="(exportData) => console.log('Export requested:', exportData)"
                @on-reset="() => console.log('Filters reset')"
              >
                <!-- Custom slot for salary formatting -->
                <template #salary="{ row }">
                  <span class="font-medium text-green-600">
                    ${{ row.salary.toLocaleString() }}
                  </span>
                </template>

                <!-- Custom slot for bonus formatting -->
                <template #bonus="{ row }">
                  <span class="font-medium text-blue-600">
                    ${{ row.bonus.toLocaleString() }}
                  </span>
                </template>

                <!-- Custom slot for benefits formatting -->
                <template #benefits="{ row }">
                  <span class="text-purple-600">
                    ${{ row.benefits.toLocaleString() }}
                  </span>
                </template>

                <!-- Custom slot for status badge -->
                <template #status="{ row }">
                  <span
                    :class="{
                      'bg-green-100 text-green-800': row.status === 'Active',
                      'bg-yellow-100 text-yellow-800': row.status === 'Probation',
                      'bg-red-100 text-red-800': row.status === 'Inactive',
                    }"
                    class="inline-flex rounded-full px-2 py-1 text-xs font-medium"
                  >
                    {{ row.status }}
                  </span>
                </template>

                <!-- Custom slot for projects count -->
                <template #projects="{ row }">
                  <span class="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {{ row.projects }}
                  </span>
                </template>

                <!-- Custom slot for rating with stars -->
                <template #rating="{ row }">
                  <div class="flex items-center">
                    <span class="mr-1 text-yellow-400">⭐</span>
                    <span class="font-medium">{{ row.rating }}</span>
                  </div>
                </template>

                <!-- Custom slot for skills as tags -->
                <template #skills="{ row }">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="skill in row.skills"
                      :key="skill"
                      class="inline-flex rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </template>

                <!-- Toolbar slot for additional actions -->
                <template #toolbar>
                  <UiButton variant="primary" @click="() => useToast().info('Add employee clicked!')">
                    Add Employee
                  </UiButton>
                </template>
              </UiDataTable>
            </div>
          </div>

          <!-- Column Structure Explanation -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Nested Column Structure
            </h3>
            <div class="rounded-lg bg-blue-50 p-6">
              <p class="mb-3 text-sm font-medium text-blue-900">
                The table demonstrates these nested column groups:
              </p>
              <ul class="space-y-2 text-sm text-blue-800">
                <li>
                  <strong>Contact Information</strong> → Email Address, Location, Country
                </li>
                <li>
                  <strong>Employment Details</strong> → Department, Position, Join Date, Status
                </li>
                <li>
                  <strong>Compensation Package</strong> → Base Salary, Annual Bonus, Benefits
                </li>
                <li>
                  <strong>Performance</strong> → Projects Count, Rating
                </li>
              </ul>
              <p class="mt-3 text-xs text-blue-700">
                ✨ Click the column visibility button (next to search) to toggle individual columns on/off!
              </p>
            </div>
          </div>

          <!-- Feature Highlights -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-700">
              Key Features Demonstrated
            </h3>
            <div class="grid gap-4 md:grid-cols-2">
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <h4 class="mb-2 font-medium text-gray-900">
                  🔍 Search & Filter
                </h4>
                <p class="text-sm text-gray-600">
                  Real-time search across all table data with debounced input
                </p>
              </div>
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <h4 class="mb-2 font-medium text-gray-900">
                  👁️ Column Visibility
                </h4>
                <p class="text-sm text-gray-600">
                  Toggle individual columns and persist settings in localStorage
                </p>
              </div>
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <h4 class="mb-2 font-medium text-gray-900">
                  ✅ Row Selection
                </h4>
                <p class="text-sm text-gray-600">
                  Multi-row selection with checkbox controls and event handling
                </p>
              </div>
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <h4 class="mb-2 font-medium text-gray-900">
                  🎨 Custom Rendering
                </h4>
                <p class="text-sm text-gray-600">
                  Custom cell rendering with slots for badges, formatting, and actions
                </p>
              </div>
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <h4 class="mb-2 font-medium text-gray-900">
                  📄 Pagination
                </h4>
                <p class="text-sm text-gray-600">
                  Integrated pagination with page size controls and navigation
                </p>
              </div>
              <div class="rounded-lg bg-white p-4 shadow-sm">
                <h4 class="mb-2 font-medium text-gray-900">
                  🏗️ Nested Headers
                </h4>
                <p class="text-sm text-gray-600">
                  Multi-level column grouping for organized data presentation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pagination -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          Pagination
        </h2>
        <div class="space-y-8">
          <div>
            <h3 class="mb-4 text-lg font-medium">
              Default Theme - Full Example
            </h3>
            <div class="rounded-lg bg-white p-6 shadow-sm">
              <p class="mb-4 text-sm text-gray-600">
                Shows: 10 items per page selector (left) + pagination buttons (right)
              </p>
              <UiPagination
                :current-page="5"
                :total="1247"
                :page-size="10"
                :page-sizes="[5, 10, 20, 50, 100]"
                @page-change="(page) => console.log('Page changed to:', page)"
                @size-change="(size) => console.log('Size changed to:', size)"
              />
            </div>
          </div>

          <div>
            <h3 class="mb-4 text-lg font-medium">
              Large Dataset Example
            </h3>
            <div class="rounded-lg bg-white p-6 shadow-sm">
              <p class="mb-4 text-sm text-gray-600">
                Large dataset showing ellipsis (...) between page numbers
              </p>
              <UiPagination
                :current-page="45"
                :total="10000"
                :page-size="20"
                :page-sizes="[10, 20, 50, 100, 200]"
                @page-change="(page) => console.log('Page changed to:', page)"
                @size-change="(size) => console.log('Size changed to:', size)"
              />
            </div>
          </div>

          <div>
            <h3 class="mb-4 text-lg font-medium">
              Custom Theme (Green)
            </h3>
            <div class="rounded-lg bg-white p-6 shadow-sm">
              <p class="mb-4 text-sm text-gray-600">
                Custom green theme with different page sizes
              </p>
              <UiPagination
                :current-page="3"
                :total="500"
                :page-size="25"
                :page-sizes="[10, 25, 50, 100]"
                active-color="#10b981"
                hover-color="#34d399"
                border-color="#d1fae5"
                @page-change="(page) => console.log('Page changed to:', page)"
                @size-change="(size) => console.log('Size changed to:', size)"
              />
            </div>
          </div>

          <div>
            <h3 class="mb-4 text-lg font-medium">
              Custom Theme (Purple)
            </h3>
            <div class="rounded-lg bg-white p-6 shadow-sm">
              <p class="mb-4 text-sm text-gray-600">
                Custom purple theme with different text color
              </p>
              <UiPagination
                :current-page="12"
                :total="2400"
                :page-size="50"
                :page-sizes="[25, 50, 100, 200]"
                active-color="#8b5cf6"
                hover-color="#a78bfa"
                border-color="#e9d5ff"
                text-color="#4c1d95"
                @page-change="(page) => console.log('Page changed to:', page)"
                @size-change="(size) => console.log('Size changed to:', size)"
              />
            </div>
          </div>

          <div>
            <h3 class="mb-4 text-lg font-medium">
              Small Dataset (Single Page)
            </h3>
            <div class="rounded-lg bg-white p-6 shadow-sm">
              <p class="mb-4 text-sm text-gray-600">
                When total items fit in one page, pagination hides by default
              </p>
              <UiPagination
                :current-page="1"
                :total="8"
                :page-size="10"
                :page-sizes="[5, 10, 20]"
                :hide-on-single-page="true"
                @page-change="(page) => console.log('Page changed to:', page)"
                @size-change="(size) => console.log('Size changed to:', size)"
              />
              <p class="mt-2 text-xs text-gray-500">
                ↑ Try changing page size to see pagination appear
              </p>
            </div>
          </div>

          <div>
            <h3 class="mb-4 text-lg font-medium">
              Interactive Example
            </h3>
            <div class="rounded-lg bg-white p-6 shadow-sm">
              <p class="mb-4 text-sm text-gray-600">
                Click on page numbers, arrows, or change page size to test functionality
              </p>
              <UiPagination
                :current-page="8"
                :total="5000"
                :page-size="100"
                :page-sizes="[20, 50, 100, 200, 500]"
                active-color="#f59e0b"
                hover-color="#fbbf24"
                border-color="#fef3c7"
                background-color="#fffbeb"
                @page-change="(page) => console.log('📄 Page changed to:', page)"
                @size-change="(size) => console.log('📊 Page size changed to:', size)"
              />
              <div class="mt-4 rounded bg-amber-50 p-3 text-sm">
                <p class="text-amber-800">
                  <strong>Current Page:</strong> 8 |
                  <strong>Items per Page:</strong> 100 |
                  <strong>Total:</strong> 5,000 items |
                  <strong>Total Pages:</strong> 50
                </p>
                <p class="mt-1 text-amber-600">
                  Check browser console for click events!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles for showcase */
</style>
