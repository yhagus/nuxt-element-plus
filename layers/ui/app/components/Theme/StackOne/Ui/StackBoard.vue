<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: undefined });
</script>

<template>
  <section class="board">
    <h2 v-if="title" class="board__title">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.board {
  padding: 18px;
  border-radius: 20px;
  background: #fff;
  box-shadow:
    0 0 0 1px rgba(111, 92, 135, 0.12),
    0 10px 24px rgba(111, 92, 135, 0.08);
}

.board__title {
  margin: 0 0 14px;
  color: #382d48;
  font-size: 15px;
}
</style>
