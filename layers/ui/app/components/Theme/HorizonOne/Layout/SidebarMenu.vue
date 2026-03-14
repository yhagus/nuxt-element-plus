<script setup lang="ts">
interface SidebarMenuItem {
  title: string;
  path: string;
  icon: string;
  badge?: string;
}

defineProps<{
  menu: SidebarMenuItem[];
  isCollapse: boolean;
}>();
</script>

<template>
  <nav class="sidebar-menu" aria-label="Sidebar menu">
    <ThemeHorizonOneLayoutSidebarMenuNode
      v-for="item in menu"
      :key="item.path"
      :item="item"
      :is-collapse="isCollapse"
    />
  </nav>
</template>

<style scoped lang="scss">
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
