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
  border: 1px solid #d8dce9;
  border-radius: 22px;
  background: #fff;
}

.board__title {
  margin: 0 0 14px;
  color: #28344f;
  font-size: 15px;
}
</style>
