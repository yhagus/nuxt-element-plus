<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Outline One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin: 0 16px 16px;
  color: #6d6d6d;
  font-size: 12px;
}
</style>
