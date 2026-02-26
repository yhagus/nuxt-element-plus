<script setup lang="ts">
const props = defineProps<{
  menu: ISidebarMenu;
  submenu: ISidebarMenu[];
}>();

const route = useRoute();
const isOpen = ref(false);

const hasActiveChild = computed<boolean>(() => {
  return props.submenu.some((item) => {
    if (isActive(item.path)) {
      return true;
    }

    return item.children?.some(child => isActive(child.path));
  });
});

watch(
  hasActiveChild,
  (value) => {
    if (value) {
      isOpen.value = true;
    }
  },
  { immediate: true },
);

function isActive(path: string): boolean {
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(path);

  if (targetPath === '/') {
    return currentPath === '/';
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

function normalizePath(path: string): string {
  if (path === '/') {
    return path;
  }

  return path.replace(/\/+$/, '');
}
</script>

<template>
  <div>
    <button
      class="cursor-pointer flex h-10 w-full items-center px-4 text-sm font-medium text-[#AFB1C9] transition hover:bg-primary hover:text-black"
      @click="isOpen = !isOpen"
    >
      <NIcon v-if="menu.icon" :name="menu.icon" class="mr-3 min-h-6 min-w-6" />
      <span class="flex-1 text-left">{{ menu.title }}</span>
      <NIcon
        name="lucide:chevron-down"
        class="min-h-4 min-w-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <ul v-show="isOpen" class="space-y-1 py-1">
      <template v-for="item in submenu" :key="item.path">
        <li>
          <ThemeModern2LayoutSidebarMenuChild
            v-if="item.children?.length"
            :menu="item"
            :submenu="item.children"
          />
          <div
            v-else
            class="cursor-pointer relative flex h-9 w-full items-center px-16 text-sm font-medium text-[#AFB1C9] transition hover:bg-primary hover:text-black"
            :class="{ 'bg-primary text-black': isActive(item.path) }"
            @click="navigateTo(item.path, { replace: true })"
          >
            <div
              v-if="isActive(item.path)"
              class="absolute left-0 h-8 w-1 bg-black/80 rounded-e"
            />
            {{ item.title }}
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
