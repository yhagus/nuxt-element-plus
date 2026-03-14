<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: undefined });
</script>

<template>
  <section class="canvas">
    <h2 v-if="title" class="canvas__title">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.canvas {
  padding: 14px;
  border: 1px solid #e1d5c8;
  border-radius: 18px;
  background: #fffaf3;
}

.canvas__title {
  margin: 0 0 12px;
  color: #4f3a29;
  font-size: 14px;
}
</style>
