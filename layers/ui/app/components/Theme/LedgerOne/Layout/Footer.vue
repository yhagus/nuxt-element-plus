<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Ledger One</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin: 0 10px 10px;
  color: #8a916d;
  font-size: 11px;
}
</style>
