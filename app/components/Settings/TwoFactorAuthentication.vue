<script setup lang="ts">
const { user } = useAuth();

// Two-factor authentication state
const twoFactorEnabled = ref(false);
const showingQrCode = ref(false);
const showingRecoveryCodes = ref(false);
const showingConfirmPassword = ref(false);

// Forms
const enableTwoFactorForm = useForm({
  password: '',
});

const confirmTwoFactorForm = useForm({
  code: '',
});

const disableTwoFactorForm = useForm({
  password: '',
});

const regenerateRecoveryCodesForm = useForm({
  password: '',
});

// Sample data (in real app, this would come from API)
const qrCodeUrl = ref('');
const secretKey = ref('');
const recoveryCodes = ref<string[]>([]);

// Enable two-factor authentication
async function enableTwoFactorAuthentication() {
  await api.user.enableTwoFactor(enableTwoFactorForm, {
    onResponse({ response }) {
      if (response.ok) {
        qrCodeUrl.value = response.data.qr_code_url;
        secretKey.value = response.data.secret_key;
        showingQrCode.value = true;
        showingConfirmPassword.value = false;

        const toast = useToast();
        toast.success('Two-factor authentication setup initiated!');
      }
    },
  });
}

// Confirm two-factor authentication
async function confirmTwoFactorAuthentication() {
  await api.user.confirmTwoFactor(confirmTwoFactorForm, {
    onResponse({ response }) {
      if (response.ok) {
        recoveryCodes.value = response.data.recovery_codes;
        twoFactorEnabled.value = true;
        showingQrCode.value = false;
        showingRecoveryCodes.value = true;

        const toast = useToast();
        toast.success('Two-factor authentication enabled successfully!');
      }
    },
  });
}

// Disable two-factor authentication
async function disableTwoFactorAuthentication() {
  await api.user.disableTwoFactor(disableTwoFactorForm, {
    onResponse({ response }) {
      if (response.ok) {
        twoFactorEnabled.value = false;
        showingQrCode.value = false;
        showingRecoveryCodes.value = false;
        qrCodeUrl.value = '';
        secretKey.value = '';
        recoveryCodes.value = [];

        const toast = useToast();
        toast.success('Two-factor authentication disabled successfully!');
      }
    },
  });
}

// Regenerate recovery codes
async function regenerateRecoveryCodes() {
  await api.user.regenerateRecoveryCodes(regenerateRecoveryCodesForm, {
    onResponse({ response }) {
      if (response.ok) {
        recoveryCodes.value = response.data.recovery_codes;
        showingRecoveryCodes.value = true;

        const toast = useToast();
        toast.success('Recovery codes regenerated successfully!');
      }
    },
  });
}

