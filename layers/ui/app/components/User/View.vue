<script setup lang="ts">
interface UserViewProps {
  user: {
    id: string;
    email: string;
    userType: string;
    roles: string[];
    createdAt: string;
  };
}

interface UserViewEmits {
  close: [];
}

const props = defineProps<UserViewProps>();
const emit = defineEmits<UserViewEmits>();

function handleClose() {
  emit('close');
}

function getUserTypeColor(userType: string) {
  switch (userType) {
    case 'admin': return 'danger';
    case 'moderator': return 'warning';
    case 'user': return 'info';
    default: return 'info';
  }
}
</script>

<template>
  <div class="user-view">
    <div class="space-y-4">
      <div class="border-b pb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          User Information
        </h3>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <p class="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">
            {{ user.id }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <p class="text-sm text-gray-900">
            {{ user.email }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            User Type
          </label>
          <div>
            <el-tag :type="getUserTypeColor(user.userType)">
              {{ user.userType }}
            </el-tag>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Assigned Roles
          </label>
          <div class="flex flex-wrap gap-2">
            <el-tag
              v-for="role in user.roles"
              :key="role"
              size="small"
              type="success"
            >
              {{ role }}
            </el-tag>
            <span v-if="user.roles.length === 0" class="text-sm text-gray-500">
              No roles assigned
            </span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Created At
          </label>
          <p class="text-sm text-gray-900">
            {{ user.createdAt }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-6 pt-4 border-t">
      <UiButton variant="default" @click="handleClose">
        Close
      </UiButton>
    </div>
  </div>
</template>

<style scoped>
.user-view {
  padding: 1rem;
}
</style>
