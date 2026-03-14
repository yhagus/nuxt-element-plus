<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Banner One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 0 16px 16px;
  color: #a17e65;
  font-size: 12px;
}
</style>
