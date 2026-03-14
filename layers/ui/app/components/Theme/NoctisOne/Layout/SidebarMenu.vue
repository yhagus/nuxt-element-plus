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
  <nav class="noctis-sidebar-menu" aria-label="Sidebar menu">
    <ThemeNoctisOneLayoutSidebarMenuItem
      v-for="item in menu"
      :key="item.path"
      :item="item"
    />
  </nav>
</template>

<style scoped lang="scss">
.noctis-sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
