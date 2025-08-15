<script setup lang="ts">
interface FormUserCreateEmits {
  created: [];
  cancel: [];
}

const emit = defineEmits<FormUserCreateEmits>();

const form = useForm({
  email: '',
  userType: '',
  roles: [] as string[],
});

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

async function handleSubmit() {
  await api.user.create(form, {
    onResponse({ response }) {
      if (response.ok) {
        useNotification('Success', 'User has been created successfully', { type: 'success' });
        emit('created');
      }
    },
  });
}

function handleCancel() {
  emit('cancel');
}
</script>

<template>
  <UiForm v-model="form" @submit="handleSubmit">
    <UiFormItem label="Email" prop="email" required>
      <UiInput
        v-model="form.email"
        type="email"
        placeholder="Enter email address"
        autocomplete="email"
      />
    </UiFormItem>

    <UiFormItem label="User Type" prop="userType" required>
      <UiSelect
        v-model="form.userType"
        :options="userTypeOptions"
        placeholder="Select user type"
      />
    </UiFormItem>

    <UiFormItem label="Roles" prop="roles">
      <UiSelect
        v-model="form.roles"
        :options="userRoleOptions"
        placeholder="Select roles"
        multiple
      />
    </UiFormItem>

    <div class="flex justify-end gap-3 mt-6">
      <UiButton variant="default" @click="handleCancel">
        Cancel
      </UiButton>
      <UiButton variant="primary" type="submit" :loading="form.processing">
        Create User
      </UiButton>
    </div>
  </UiForm>
</template>

<style scoped lang="postcss">

</style>
