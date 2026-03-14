<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Compact Five</span>
    <NuxtLink to="/settings" class="footer__link">
      Pengaturan
    </NuxtLink>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0 10px 10px;
  padding: 8px 10px;
  border: 1px solid #252c38;
  border-radius: 12px;
  background: #181e27;
  color: #7d8aa1;
  font-size: 11px;
}
.footer__link {
  color: #8bb2ff;
  font-weight: 600;
  text-decoration: none;
}
</style>
