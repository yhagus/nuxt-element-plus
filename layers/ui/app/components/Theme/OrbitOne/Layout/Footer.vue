<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="orbit-footer">
    <div class="orbit-footer__inner">
      <span>{{ currentYear }} Orbit One. Tema enterprise yang minimal dan netral.</span>
      <div class="orbit-footer__links">
        <NuxtLink to="/help" class="orbit-footer__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="orbit-footer__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.orbit-footer {
  padding: 0 16px 22px;
}

.orbit-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid #d8e0ea;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  color: #708194;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.orbit-footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.orbit-footer__link {
  color: #1f3347;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
