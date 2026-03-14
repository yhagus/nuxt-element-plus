<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="lumen-footer">
    <div class="lumen-footer__inner">
      <span>{{ currentYear }} Lumen One. Tema SaaS ringan untuk admin modern.</span>
      <div class="lumen-footer__links">
        <NuxtLink to="/help" class="lumen-footer__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="lumen-footer__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.lumen-footer {
  padding: 0 16px 22px;
}

.lumen-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid #dbe7f6;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.86);
  color: #8aa0bc;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.lumen-footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.lumen-footer__link {
  color: #2c4367;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
