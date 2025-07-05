<script setup lang="ts">
interface NavigationItem {
  name: string;
  href: string;
  icon: string;
}

const sidebarOpen = ref(false);
const route = useRoute();

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: 'HomeIcon' },
  { name: 'Analytics', href: '/analytics', icon: 'ChartBarIcon' },
  { name: 'Users', href: '/users', icon: 'UsersIcon' },
  { name: 'Products', href: '/products', icon: 'CubeIcon' },
  { name: 'Settings', href: '/settings', icon: 'CogIcon' },
];

const currentPageTitle = computed(() => {
  const currentRoute = navigation.find(item => item.href === route.path);
  return currentRoute?.name || 'Dashboard';
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 lg:hidden"
      @click="sidebarOpen = false"
    >
      <div class="absolute inset-0 bg-gray-600 opacity-75" />
    </div>

    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <h1 class="text-xl font-bold text-gray-800">
          Dashboard
        </h1>
        <button
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          @click="sidebarOpen = false"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
            :class="$route.path === item.href
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'"
          >
            <component :is="item.icon" class="mr-3 h-5 w-5" />
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>

      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div class="flex items-center">
          <div class="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-medium">JD</span>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">
              John Doe
            </p>
            <p class="text-xs text-gray-500">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="lg:ml-64">
      <!-- Top navigation -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <button
                class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                @click="sidebarOpen = true"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 class="ml-2 text-lg font-semibold text-gray-800">
                {{ currentPageTitle }}
              </h2>
            </div>

            <div class="flex items-center space-x-4">
              <div class="relative">
                <button class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5l-5-5h5v-5a7.5 7.5 0 01-7.5-7.5 7.5 7.5 0 017.5-7.5 7.5 7.5 0 017.5 7.5c0 4.142-3.358 7.5-7.5 7.5v5z" />
                  </svg>
                </button>
                <span class="absolute top-0 right-0 block h-2 w-2 bg-red-400 rounded-full ring-2 ring-white" />
              </div>

              <div class="flex items-center space-x-3">
                <button class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>
