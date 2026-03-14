<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Portal One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 16px;
  color: #7c87a2;
  font-size: 12px;
}
</style>