// Download recovery codes
function downloadRecoveryCodes() {
  const content = recoveryCodes.value.join('\n');
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = 'recovery-codes.txt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Copy recovery codes
function copyRecoveryCodes() {
  const content = recoveryCodes.value.join('\n');
  navigator.clipboard.writeText(content).then(() => {
    const toast = useToast();
    toast.success('Recovery codes copied to clipboard!');
  });
}

// Copy secret key
function copySecretKey() {
  navigator.clipboard.writeText(secretKey.value).then(() => {
    const toast = useToast();
    toast.success('Secret key copied to clipboard!');
  });
}
</script>

<template>
  <div class="two-factor-auth">
    <!-- Status Card -->
    <div class="status-card" :class="{ 'status-card--enabled': twoFactorEnabled }">
      <div class="status-card__icon">
        <Icon :name="twoFactorEnabled ? 'lucide:shield-check' : 'lucide:shield-off'" />
      </div>

      <div class="status-card__content">
        <h3 class="status-card__title">
          Two-Factor Authentication {{ twoFactorEnabled ? 'Enabled' : 'Disabled' }}
        </h3>
        <p class="status-card__description">
          <template v-if="twoFactorEnabled">
            Your account is protected with two-factor authentication.
          </template>
          <template v-else>
            Add an additional layer of security to your account by enabling two-factor authentication.
          </template>
        </p>
      </div>

      <div class="status-card__actions">
        <UiButton
          v-if="!twoFactorEnabled"
          variant="primary"
          @click="showingConfirmPassword = true"
        >
          <Icon name="lucide:shield-plus" />
          Enable 2FA
        </UiButton>

        <template v-else>
          <UiButton
            variant="default"
            @click="showingRecoveryCodes = true"
          >
            <Icon name="lucide:key" />
            Show Recovery Codes
          </UiButton>

          <UiButton
            variant="danger"
            @click="showingConfirmPassword = true"
          >
            <Icon name="lucide:shield-minus" />
            Disable 2FA
          </UiButton>
        </template>
      </div>
    </div>

    <!-- Setup Instructions (when 2FA is disabled) -->
    <div v-if="!twoFactorEnabled" class="setup-instructions">
      <h3 class="setup-instructions__title">
        How to Set Up Two-Factor Authentication
      </h3>

      <div class="instruction-steps">
        <div class="instruction-step">
          <div class="instruction-step__number">
            1
          </div>
          <div class="instruction-step__content">
            <h4>Install an Authenticator App</h4>
            <p>Download and install one of these authenticator apps on your mobile device:</p>
            <div class="app-suggestions">
              <div class="app-suggestion">
                <Icon name="lucide:smartphone" />
                <span>Google Authenticator</span>
              </div>
              <div class="app-suggestion">
                <Icon name="lucide:smartphone" />
                <span>Microsoft Authenticator</span>
              </div>
              <div class="app-suggestion">
                <Icon name="lucide:smartphone" />
                <span>Authy</span>
              </div>
            </div>
          </div>
        </div>

        <div class="instruction-step">
          <div class="instruction-step__number">
            2
          </div>
          <div class="instruction-step__content">
            <h4>Scan QR Code</h4>
            <p>Use your authenticator app to scan the QR code that will be displayed after you confirm your password.</p>
          </div>
        </div>

        <div class="instruction-step">
          <div class="instruction-step__number">
            3
          </div>
          <div class="instruction-step__content">
            <h4>Enter Verification Code</h4>
            <p>Enter the 6-digit code from your authenticator app to complete the setup process.</p>
          </div>
        </div>

        <div class="instruction-step">
          <div class="instruction-step__number">
            4
          </div>
          <div class="instruction-step__content">
            <h4>Save Recovery Codes</h4>
            <p>Store your recovery codes in a safe place. You can use them to access your account if you lose your phone.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Password Confirmation Modal -->
    <UiModal
      v-model="showingConfirmPassword"
      :title="twoFactorEnabled ? 'Confirm Password to Disable 2FA' : 'Confirm Password to Enable 2FA'"
      max-width="400px"
    >
      <UiForm
        v-if="!twoFactorEnabled"
        v-model="enableTwoFactorForm"
        @submit="enableTwoFactorAuthentication"
      >
        <UiFormItem label="Password" prop="password" required>
          <UiInput
            v-model="enableTwoFactorForm.password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
        </UiFormItem>

        <div class="modal-actions">
          <UiButton
            variant="default"
            @click="showingConfirmPassword = false"
          >
            Cancel
          </UiButton>

          <UiButton
            type="submit"
            variant="primary"
            :loading="enableTwoFactorForm.processing"
          >
            Continue
          </UiButton>
        </div>
      </UiForm>

      <UiForm
        v-else
        v-model="disableTwoFactorForm"
        @submit="disableTwoFactorAuthentication"
      >
        <div class="disable-warning">
          <Icon name="lucide:alert-triangle" />
          <p>Are you sure you want to disable two-factor authentication? This will make your account less secure.</p>
        </div>

        <UiFormItem label="Password" prop="password" required>
          <UiInput
            v-model="disableTwoFactorForm.password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
        </UiFormItem>

        <div class="modal-actions">
          <UiButton
            variant="default"
            @click="showingConfirmPassword = false"
          >
            Cancel
          </UiButton>

          <UiButton
            type="submit"
            variant="danger"
            :loading="disableTwoFactorForm.processing"
          >
            Disable 2FA
          </UiButton>
        </div>
      </UiForm>
    </UiModal>

    <!-- QR Code Modal -->
    <UiModal
      v-model="showingQrCode"
      title="Set Up Two-Factor Authentication"
      max-width="500px"
    >
      <div class="qr-setup">
        <div class="qr-setup__instructions">
          <h4>Scan this QR code with your authenticator app</h4>
          <p>Open your authenticator app and scan the QR code below to add this account.</p>
        </div>

        <div class="qr-code-container">
          <!-- In a real app, this would be an actual QR code image -->
          <div class="qr-code-placeholder">
            <Icon name="lucide:qr-code" />
            <p>QR Code would appear here</p>
            <small>{{ qrCodeUrl }}</small>
          </div>
        </div>

        <div class="manual-entry">
          <h5>Can't scan the QR code?</h5>
          <p>Manually enter this key in your authenticator app:</p>
          <div class="secret-key">
            <code>{{ secretKey }}</code>
            <UiButton
              variant="default"
              size="small"
              @click="copySecretKey"
            >
              <Icon name="lucide:copy" />
              Copy
            </UiButton>
          </div>
        </div>

        <UiForm v-model="confirmTwoFactorForm" @submit="confirmTwoFactorAuthentication">
          <UiFormItem
            label="Enter the 6-digit code from your authenticator app"
            prop="code"
            required
          >
            <UiInput
              v-model="confirmTwoFactorForm.code"
              placeholder="000000"
              maxlength="6"
              autocomplete="one-time-code"
            />
          </UiFormItem>

          <div class="modal-actions">
            <UiButton
              variant="default"
              @click="showingQrCode = false"
            >
              Cancel
            </UiButton>

            <UiButton
              type="submit"
              variant="primary"
              :loading="confirmTwoFactorForm.processing"
            >
              <Icon name="lucide:shield-check" />
              Enable 2FA
            </UiButton>
          </div>
        </UiForm>
      </div>
    </UiModal>

    <!-- Recovery Codes Modal -->
    <UiModal
      v-model="showingRecoveryCodes"
      title="Two-Factor Authentication Recovery Codes"
      max-width="600px"
    >
      <div class="recovery-codes">
        <div class="recovery-codes__warning">
          <Icon name="lucide:alert-triangle" />
          <div>
            <h4>Save these recovery codes</h4>
            <p>
              Keep these recovery codes somewhere safe but accessible.
              You can use them to access your account if you lose access to your authenticator device.
            </p>
          </div>
        </div>

        <div class="codes-container">
          <div class="codes-grid">
            <div
              v-for="(code, index) in recoveryCodes"
              :key="index"
              class="recovery-code"
            >
              {{ code }}
            </div>
          </div>

          <div class="codes-actions">
            <UiButton
              variant="default"
              @click="copyRecoveryCodes"
            >
              <Icon name="lucide:copy" />
              Copy Codes
            </UiButton>

            <UiButton
              variant="default"
              @click="downloadRecoveryCodes"
            >
              <Icon name="lucide:download" />
              Download Codes
            </UiButton>
          </div>
        </div>

        <div class="regenerate-section">
          <h5>Regenerate Recovery Codes</h5>
          <p>
            If you've used a recovery code or suspect it may be compromised, you can generate new codes.
            This will invalidate all existing recovery codes.
          </p>

          <UiForm v-model="regenerateRecoveryCodesForm" @submit="regenerateRecoveryCodes">
            <UiFormItem label="Password" prop="password" required>
              <UiInput
                v-model="regenerateRecoveryCodesForm.password"
                type="password"
                placeholder="Enter your password"
                autocomplete="current-password"
              />
            </UiFormItem>

            <UiButton
              type="submit"
              variant="warning"
              :loading="regenerateRecoveryCodesForm.processing"
            >
              <Icon name="lucide:refresh-cw" />
              Regenerate Codes
            </UiButton>
          </UiForm>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<style lang="scss" scoped>
.two-factor-auth {
  space-y: 2rem;
}

// Status card
.status-card {
  display: flex;
  align-items: start;
  gap: 1.5rem;
  padding: 2rem;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;

  &--enabled {
    border-color: #22c55e;
    background: #f0fdf4;
  }

  &__icon {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    background: #f3f4f6;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #6b7280;

    .status-card--enabled & {
      background: #dcfce7;
      color: #22c55e;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.5rem 0;

    .status-card--enabled & {
      color: #166534;
    }
  }

  &__description {
    color: #6b7280;
    margin: 0;
    line-height: 1.6;

    .status-card--enabled & {
      color: #15803d;
    }
  }

  &__actions {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (max-width: 640px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}

// Setup instructions
.setup-instructions {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem 0;
  }
}

.instruction-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.instruction-step {
  display: flex;
  gap: 1rem;

  &__number {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: #2563eb;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }

  &__content {
    flex: 1;

    h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #6b7280;
      margin: 0 0 1rem 0;
      line-height: 1.6;
    }
  }
}

.app-suggestions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.app-suggestion {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #374151;
}

// Modal styles
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.disable-warning {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  svg {
    flex-shrink: 0;
    color: #dc2626;
    font-size: 20px;
  }

  p {
    color: #7f1d1d;
    margin: 0;
    font-size: 0.875rem;
  }
}

// QR Setup
.qr-setup {
  text-align: center;

  &__instructions {
    margin-bottom: 2rem;

    h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #6b7280;
      margin: 0;
    }
  }
}

.qr-code-container {
  margin-bottom: 2rem;
}

.qr-code-placeholder {
  width: 200px;
  height: 200px;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: #6b7280;

  svg {
    font-size: 48px;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    font-weight: 500;
  }

  small {
    font-size: 0.75rem;
    margin-top: 0.5rem;
    word-break: break-all;
  }
}

.manual-entry {
  margin-bottom: 2rem;
  text-align: left;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;

  h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #6b7280;
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
  }
}

.secret-key {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;

  code {
    flex: 1;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    font-size: 0.875rem;
    color: #111827;
    word-break: break-all;
  }
}

// Recovery codes
.recovery-codes {
  &__warning {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #fef3c7;
    border: 1px solid #fbbf24;
    border-radius: 8px;
    margin-bottom: 2rem;

    svg {
      flex-shrink: 0;
      color: #d97706;
      font-size: 20px;
      margin-top: 0.125rem;
    }

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #92400e;
      margin: 0 0 0.25rem 0;
    }

    p {
      color: #92400e;
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }
}

.codes-container {
  margin-bottom: 2rem;
}

.codes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.recovery-code {
  padding: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875rem;
  text-align: center;
  color: #111827;
}

.codes-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.regenerate-section {
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;

  h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #6b7280;
    margin: 0 0 1.5rem 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

@media (max-width: 640px) {
  .status-card {
    flex-direction: column;
    text-align: center;

    &__actions {
      align-self: stretch;
    }
  }
}
</style>
