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
  <nav class="orbit-sidebar-menu" aria-label="Sidebar menu">
    <ThemeOrbitOneLayoutSidebarMenuItem
      v-for="item in menu"
      :key="item.path"
      :item="item"
    />
  </nav>
</template>

<style scoped lang="scss">
.orbit-sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
