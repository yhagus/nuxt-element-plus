// Define the structure of your configuration
interface UserConfig {
  pagination: {
    perPage: number;
    showInfo: boolean;
  };
  artistAlbumViewMode: 'table' | 'card';
  activeColumns: Record<string, string[]>;
}

// Define the default configuration values
const defaultConfig: UserConfig = {
  pagination: {
    perPage: 50,
    showInfo: true,
  },
  artistAlbumViewMode: 'table',
  activeColumns: {},
};

/**
 * @description A Nuxt 3 composable to manage user-specific configurations.
 * It uses a cookie for persistence, making the config available on both server and client
 * to prevent a flash of default settings.
 */
export function useConfig() {
  // useCookie creates a reactive ref that is synced with the browser cookie.
  // It works on both the server and client.
  const config = useCookie<UserConfig>('user-config', {
    default: () => ({ ...defaultConfig }),
    // Set the cookie to expire in one year.
    maxAge: 60 * 60 * 24 * 365,
  });

  /**
   * Retrieves a specific configuration value.
   * @param key - The key of the configuration to retrieve.
   * @returns The value of the configuration.
   */
  const getConfig = <K extends keyof UserConfig>(key: K): UserConfig[K] => {
    // The value from useCookie can be null if it's not set, so we fall back to defaults.
    return (config.value && config.value[key]) || defaultConfig[key];
  };

  /**
   * Updates a specific configuration value.
   * @param key - The key of the configuration to update.
   * @param value - The new value for the configuration.
   */
  const setConfig = <K extends keyof UserConfig>(key: K, value: UserConfig[K]) => {
    // To trigger the update, we assign a new object to the cookie ref.
    config.value = {
      ...config.value,
      [key]: value,
    };
  };

  /**
   * Resets the configuration to its default state.
   */
  const resetConfig = () => {
    config.value = { ...defaultConfig };
  };

  return {
    config,
    getConfig,
    setConfig,
    resetConfig,
  };
}
