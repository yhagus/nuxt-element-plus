import { onMounted, ref, watch } from 'vue';

// Define the default column structure. This is used for the initial state
// and when resetting the configuration.
const defaultTableColumns: any[] = [];

/**
 * @description A Nuxt 3 composable to manage large, client-side only table column configurations using localStorage.
 */
export function useTableColumnConfig(storageKey: string) {
  const STORAGE_KEY = storageKey;
  const columns = ref<TableColumn[]>(JSON.parse(JSON.stringify(defaultTableColumns)));

  /**
   * @description Saves the current state of the `columns` ref to localStorage.
   * This function is automatically called when `columns` changes, but can also be called manually if needed.
   */
  const saveConfig = () => {
    // Ensure we are on the client side before accessing localStorage.
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(columns.value));
        // console.log('Table column configuration saved to localStorage.');
      }
      catch (e) {
        console.error('Failed to save configuration to localStorage:', e);
      }
    }
  };

  /**
   * @description Loads the configuration from localStorage and updates the `columns` ref.
   * This is intended to be called once, when the component mounts on the client.
   */
  const loadConfig = () => {
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem(STORAGE_KEY);
      if (savedConfig) {
        try {
          // Parse the saved JSON and update the ref.
          columns.value = JSON.parse(savedConfig);
          // console.log('Table column configuration loaded from localStorage.');
        }
        catch (e) {
          // console.error('Failed to parse configuration from localStorage, using defaults.', e);
          // If parsing fails, fall back to the default configuration.
          console.warn(e);
          columns.value = JSON.parse(JSON.stringify(defaultTableColumns));
        }
      }
    }
  };

  /**
   * @description Replaces the current column configuration with a new one.
   * @param newColumns - The new array of column configurations to apply.
   */
  const updateConfig = (newColumns: any[]) => {
    if (!Array.isArray(newColumns)) {
      console.error('updateConfig expects an array of column configurations.');
      return;
    }
    columns.value = newColumns;
    // The watcher will automatically trigger saveConfig with the new value.
    // console.log('Table column configuration has been updated.');
  };

  /**
   * @description Resets the column configuration to its default state and saves it.
   */
  const resetConfig = () => {
    // Deep copy the default config to prevent accidental mutation of the original default object.
    columns.value = JSON.parse(JSON.stringify(defaultTableColumns));
    // console.log('Table column configuration has been reset to defaults.');
    // The watcher below will automatically save the reset state.
  };

  // On component mount (client-side only), load the saved configuration.
  onMounted(() => {
    loadConfig();
  });

  // Watch for any deep changes in the `columns` ref and automatically save them.
  watch(columns, saveConfig, { deep: true });

  return {
    // We return a readonly version of the columns to encourage mutation
    // only through the provided functions, though direct mutation of the ref
    // from where it's used will still work and trigger the watcher.
    columns,
    saveConfig,
    resetConfig,
    updateConfig, // Expose the new update function
  };
}
