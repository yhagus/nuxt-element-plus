<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Stack One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin: 0 14px 14px;
  color: #8d7ea5;
  font-size: 12px;
}
</style>
