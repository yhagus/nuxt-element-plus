<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Inset One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin: 0 10px 10px;
  color: #9b856d;
  font-size: 11px;
}
</style>
