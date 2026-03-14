<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

defineProps<{
  menu: SidebarMenuItem[];
  compact: boolean;
}>();
</script>

<template>
  <nav class="sidebar-menu" aria-label="Sidebar menu">
    <ThemeSignalOneLayoutSidebarMenuItem
      v-for="item in menu"
      :key="item.path"
      :item="item"
      :compact="compact"
    />
  </nav>
</template>

<style scoped lang="scss">
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
</style>
