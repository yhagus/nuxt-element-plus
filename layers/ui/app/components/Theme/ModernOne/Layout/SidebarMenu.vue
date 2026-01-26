<script setup lang="ts">
const menus: IMenu[] = [
  {
    title: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    path: '/',
  },
  {
    title: 'Promotor',
    icon: 'hugeicons:promotion',
    path: '/promotor',
    children: [
      {
        title: 'Ringkasan',
        path: '/promotor/overview',
      },
      {
        title: 'Persetujuan',
        path: '/promotor/approval-request',
      },
      {
        title: 'Daftar Promotor',
        path: '/promotor/list',
      },
      {
        title: 'Manajemen Pengguna',
        path: '/promotor/user-management',
        children: [
          {
            title: 'Peran',
            path: '/promotor/user-management/roles',
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <nav class="sidebar-menu">
    <ul class="sidebar-menu__list">
      <li v-for="item in menus" :key="item.path ?? item.title">
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
