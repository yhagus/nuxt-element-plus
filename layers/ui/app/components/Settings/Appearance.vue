<script setup lang="ts">
interface ThemeOption {
  id: 'light' | 'dark' | 'system';
  name: string;
  description: string;
  icon: string;
}

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

interface LanguageOption {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
}

const form = useForm({
  theme: 'system' as 'light' | 'dark' | 'system',
  primaryColor: '#2563eb',
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24h',
  density: 'default' as 'compact' | 'default' | 'comfortable',
});

const themeOptions: ThemeOption[] = [
  {
    id: 'light',
    name: 'Light',
    description: 'Clean and bright interface',
    icon: 'lucide:sun',
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Easier on the eyes in low light',
    icon: 'lucide:moon',
  },
  {
    id: 'system',
    name: 'System',
    description: 'Adapts to your device settings',
    icon: 'lucide:monitor',
  },
];

const colorOptions: ColorOption[] = [
  { id: 'blue', name: 'Blue', color: '#2563eb' },
  { id: 'purple', name: 'Purple', color: '#7c3aed' },
  { id: 'green', name: 'Green', color: '#16a34a' },
  { id: 'orange', name: 'Orange', color: '#ea580c' },
  { id: 'red', name: 'Red', color: '#dc2626' },
  { id: 'pink', name: 'Pink', color: '#db2777' },
  { id: 'indigo', name: 'Indigo', color: '#4338ca' },
  { id: 'teal', name: 'Teal', color: '#0d9488' },
];

const languageOptions: LanguageOption[] = [
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { id: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

const dateFormatOptions = [
  { label: 'YYYY-MM-DD (2024-03-15)', value: 'YYYY-MM-DD' },
  { label: 'MM/DD/YYYY (03/15/2024)', value: 'MM/DD/YYYY' },
  { label: 'DD/MM/YYYY (15/03/2024)', value: 'DD/MM/YYYY' },
  { label: 'MMM DD, YYYY (Mar 15, 2024)', value: 'MMM DD, YYYY' },
];

const timeFormatOptions = [
  { label: '24-hour (14:30)', value: '24h' },
  { label: '12-hour (2:30 PM)', value: '12h' },
];

const densityOptions = [
  {
    id: 'compact',
    name: 'Compact',
    description: 'More content, less spacing',
  },
  {
    id: 'default',
    name: 'Default',
    description: 'Balanced spacing and content',
  },
  {
    id: 'comfortable',
    name: 'Comfortable',
    description: 'More spacing, easier to scan',
  },
];

// Get available timezones
const timezoneOptions = computed(() => {
  return Intl.supportedValuesOf('timeZone').map(tz => ({
    label: tz.replace(/_/g, ' '),
    value: tz,
  }));
});

// Save appearance settings
async function saveAppearanceSettings() {
  await api.user.updateAppearanceSettings(form, {
    onResponse({ response }) {
      if (response.ok) {
        const toast = useToast();
        toast.success('Appearance settings updated successfully!');
      }
    },
  });
}

// Apply theme preview
function applyThemePreview() {
  // This would apply the theme immediately for preview
  document.documentElement.setAttribute('data-theme', form.theme);
  document.documentElement.style.setProperty('--primary-color', form.primaryColor);
}

// Reset to defaults
function resetToDefaults() {
  form.theme = 'system';
  form.primaryColor = '#2563eb';
  form.language = 'en';
  form.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  form.dateFormat = 'YYYY-MM-DD';
  form.timeFormat = '24h';
  form.density = 'default';

  const toast = useToast();
  toast.success('Settings reset to defaults');
}
</script>

<template>
  <div class="appearance-settings">
    <UiForm v-model="form" @submit="saveAppearanceSettings">
      <!-- Theme Selection -->
      <div class="form-section">
        <h3 class="form-section-title">
          Theme
        </h3>
        <p class="form-section-description">
          Choose how the application looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes.
        </p>

        <div class="theme-options">
          <div
            v-for="theme in themeOptions"
            :key="theme.id"
            class="theme-option"
            :class="{ 'theme-option--selected': form.theme === theme.id }"
            @click="form.theme = theme.id; applyThemePreview()"
          >
            <div class="theme-option__preview">
              <NIcon :name="theme.icon" />
            </div>
            <div class="theme-option__content">
              <h4 class="theme-option__name">
                {{ theme.name }}
              </h4>
              <p class="theme-option__description">
                {{ theme.description }}
              </p>
            </div>
            <div class="theme-option__radio">
              <input
                :id="`theme-${theme.id}`"
                v-model="form.theme"
                :value="theme.id"
                type="radio"
                name="theme"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Primary Color -->
      <div class="form-section">
        <h3 class="form-section-title">
          Primary Color
        </h3>
        <p class="form-section-description">
          Choose your preferred primary color for buttons, links, and other interactive elements.
        </p>

        <div class="color-options">
          <button
            v-for="color in colorOptions"
            :key="color.id"
            type="button"
            class="color-option"
            :class="{ 'color-option--selected': form.primaryColor === color.color }"
            :style="{ backgroundColor: color.color }"
            :title="color.name"
            @click="form.primaryColor = color.color; applyThemePreview()"
          >
            <NIcon
              v-if="form.primaryColor === color.color"
              name="lucide:check"
              class="color-option__check"
            />
          </button>
        </div>
      </div>

      <!-- Language & Region -->
      <div class="form-section">
        <h3 class="form-section-title">
          Language & Region
        </h3>
        <p class="form-section-description">
          Set your language, timezone, and date format preferences.
        </p>

        <div class="form-grid">
          <UiFormItem label="Language" prop="language">
            <UiSelect
              v-model="form.language"
              :options="languageOptions.map(lang => ({
                label: `${lang.flag} ${lang.name} (${lang.nativeName})`,
                value: lang.id,
              }))"
            />
          </UiFormItem>

          <UiFormItem label="Timezone" prop="timezone">
            <UiSelect
              v-model="form.timezone"
              :options="timezoneOptions"
              filterable
            />
          </UiFormItem>

          <UiFormItem label="Date Format" prop="dateFormat">
            <UiSelect
              v-model="form.dateFormat"
              :options="dateFormatOptions"
            />
          </UiFormItem>

          <UiFormItem label="Time Format" prop="timeFormat">
            <UiSelect
              v-model="form.timeFormat"
              :options="timeFormatOptions"
            />
          </UiFormItem>
        </div>
      </div>

      <!-- Density -->
      <div class="form-section">
        <h3 class="form-section-title">
          Interface Density
        </h3>
        <p class="form-section-description">
          Choose how compact or spacious you want the interface to be.
        </p>

        <div class="density-options">
          <div
            v-for="density in densityOptions"
            :key="density.id"
            class="density-option"
            :class="{ 'density-option--selected': form.density === density.id }"
            @click="form.density = density.id as any"
          >
            <div class="density-option__preview">
              <div
                class="density-preview"
                :class="`density-preview--${density.id}`"
              >
                <div class="density-preview__item" />
                <div class="density-preview__item" />
                <div class="density-preview__item" />
              </div>
            </div>
            <div class="density-option__content">
              <h4 class="density-option__name">
                {{ density.name }}
              </h4>
              <p class="density-option__description">
                {{ density.description }}
              </p>
            </div>
            <div class="density-option__radio">
              <input
                :id="`density-${density.id}`"
                v-model="form.density"
                :value="density.id"
                type="radio"
                name="density"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <div class="form-actions__main">
          <UiButton
            type="submit"
            variant="primary"
            :loading="form.processing"
          >
            <NIcon name="lucide:save" />
            Save Changes
          </UiButton>

          <UiButton
            type="button"
            variant="default"
            @click="applyThemePreview"
          >
            <NIcon name="lucide:eye" />
            Preview
          </UiButton>
        </div>

        <UiButton
          type="button"
          variant="default"
          @click="resetToDefaults"
        >
          <NIcon name="lucide:rotate-ccw" />
          Reset to Defaults
        </UiButton>
      </div>
    </UiForm>

    <!-- Preview Card -->
    <div class="preview-card">
      <div class="preview-card__header">
        <NIcon name="lucide:monitor" />
        <h3>Preview</h3>
      </div>

      <div class="preview-card__content">
        <p>This is how your interface will look with the selected settings.</p>

        <div class="preview-elements">
          <UiButton variant="primary">
            Primary Button
          </UiButton>
          <UiButton variant="default">
            Default Button
          </UiButton>

          <div class="preview-card__sample">
            <h4>Sample Card</h4>
            <p>This is a sample card with your selected theme and colors.</p>
            <small>{{ new Date().toLocaleDateString() }} • {{ new Date().toLocaleTimeString() }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.appearance-settings {
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

// Theme options
.theme-options {
  display: grid;
  gap: 1rem;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
  }

  &--selected {
    border-color: #2563eb;
    background-color: #eff6ff;
  }

  &__preview {
    width: 48px;
    height: 48px;
    background: #f3f4f6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #6b7280;
  }

  &__content {
    flex: 1;

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 0.25rem 0;
    }

    p {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }
  }

  &__radio {
    input {
      width: 20px;
      height: 20px;
    }
  }
}

