<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="signal-footer">
    <ThemeSignalOneUiGlassPanel class="signal-footer__inner">
      <span>{{ currentYear }} Signal. Console bertema gelap untuk observabilitas dan operasi.</span>
      <div class="signal-footer__links">
        <NuxtLink to="/help" class="signal-footer__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="signal-footer__link">
          Pengaturan
        </NuxtLink>
      </div>
    </ThemeSignalOneUiGlassPanel>
  </footer>
</template>

<style scoped lang="scss">
.signal-footer {
  padding: 0 14px 22px;
}

.signal-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #9ab1d3;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.signal-footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.signal-footer__link {
  color: #e7f0ff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
