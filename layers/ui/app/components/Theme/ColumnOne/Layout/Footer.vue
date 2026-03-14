<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Column One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin: 0 16px 16px;
  color: #9d7f66;
  font-size: 12px;
}
</style>