// Color options
.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.color-option {
  width: 48px;
  height: 48px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &--selected {
    border-color: #ffffff;
    box-shadow:
      0 0 0 2px currentColor,
      0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &__check {
    color: white;
    font-size: 20px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
}

// Form grid
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

// Density options
.density-options {
  display: grid;
  gap: 1rem;
}

.density-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
  }

  &--selected {
    border-color: #2563eb;
    background-color: #eff6ff;
  }

  &__preview {
    width: 64px;
    height: 48px;
  }

  &__content {
    flex: 1;

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 0.25rem 0;
    }

    p {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }
  }

  &__radio {
    input {
      width: 20px;
      height: 20px;
    }
  }
}

// Density preview
.density-preview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__item {
    background: #e5e7eb;
    border-radius: 4px;
    margin-bottom: 2px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &--compact &__item {
    height: 12px;
    margin-bottom: 1px;
  }

  &--default &__item {
    height: 10px;
    margin-bottom: 2px;
  }

  &--comfortable &__item {
    height: 8px;
    margin-bottom: 4px;
  }
}

// Form actions
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
  gap: 1rem;
  flex-wrap: wrap;

  &__main {
    display: flex;
    gap: 1rem;
  }
}

// Preview card
.preview-card {
  margin-top: 3rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;

    svg {
      font-size: 20px;
      color: #2563eb;
    }

    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
  }

  &__content {
    padding: 1.5rem;

    p {
      color: #6b7280;
      margin: 0 0 1.5rem 0;
    }
  }

  &__sample {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 0.5rem 0;
    }

    p {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0 0 0.5rem 0;
    }

    small {
      font-size: 0.75rem;
      color: #9ca3af;
    }
  }
}

.preview-elements {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .form-actions {
    flex-direction: column;
    align-items: stretch;

    &__main {
      justify-content: center;
    }
  }
}
</style>
