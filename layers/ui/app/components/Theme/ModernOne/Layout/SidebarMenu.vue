<script setup lang="ts">
interface Props {
  menus: IMenu[];
}

interface IMenu {
  title: string;
  path: string;
  icon?: string;
  children?: IMenu[];
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <nav class="sidebar-menu">
    <ul class="sidebar-menu__list">
      <li v-for="item in props.menus" :key="item.path ?? item.title">
        <ThemeModernOneLayoutSidebarMenuNode :menu="item" :level="0" />
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.sidebar-menu {
  color: #ffffff;
}

.sidebar-menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
