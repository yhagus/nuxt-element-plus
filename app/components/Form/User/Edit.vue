<script setup lang="ts">
interface FormUserEditProps {
  user: {
    id: string;
    email: string;
    userType: string;
    roles: string[];
  };
}

interface FormUserEditEmits {
  updated: [];
  cancel: [];
}

const props = defineProps<FormUserEditProps>();
const emit = defineEmits<FormUserEditEmits>();

const form = useForm({
  email: props.user.email,
  userType: props.user.userType,
  roles: [...props.user.roles],
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
  await api.user.update(props.user.id, form, {
    onResponse({ response }) {
      if (response.ok) {
        useNotification('Success', 'User has been updated successfully', { type: 'success' });
        emit('updated');
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
        Update User
      </UiButton>
    </div>
  </UiForm>
</template>

<style scoped lang="postcss">

</style>
