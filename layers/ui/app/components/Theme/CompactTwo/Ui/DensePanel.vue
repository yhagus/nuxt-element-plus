<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: undefined });
</script>

<template>
  <section class="dense-panel">
    <h2 v-if="title" class="dense-panel__title">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.dense-panel {
  padding: 10px;
  border: 1px solid #d4e3d4;
  border-radius: 12px;
  background: #fff;
}
.dense-panel__title {
  margin: 0 0 8px;
  color: #203826;
  font-size: 13px;
}
</style>
