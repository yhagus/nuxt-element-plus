<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="canvas-footer">
    <div class="canvas-footer__inner">
      <span>{{ currentYear }} Canvas One. Tema studio kreatif dengan panel bergaya kertas.</span>
      <div class="canvas-footer__links">
        <NuxtLink to="/help" class="canvas-footer__link">
          Bantuan
        </NuxtLink>
        <NuxtLink to="/settings" class="canvas-footer__link">
          Pengaturan
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.canvas-footer {
  padding: 0 16px 22px;
}

.canvas-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border: 2px solid #2d221d;
  border-radius: 22px;
  background: #fffdf7;
  color: #6f5b51;
  box-shadow: 6px 6px 0 #2d221d;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.canvas-footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.canvas-footer__link {
  color: #2d221d;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
</style>
