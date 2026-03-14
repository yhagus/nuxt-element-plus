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
  padding: 16px;
  border: 1px solid #e6d6c9;
  border-radius: 20px;
  background: #fffaf4;
}

.board__title {
  margin: 0 0 12px;
  color: #5b3e2a;
  font-size: 15px;
}
</style>
