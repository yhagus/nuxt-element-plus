<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: undefined });
</script>

<template>
  <section class="panel">
    <h2 v-if="title" class="panel__title">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.panel {
  padding: 12px;
  border: 1px solid #d5e2f6;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
}

.panel__title {
  margin: 0 0 10px;
  color: #27415f;
  font-size: 13px;
}
</style>
