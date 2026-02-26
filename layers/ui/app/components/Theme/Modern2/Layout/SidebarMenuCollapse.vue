<script setup lang="ts">
interface ISidebarMenu {
  title: string;
  path: string;
  icon?: string;
  children?: ISidebarMenu[];
}

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

function isPathActive(path: string): boolean {
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(path);

  if (targetPath === '/') {
    return currentPath === '/';
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

function isActive(menu: ISidebarMenu): boolean {
  if (isPathActive(menu.path)) {
    return true;
  }

  return Boolean(menu.children?.some(item => isPathActive(item.path)));
}
</script>

<template>
  <nav>
    <ul class="space-y-1">
      <template v-for="item in menu" :key="item.path">
        <UiTooltip placement="right" :content="item.title" :show-after="500">
          <li>
            <div
              class="cursor-pointer relative flex h-10 w-full items-center justify-center text-[#AFB1C9] transition hover:rounded-sm hover:bg-primary hover:text-black"
              :class="{ 'rounded-sm bg-primary text-black': isActive(item) }"
              @click="navigateTo(item.path, { replace: true })"
            >
              <div class="relative flex items-center justify-center">
                <NIcon :name="item.icon ?? ''" class="min-h-6 min-w-6" />
              </div>
            </div>
          </li>
        </UiTooltip>
      </template>
    </ul>
  </nav>
</template>
