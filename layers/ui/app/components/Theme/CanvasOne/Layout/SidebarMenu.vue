<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
}

defineProps<{
  menu: SidebarMenuItem[];
}>();
</script>

<template>
  <nav class="canvas-sidebar-menu" aria-label="Sidebar menu">
    <ThemeCanvasOneLayoutSidebarMenuItem
      v-for="item in menu"
      :key="item.path"
      :item="item"
    />
  </nav>
</template>

<style scoped lang="scss">
.canvas-sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
