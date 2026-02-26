<script setup lang="ts">
defineProps<{
  menu: ISidebarMenu[];
}>();

const route = useRoute();

function normalizePath(path: string): string {
  if (path === '/') {
    return path;
  }

  return path.replace(/\/+$/, '');
}

function isActive(path: string): boolean {
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(path);

  if (targetPath === '/') {
    return currentPath === '/';
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}
</script>

<template>
  <nav class="pt-2">
    <ul class="space-y-1">
      <template v-for="item in menu" :key="item.path">
        <li>
          <ThemeModern2LayoutSidebarMenuChild
            v-if="item.children?.length"
            :menu="item"
            :submenu="item.children"
          />
          <div
            v-else
            class="cursor-pointer group relative flex h-10 w-full items-center px-4 text-sm font-medium text-[#AFB1C9] transition hover:bg-primary hover:text-black"
            :class="{ 'bg-primary text-black': isActive(item.path) }"
            @click="navigateTo(item.path, { replace: true })"
          >
            <div class="relative mr-3 flex items-center justify-center">
              <div
                v-if="isActive(item.path)"
                class="absolute -left-5 h-7 w-1 bg-white"
              />
              <NIcon :name="item.icon ?? ''" class="min-h-6 min-w-6 max-h-6 max-w-6" />
            </div>
            <span>{{ item.title }}</span>
          </div>
        </li>
      </template>
    </ul>
  </nav>
</template>
