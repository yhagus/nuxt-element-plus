<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer-frame">
    <div class="footer-frame__inner">
      <span>{{ currentYear }} Horizon Two. Tema editorial untuk dashboard yang lebih ringan.</span>
      <div class="footer-frame__links">
        <NuxtLink to="/help" class="footer-frame__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="footer-frame__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-frame {
  padding: 0 14px 20px;
}

.footer-frame__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 24px;
  background: rgba(255, 252, 246, 0.78);
  color: #55716a;
  box-shadow: inset 0 0 0 1px rgba(113, 155, 145, 0.16);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.footer-frame__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-frame__link {
  color: #173732;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
