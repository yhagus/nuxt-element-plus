<script setup lang="ts">
const { setTitle } = useTitle();
const route = useRoute();

const { data, refresh, status } = await api.user.useFindAll({
  query: {
    search: computed(() => route.query.search ?? undefined),
    page: computed(() => route.query.page ?? undefined),
    limit: computed(() => route.query.limit ?? undefined),
  },
});

const sampleData = {
  data: [
    {
      id: '1',
      email: 'john.doe@example.com',
      userType: 'admin',
      roles: ['super-admin', 'moderator'],
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      email: 'jane.smith@company.com',
      userType: 'user',
      roles: ['editor'],
      createdAt: '2024-02-20',
    },
    {
      id: '3',
      email: 'mike.wilson@business.org',
      userType: 'moderator',
      roles: ['moderator', 'viewer'],
      createdAt: '2024-03-10',
    },
    {
      id: '4',
      email: 'sarah.johnson@startup.io',
      userType: 'user',
      roles: ['viewer'],
      createdAt: '2024-03-25',
    },
    {
      id: '5',
      email: 'david.brown@enterprise.net',
      userType: 'admin',
      roles: ['admin', 'editor'],
      createdAt: '2024-04-05',
    },
  ],
};

// Modal states
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const selectedUser = ref<any>(null);

// Filter states
const userTypeFilter = ref('');
const userRoleFilter = ref<string[]>([]);

// Filter options
const userTypeOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Moderator', value: 'moderator' },
  { label: 'User', value: 'user' },
];

const userRoleOptions = [
  { label: 'Super Admin', value: 'super-admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Moderator', value: 'moderator' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

// CRUD operations
function handleCreate() {
  showCreateModal.value = true;
}

function handleView(user: any) {
  selectedUser.value = user;
  showViewModal.value = true;
}

function handleEdit(user: any) {
  selectedUser.value = user;
  showEditModal.value = true;
}

async function handleDelete(user: any) {
  await ElMessageBox.confirm(
    `Are you sure you want to delete user ${user.email}?`,
    'Delete User',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  );

  await api.user.remove(user.id, {
    onResponse({ response }) {
      if (response.ok) {
        useNotification('Success', 'User has been deleted successfully', { type: 'success' });
        refresh();
      }
    },
  });
}

// Modal handlers
function onUserCreated() {
  showCreateModal.value = false;
  refresh();
}

function onUserUpdated() {
  showEditModal.value = false;
  refresh();
}

// Filter computed data
const filteredData = computed(() => {
  let filtered = sampleData.data;

  if (userTypeFilter.value) {
    filtered = filtered.filter(user => user.userType === userTypeFilter.value);
  }

  if (userRoleFilter.value.length > 0) {
    filtered = filtered.filter(user =>
      userRoleFilter.value.some(role => user.roles.includes(role)),
    );
  }

  return filtered;
});

const columns: TableColumn[] = [
  {
    label: 'No',
    prop: (_, index) => `${getCurrentIndex(index, data.value?.meta?.limit, data.value?.meta?.currentPage)}`,
    visible: true,
    width: 60,
    align: 'center',
  },
  {
    label: 'Email',
    prop: 'email',
    align: 'left',
    visible: true,
  },
  {
    label: 'User Type',
    prop: 'userType',
    align: 'center',
    visible: true,
    width: 120,
  },
  {
    label: 'Roles',
    prop: 'roles',
    align: 'center',
    visible: true,
    width: 200,
  },
  {
    label: 'Created At',
    prop: 'createdAt',
    align: 'center',
    visible: true,
    width: 120,
  },
  {
    label: 'Action',
    prop: 'action',
    align: 'center',
    width: 150,
    visible: true,
  },
];

setTitle(
  'test',
);
definePageMeta({
  layout: 'theme-shadcn-1',
});
</script>

<template>
  <div>
    <ui-data-table table-key="user" :columns="columns" :data="filteredData" :meta="data?.meta" :loading="status === 'pending'">
      <template #toolbar>
        <div class="flex items-center gap-x-4">
          <div class="flex items-center gap-x-3">
            <UiSelect
              v-model="userTypeFilter"
              :options="userTypeOptions"
              placeholder="Filter by user type"
              clearable
              class="min-w-48"
            />

            <UiSelect
              v-model="userRoleFilter"
              :options="userRoleOptions"
              placeholder="Filter by roles"
              multiple
              clearable
              class="min-w-48"
            />
          </div>
          <UiButton variant="primary" @click="handleCreate">
            <NIcon name="lucide:plus" class="w-4 h-4 mr-2" />
            Create User
          </UiButton>
        </div>
      </template>
      <template #userType="{ row }">
        <el-tag :type="row.userType === 'admin' ? 'danger' : row.userType === 'moderator' ? 'warning' : 'info'">
          {{ row.userType }}
        </el-tag>
      </template>

      <template #roles="{ row }">
        <div class="flex flex-wrap gap-1">
          <el-tag
            v-for="role in row.roles"
            :key="role"
            size="small"
            type="success"
          >
            {{ role }}
          </el-tag>
        </div>
      </template>

      <template #action="{ row }">
        <div class="flex items-center justify-center gap-2">
          <UiButton size="small" variant="info" @click="handleView(row)">
            <NIcon name="lucide:eye" class="w-4 h-4" />
          </UiButton>
          <UiButton size="small" variant="warning" @click="handleEdit(row)">
            <NIcon name="lucide:edit" class="w-4 h-4" />
          </UiButton>
          <UiButton size="small" variant="danger" @click="handleDelete(row)">
            <NIcon name="lucide:trash-2" class="w-4 h-4" />
          </UiButton>
        </div>
      </template>
    </ui-data-table>

    <!-- Create User Modal -->
    <el-dialog v-model="showCreateModal" title="Create User" width="500px">
      <FormUserCreate @created="onUserCreated" @cancel="showCreateModal = false" />
    </el-dialog>

    <!-- Edit User Modal -->
    <el-dialog v-model="showEditModal" title="Edit User" width="500px">
      <FormUserEdit v-if="selectedUser" :user="selectedUser" @updated="onUserUpdated" @cancel="showEditModal = false" />
    </el-dialog>

    <!-- View User Modal -->
    <el-dialog v-model="showViewModal" title="User Details" width="500px">
      <UserView v-if="selectedUser" :user="selectedUser" @close="showViewModal = false" />
    </el-dialog>
  </div>
</template>

<style scoped>

</style>
