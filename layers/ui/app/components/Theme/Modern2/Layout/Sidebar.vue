<script setup lang="ts">
const props = defineProps<{
  isCollapse: boolean;
}>();

interface ISidebarMenu {
  title: string;
  path: string;
  icon?: string;
  children?: ISidebarMenu[];
}

const settingsRoots = ref<string[]>(['/user-management', '/configuration', '/log']);

const menuItems = ref<ISidebarMenu[]>([
  {
    title: 'Dashboard',
    path: '/',
    icon: 'lucide:layout-dashboard',
  },
  {
    title: 'Management',
    path: '/management',
    icon: 'lucide:briefcase-business',
    children: [
      {
        title: 'Customers',
        path: '/management/customers',
      },
      {
        title: 'Activation',
        path: '/management/activation',
      },
      {
        title: 'Devices',
        path: '/management/devices',
      },
    ],
  },
  {
    title: 'Business',
    path: '/business',
    icon: 'lucide:building-2',
    children: [
      {
        title: 'Packages',
        path: '/business/packages',
      },
    ],
  },
  {
    title: 'Revenues',
    path: '/revenues',
    icon: 'lucide:wallet',
    children: [
      {
        title: 'Payment',
        path: '/revenues/payment',
      },
    ],
  },
  {
    title: 'Analysis & Report',
    path: '/analysis-report',
    icon: 'lucide:chart-column',
    children: [
      {
        title: 'Airports',
        path: '/analysis-report/airports',
      },
      {
        title: 'Flights',
        path: '/analysis-report/flights',
      },
    ],
  },
  {
    title: 'Broadcast',
    path: '/broadcast',
    icon: 'lucide:radio-tower',
    children: [
      {
        title: 'Running Text',
        path: '/broadcast/running-text',
      },
    ],
  },
  {
    title: 'Configuration',
    path: '/configuration',
    icon: 'lucide:settings',
    children: [
      {
        title: 'Airport',
        path: '/configuration/airport',
      },
      {
        title: 'Airline',
        path: '/configuration/airline',
      },
      {
        title: 'Page',
        path: '/configuration/page',
      },
      {
        title: 'SMTP',
        path: '/configuration/smtp',
      },
    ],
  },
  {
    title: 'User Management',
    path: '/user-management',
    icon: 'lucide:users',
    children: [
      {
        title: 'Users',
        path: '/user-management/users',
      },
      {
        title: 'Roles',
        path: '/user-management/roles',
      },
    ],
  },
  {
    title: 'Log',
    path: '/log',
    icon: 'lucide:scroll-text',
    children: [
      {
        title: 'Activity',
        path: '/log/activity',
      },
      {
        title: 'Login',
        path: '/log/login',
      },
    ],
  },
]);

const mainMenu = computed<ISidebarMenu[]>(() =>
  menuItems.value
    .filter(menu => !settingsRoots.value.includes(menu.path)),
);

const settingsMenu = computed<ISidebarMenu[]>(() =>
  menuItems.value
    .filter(menu => settingsRoots.value.includes(menu.path)),
);

const mainSidebarRef = ref<HTMLElement | null>(null);
const showScrollDownIndicator = ref(false);

function updateScrollIndicator() {
  if (!mainSidebarRef.value) {
    showScrollDownIndicator.value = false;
    return;
  }

  const { scrollTop, clientHeight, scrollHeight } = mainSidebarRef.value;
  showScrollDownIndicator.value = scrollTop + clientHeight < scrollHeight - 2;
}

onMounted(() => {
  nextTick(updateScrollIndicator);
  window.addEventListener('resize', updateScrollIndicator);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScrollIndicator);
});

onUpdated(() => {
  nextTick(updateScrollIndicator);
});
</script>

<template>
  <div class="min-h-screen border-r-[0.5px] border-[#E6E6E6] bg-gray-900">
    <div class="flex flex-col gap-4 py-4">
      <div v-if="!props.isCollapse" class="h-fit flex mx-auto w-64 px-4 py-8">
        <img alt="" src="/svg/logo.svg">
      </div>
      <div v-else class="h-fit flex mx-auto w-10 py-6">
        <img alt="" src="/img/logo-mobile.png">
      </div>
      <div class="relative">
        <div
          id="main-sidebar"
          ref="mainSidebarRef"
          class="flex max-h-[calc(100vh-100px)] flex-col gap-4 overflow-y-auto"
          @scroll="updateScrollIndicator"
        >
          <div
            v-if="mainMenu.length"
            :class="
              !props.isCollapse ? 'border-b-[0.5px] border-dashed border-[#AFB1C9] pb-4' : ''
            "
          >
            <span v-if="!props.isCollapse" class="uppercase px-4 text-xs text-gray-400 font-medium">
              Menu Utama
            </span>
            <ThemeModern2LayoutSidebarMenu v-if="!props.isCollapse" :menu="mainMenu" />
            <ThemeModern2LayoutSidebarMenuCollapse v-else :menu="mainMenu" />
          </div>
          <div v-if="settingsMenu.length">
            <span
              v-if="!props.isCollapse"
              class="uppercase px-4 mt-2 text-xs text-gray-400 font-medium"
            >
              Pengaturan
            </span>
            <ThemeModern2LayoutSidebarMenu
              v-if="!props.isCollapse"
              :menu="settingsMenu"
            />
            <ThemeModern2LayoutSidebarMenuCollapse
              v-else
              :menu="settingsMenu"
              class="mt-2!"
            />
          </div>
        </div>
        <div
          v-if="showScrollDownIndicator"
          class="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent pb-1 pt-6 text-gray-400"
        >
          <NIcon name="lucide:chevrons-down" size="16px" class="animate-bounce" />
        </div>
      </div>
    </div>
  </div>
</template>
