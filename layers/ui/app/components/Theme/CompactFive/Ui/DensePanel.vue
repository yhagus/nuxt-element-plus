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
  border: 1px solid #252c38;
  border-radius: 12px;
  background: #181e27;
}
.dense-panel__title {
  margin: 0 0 8px;
  color: #eef3ff;
  font-size: 13px;
}
</style>
