<script setup lang="ts">
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
    <ThemeModernOneLayoutSidebarMenu />
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
