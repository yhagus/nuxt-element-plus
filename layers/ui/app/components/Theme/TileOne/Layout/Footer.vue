<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Tile One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 0 12px 12px;
  color: #7d8c75;
  font-size: 12px;
}
</style>
