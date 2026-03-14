<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Split One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin: 0 10px 10px;
  color: #7b9299;
  font-size: 11px;
}
</style>
