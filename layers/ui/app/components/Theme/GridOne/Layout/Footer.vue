<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="grid-footer">
    <div class="grid-footer__inner">
      <span>{{ currentYear }} Grid One. Tema terminal padat untuk observabilitas.</span>
      <div class="grid-footer__links">
        <NuxtLink to="/help" class="grid-footer__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="grid-footer__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.grid-footer {
  padding: 0 16px 22px;
}

.grid-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(43, 255, 146, 0.12);
  background: rgba(8, 17, 14, 0.92);
  color: #7bcba0;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.grid-footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.grid-footer__link {
  color: #dcffe9;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
