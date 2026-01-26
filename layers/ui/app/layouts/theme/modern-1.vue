<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <aside class="layout__aside">
      <ThemeModernOneLayoutSidebar />
    </aside>
    <div class="layout__content">
      <header class="layout__header">
        <ThemeModernOneLayoutHeader />
      </header>
      <main class="layout__main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.bunny.net/css?family=plus-jakarta-sans:200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i');

.layout {
  position: relative;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
}

.layout__aside {
  position: fixed;
  z-index: 10;
  width: 256px;
  max-height: 100vh;
}

.layout__content {
  padding-left: 256px;
}

.layout__header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: auto;
  padding: 0;
}

.layout__main {
  height: calc(100vh - 84px);
}

.layout__main:has(.calendar) {
  padding: 0;
}
</style>
