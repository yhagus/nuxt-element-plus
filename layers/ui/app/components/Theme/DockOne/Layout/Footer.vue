<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Dock One</span>
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
  color: #6c86a6;
  font-size: 11px;
}

.footer__link {
  color: #3d6cc9;
  font-weight: 600;
  text-decoration: none;
}
</style>
