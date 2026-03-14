<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="atlas-footer">
    <div class="atlas-footer__inner">
      <span>{{ currentYear }} Atlas One. Tema terang dengan aksen peta operasional.</span>
      <div class="atlas-footer__links">
        <NuxtLink to="/help" class="atlas-footer__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="atlas-footer__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.atlas-footer {
  padding: 0 16px 22px;
}

.atlas-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border: 1px solid #d7e4dd;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.8);
  color: #63817a;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.atlas-footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.atlas-footer__link {
  color: #215c50;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
