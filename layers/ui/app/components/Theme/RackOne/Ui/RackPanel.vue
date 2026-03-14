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
  border-radius: 14px;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(116, 91, 68, 0.12);
}

.panel__title {
  margin: 0 0 10px;
  color: #503a29;
  font-size: 13px;
}
</style>
