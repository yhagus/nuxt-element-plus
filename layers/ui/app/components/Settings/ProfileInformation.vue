<script setup lang="ts">
const { user } = useAuthStore();

const form = useForm({
  name: user?.name || '',
  email: user?.email || '',
  avatar: null as File | null,
});

const avatarPreview = ref<string | null>(null);

// Handle avatar selection
function handleAvatarChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    form.avatar = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

// Remove avatar
function removeAvatar() {
  form.avatar = null;
  avatarPreview.value = null;
}

// Submit form
async function updateProfileInformation() {
  await api.user.updateProfile(form, {
    onResponse({ response }) {
      if (response.ok) {
        const toast = useToast();
        toast.success('Profile updated successfully!');
      }
    },
  });
}

// Handle account deletion
const showDeleteConfirmation = ref(false);
const deleteForm = useForm({
  password: '',
});

async function deleteAccount() {
  await api.user.deleteAccount(deleteForm, {
    onResponse({ response }) {
      if (response.ok) {
        const toast = useToast();
        toast.success('Account deleted successfully.');
        // Redirect to login or home
        navigateTo('/sign-in');
      }
    },
  });
}
</script>

<template>
  <div class="profile-information">
    <!-- Profile Information Form -->
    <UiForm v-model="form" @submit="updateProfileInformation">
      <!-- Avatar Section -->
      <div class="form-section">
        <h3 class="form-section-title">
          Profile Photo
        </h3>
        <p class="form-section-description">
          This is your avatar. Click on the avatar to upload a custom one from your files.
        </p>

        <div class="avatar-section">
          <div class="avatar-container">
            <img
              :src="avatarPreview || user?.avatar || '/default-avatar.png'"
              :alt="user?.name || 'User avatar'"
              class="avatar-image"
            >
            <div class="avatar-overlay">
              <NIcon name="lucide:camera" />
            </div>
            <input
              type="file"
              accept="image/*"
              class="avatar-input"
              @change="handleAvatarChange"
            >
          </div>

          <div class="avatar-actions">
            <label class="avatar-button avatar-button--primary">
              <NIcon name="lucide:upload" />
              Upload new avatar
              <input
                type="file"
                accept="image/*"
                class="sr-only"
                @change="handleAvatarChange"
              >
            </label>

            <UiButton
              v-if="form.avatar || avatarPreview"
              variant="default"
              @click="removeAvatar"
            >
              <NIcon name="lucide:trash-2" />
              Remove
            </UiButton>
          </div>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="form-section">
        <h3 class="form-section-title">
          Personal Information
        </h3>
        <p class="form-section-description">
          Update your account's profile information and email address.
        </p>

        <div class="form-grid">
          <UiFormItem label="Name" prop="name" required>
            <UiInput
              v-model="form.name"
              placeholder="Enter your full name"
              autocomplete="name"
            />
          </UiFormItem>

          <UiFormItem label="Email" prop="email" required>
            <UiInput
              v-model="form.email"
              type="email"
              placeholder="Enter your email address"
              autocomplete="email"
            />
          </UiFormItem>
        </div>
      </div>

      <!-- Save Button -->
      <div class="form-actions">
        <UiButton
          type="submit"
          variant="primary"
          :loading="form.processing"
        >
          <NIcon name="lucide:save" />
          Save Changes
        </UiButton>
      </div>
    </UiForm>

    <!-- Danger Zone -->
    <div class="danger-zone">
      <div class="danger-zone__header">
        <h3 class="danger-zone__title">
          Danger Zone
        </h3>
        <p class="danger-zone__description">
          Permanently delete your account and all of your content.
        </p>
      </div>

      <div class="danger-zone__content">
        <div class="danger-zone__info">
          <h4>Delete Account</h4>
          <p>
            Once your account is deleted, all of its resources and data will be permanently deleted.
            Before deleting your account, please download any data or information that you wish to retain.
          </p>
        </div>

        <UiButton
          variant="danger"
          @click="showDeleteConfirmation = true"
        >
          <NIcon name="lucide:trash-2" />
          Delete Account
        </UiButton>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UiModal
      v-model="showDeleteConfirmation"
      title="Are you absolutely sure?"
      max-width="500px"
    >
      <div class="delete-confirmation">
        <div class="delete-confirmation__icon">
          <NIcon name="lucide:alert-triangle" />
        </div>

        <div class="delete-confirmation__content">
          <p class="delete-confirmation__warning">
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </p>

          <UiForm v-model="deleteForm" @submit="deleteAccount">
            <UiFormItem
              label="Please enter your password to confirm"
              prop="password"
              required
            >
              <UiInput
                v-model="deleteForm.password"
                type="password"
                placeholder="Enter your password"
              />
            </UiFormItem>

            <div class="delete-confirmation__actions">
              <UiButton
                variant="default"
                @click="showDeleteConfirmation = false"
              >
                Cancel
              </UiButton>

              <UiButton
                type="submit"
                variant="danger"
                :loading="deleteForm.processing"
              >
                <NIcon name="lucide:trash-2" />
                Delete Account
              </UiButton>
            </div>
          </UiForm>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<style lang="scss" scoped>
.profile-information {
  space-y: 2rem;
}

// Form sections
.form-section {
  margin-bottom: 2.5rem;

  &:last-of-type {
    margin-bottom: 2rem;
  }
}

.form-section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.form-section-description {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

// Avatar section
.avatar-section {
  display: flex;
  align-items: start;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.avatar-container {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    .avatar-overlay {
      opacity: 1;
    }
  }
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.avatar-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.avatar-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &--primary {
    background: #2563eb;
    color: white;
    border: 1px solid #2563eb;

    &:hover {
      background: #1d4ed8;
      border-color: #1d4ed8;
    }
  }
}

// Form grid
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

// Form actions
.form-actions {
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
}

// Danger zone
.danger-zone {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #f3f4f6;

  &__header {
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #dc2626;
    margin: 0 0 0.5rem 0;
  }

  &__description {
    color: #6b7280;
    margin: 0;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 2rem;
    padding: 1.5rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;

    @media (max-width: 640px) {
      flex-direction: column;
    }
  }

  &__info {
    flex: 1;

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #dc2626;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #7f1d1d;
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }
}

// Delete confirmation modal
.delete-confirmation {
  text-align: center;
  padding: 1rem;

  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 1.5rem auto;
    background: #fef2f2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dc2626;
    font-size: 32px;
  }

  &__warning {
    margin-bottom: 2rem;
    color: #374151;
    line-height: 1.6;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
  }
}

// Utilities
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
