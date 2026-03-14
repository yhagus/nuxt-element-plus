<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <span>{{ year }} Compact One</span>
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
  border: 1px solid #d6deea;
  border-radius: 12px;
  background: #fff;
  color: #72859b;
  font-size: 11px;
}

.footer__link {
  color: #36506f;
  font-weight: 600;
  text-decoration: none;
}
</style>
