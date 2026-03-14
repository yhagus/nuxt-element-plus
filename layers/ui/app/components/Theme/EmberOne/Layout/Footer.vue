<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <span>{{ currentYear }} Ember One. Tema hangat untuk dashboard komersial.</span>
      <div class="footer__links">
        <NuxtLink to="/help" class="footer__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="footer__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 0 16px 22px;
}
.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.86);
  color: #a27d6b;
  box-shadow: 0 16px 34px rgba(255, 127, 86, 0.1);
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}
.footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
}
.footer__link {
  color: #5c3426;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
