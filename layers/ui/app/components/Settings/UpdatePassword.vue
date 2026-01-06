<script setup lang="ts">
const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
});

// Password requirements checker
const passwordRequirements = computed(() => {
  const password = form.password;
  return {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
});

// Password strength checker
const passwordStrength = computed(() => {
  const password = form.password;
  if (!password)
    return { score: 0, label: '', color: '' };

  const checks = passwordRequirements.value;
  const score = Object.values(checks).filter(Boolean).length;

  const levels = [
    { score: 0, label: '', color: '' },
    { score: 1, label: 'Very Weak', color: '#ef4444' },
    { score: 2, label: 'Weak', color: '#f97316' },
    { score: 3, label: 'Fair', color: '#eab308' },
    { score: 4, label: 'Good', color: '#22c55e' },
    { score: 5, label: 'Strong', color: '#16a34a' },
  ];

  return levels[score] || levels[0];
});

// Password confirmation validation
const passwordsMatch = computed(() => {
  if (!form.password_confirmation)
    return true;
  return form.password === form.password_confirmation;
});

// Submit form
async function updatePassword() {
  await api.user.updatePassword(form, {
    onResponse({ response }) {
      if (response.ok) {
        const toast = useToast();
        toast.success('Password updated successfully!');

        // Reset form
        form.current_password = '';
        form.password = '';
        form.password_confirmation = '';
      }
    },
  });
}

// Show/hide password
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
</script>

<template>
  <div class="update-password">
    <UiForm v-model="form" @submit="updatePassword">
      <!-- Current Password -->
      <div class="form-section">
        <h3 class="form-section-title">
          Current Password
        </h3>
        <p class="form-section-description">
          For your security, please confirm your current password before updating to a new one.
        </p>

        <UiFormItem
          label="Current Password"
          prop="current_password"
          required
          :error="form.errors.current_password"
        >
          <div class="password-input">
            <UiInput
              v-model="form.current_password"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Enter your current password"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showCurrentPassword = !showCurrentPassword"
            >
              <NIcon :name="showCurrentPassword ? 'lucide:eye-off' : 'lucide:eye'" />
            </button>
          </div>
        </UiFormItem>
      </div>

      <!-- New Password -->
      <div class="form-section">
        <h3 class="form-section-title">
          New Password
        </h3>
        <p class="form-section-description">
          Choose a strong password that you haven't used elsewhere.
        </p>

        <div class="form-grid">
          <UiFormItem
            label="New Password"
            prop="password"
            required
            :error="form.errors.password"
          >
            <div class="password-input">
              <UiInput
                v-model="form.password"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="Enter your new password"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showNewPassword = !showNewPassword"
              >
                <NIcon :name="showNewPassword ? 'lucide:eye-off' : 'lucide:eye'" />
              </button>
            </div>

            <!-- Password Strength Indicator -->
            <div v-if="form.password" class="password-strength">
              <div class="password-strength__bar">
                <div
                  class="password-strength__fill"
                  :style="{
                    width: `${(passwordStrength.score / 5) * 100}%`,
                    backgroundColor: passwordStrength.color,
                  }"
                />
              </div>
              <span
                class="password-strength__label"
                :style="{ color: passwordStrength.color }"
              >
                {{ passwordStrength.label }}
              </span>
            </div>
          </UiFormItem>

          <UiFormItem
            label="Confirm New Password"
            prop="password_confirmation"
            required
            :error="form.errors.password_confirmation"
          >
            <div class="password-input">
              <UiInput
                v-model="form.password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your new password"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <NIcon :name="showConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'" />
              </button>
            </div>

            <!-- Password Match Indicator -->
            <div
              v-if="form.password_confirmation"
              class="password-match"
              :class="{ 'password-match--error': !passwordsMatch }"
            >
              <NIcon :name="passwordsMatch ? 'lucide:check-circle' : 'lucide:x-circle'" />
              <span>{{ passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}</span>
            </div>
          </UiFormItem>
        </div>
      </div>

      <!-- Password Requirements -->
      <div class="password-requirements">
        <h4 class="password-requirements__title">
          Password Requirements
        </h4>
        <ul class="password-requirements__list">
          <li :class="{ 'requirement-met': passwordRequirements.length }">
            <NIcon :name="passwordRequirements.length ? 'lucide:check' : 'lucide:x'" />
            At least 8 characters long
          </li>
          <li :class="{ 'requirement-met': passwordRequirements.lowercase }">
            <NIcon :name="passwordRequirements.lowercase ? 'lucide:check' : 'lucide:x'" />
            Contains lowercase letter (a-z)
          </li>
          <li :class="{ 'requirement-met': passwordRequirements.uppercase }">
            <NIcon :name="passwordRequirements.uppercase ? 'lucide:check' : 'lucide:x'" />
            Contains uppercase letter (A-Z)
          </li>
          <li :class="{ 'requirement-met': passwordRequirements.numbers }">
            <NIcon :name="passwordRequirements.numbers ? 'lucide:check' : 'lucide:x'" />
            Contains number (0-9)
          </li>
          <li :class="{ 'requirement-met': passwordRequirements.symbols }">
            <NIcon :name="passwordRequirements.symbols ? 'lucide:check' : 'lucide:x'" />
            Contains special character (!@#$%^&*)
          </li>
        </ul>
      </div>

      <!-- Submit Button -->
      <div class="form-actions">
        <UiButton
          type="submit"
          variant="primary"
          :loading="form.processing"
          :disabled="!passwordsMatch || !form.current_password || !form.password || !form.password_confirmation"
        >
          <NIcon name="lucide:key" />
          Update Password
        </UiButton>
      </div>
    </UiForm>

    <!-- Security Tips -->
    <div class="security-tips">
      <div class="security-tips__header">
        <NIcon name="lucide:shield-check" />
        <h3>Password Security Tips</h3>
      </div>

      <ul class="security-tips__list">
        <li>Use a unique password for this account</li>
        <li>Use a combination of letters, numbers, and symbols</li>
        <li>Don't use personal information like your name or birthday</li>
        <li>Consider using a password manager</li>
        <li>Change your password regularly</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.update-password {
  space-y: 2rem;
}

// Form sections
.form-section {
  margin-bottom: 2.5rem;
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

// Form grid
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

// Password input with toggle
.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    color: #374151;
  }
}

// Password strength indicator
.password-strength {
  margin-top: 0.5rem;

  &__bar {
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 0.25rem;
  }

  &__fill {
    height: 100%;
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 500;
  }
}

// Password match indicator
.password-match {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #16a34a;

  &--error {
    color: #dc2626;
  }
}

// Password requirements
.password-requirements {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;

  &__title {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 1rem 0;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    space-y: 0.5rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.5rem;

      &.requirement-met {
        color: #16a34a;
      }

      svg {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
      }
    }
  }
}

// Form actions
.form-actions {
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
}

// Security tips
.security-tips {
  margin-top: 3rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 1.5rem;

  &__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: #0369a1;

    svg {
      font-size: 20px;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      position: relative;
      padding-left: 1rem;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      color: #0c4a6e;
      line-height: 1.5;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #0369a1;
        font-weight: bold;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
