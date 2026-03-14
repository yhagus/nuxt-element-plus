<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: undefined });
</script>

<template>
  <section class="frame">
    <h2 v-if="title" class="frame__title">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.frame {
  padding: 12px;
  border: 1px solid #dce2e5;
  border-radius: 14px;
  background: #fff;
}

.frame__title {
  margin: 0 0 10px;
  color: #23373d;
  font-size: 13px;
}
</style>
