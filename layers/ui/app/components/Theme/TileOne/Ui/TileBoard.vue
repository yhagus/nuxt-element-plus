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
  border: 1px solid #d9dfd5;
  border-radius: 18px;
  background: #fff;
}

.board__title {
  margin: 0 0 12px;
  color: #33402e;
  font-size: 14px;
}
</style>
