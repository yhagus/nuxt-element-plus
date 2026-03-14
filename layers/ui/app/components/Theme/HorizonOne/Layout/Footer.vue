<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer-shell">
    <div class="footer-shell__inner">
      <p class="footer-shell__copy">
        {{ currentYear }} Horizon. Ruang kerja operasional untuk tim internal.
      </p>
      <div class="footer-shell__links">
        <NuxtLink to="/help" class="footer-shell__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="footer-shell__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-shell {
  padding: 0 12px 16px;

  @media (min-width: 768px) {
    padding: 0 16px 20px;
  }

  @media (min-width: 1280px) {
    padding: 0 20px 24px;
  }
}

.footer-shell__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 22px;
  background: rgba(255, 251, 245, 0.78);
  box-shadow:
    inset 0 0 0 1px rgba(145, 107, 71, 0.1),
    0 16px 40px rgba(97, 76, 57, 0.06);

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.footer-shell__copy {
  margin: 0;
  color: #6b5646;
  font-size: 13px;
}

.footer-shell__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-shell__link {
  color: #4f3424;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
