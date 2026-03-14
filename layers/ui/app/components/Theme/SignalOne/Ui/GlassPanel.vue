<script setup lang="ts">
</script>

<template>
  <section class="glass-panel">
    <slot />
  </section>
</template>

<style scoped lang="scss">
.glass-panel {
  padding: 16px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(13, 26, 45, 0.86), rgba(9, 19, 35, 0.9));
  box-shadow:
    inset 0 0 0 1px rgba(88, 119, 166, 0.18),
    0 24px 60px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(14px);
}
</style>
