<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="noctis-footer">
    <div class="noctis-footer__inner">
      <span>{{ currentYear }} Noctis One. Tema premium dengan nuansa gelap dan aksen emas.</span>
      <div class="noctis-footer__links">
        <NuxtLink to="/help" class="noctis-footer__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="noctis-footer__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.noctis-footer {
  padding: 0 16px 22px;
}

.noctis-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(214, 171, 84, 0.12);
  border-radius: 18px;
  background: rgba(24, 21, 35, 0.8);
  color: #a9a0c0;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.noctis-footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.noctis-footer__link {
  color: #f7ead1;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
