<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <span>{{ currentYear }} Aurora One. Tema glow lembut bernuansa dingin.</span>
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
  background: rgba(255, 255, 255, 0.72);
  color: #8ba0c0;
  box-shadow: 0 16px 40px rgba(109, 150, 255, 0.08);
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
  color: #2f486b;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
