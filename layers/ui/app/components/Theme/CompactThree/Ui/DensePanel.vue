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
  border: 1px solid #f0d7dd;
  border-radius: 12px;
  background: #fff;
}
.dense-panel__title {
  margin: 0 0 8px;
  color: #5b2735;
  font-size: 13px;
}
</style>
