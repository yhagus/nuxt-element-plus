<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: undefined });
</script>

<template>
  <section class="sheet">
    <h2 v-if="title" class="sheet__title">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.sheet {
  padding: 12px;
  border: 1px solid #d9dcc8;
  border-radius: 12px;
  background: #fcfcf7;
}

.sheet__title {
  margin: 0 0 10px;
  color: #3f452e;
  font-size: 13px;
}
</style>
