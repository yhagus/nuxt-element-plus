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
  <nav class="atlas-sidebar-menu" aria-label="Sidebar menu">
    <ThemeAtlasOneLayoutSidebarMenuItem
      v-for="item in menu"
      :key="item.path"
      :item="item"
    />
  </nav>
</template>

<style scoped lang="scss">
.atlas-sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
