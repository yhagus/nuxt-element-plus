<script setup lang="ts">
const menus = [
  {
    title: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    path: '/',
  },
  {
    title: 'Data Mentah',
    icon: 'lucide:database',
    path: '/raw-data',
    children: [
      {
        title: 'FlightRadar24',
        icon: 'lucide:activity',
        path: '/raw-data/flradar',
        children: [
          {
            title: 'Airports',
            icon: 'lucide:map-pin',
            path: '/raw-data/flradar/airports',
          },
          {
            title: 'Airlines',
            icon: 'lucide:plane',
            path: '/raw-data/flradar/airlines',
          },
        ],
      },
    ],
  },
  {
    title: 'Pengaturan',
    icon: 'lucide:settings',
    path: '/settings',
    children: [
      {
        title: 'Role',
        icon: 'lucide:shield-check',
        path: '/settings/roles',
      },
      {
        title: 'User',
        icon: 'lucide:users',
        path: '/settings/users',
      },
    ],
  },
];
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img
        src=""
        alt=""
        class="sidebar__logo-image"
      >
    </div>
    <ThemeModernOneLayoutSidebarMenu :menus="menus" />
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  min-height: 100vh;
  border-right: 1px solid #2b2c30;
  background-color: rgb(25, 26, 28);
  padding-bottom: 40px;
}

.sidebar__logo {
  display: flex;
  justify-content: center;
  padding: 16px;
}

.sidebar__logo-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
