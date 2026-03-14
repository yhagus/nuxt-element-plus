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
  border: 1px solid #dedff7;
  border-radius: 14px;
  background: #fff;
}

.panel__title {
  margin: 0 0 10px;
  color: #353a7a;
  font-size: 13px;
}
</style>
