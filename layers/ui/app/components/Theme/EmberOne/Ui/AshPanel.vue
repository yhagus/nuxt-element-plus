<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string }>(), { title: undefined, description: undefined });
</script>

<template>
  <section class="ash-panel">
    <div v-if="title || description" class="ash-panel__header">
      <h2 v-if="title" class="ash-panel__title">
        {{ title }}
      </h2>
      <p v-if="description" class="ash-panel__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.ash-panel {
  padding: 18px;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(255, 127, 86, 0.1);
}
.ash-panel__header {
  margin-bottom: 14px;
}
.ash-panel__title {
  margin: 0 0 4px;
  color: #5c3426;
  font-size: 20px;
}
.ash-panel__description {
  margin: 0;
  color: #a27d6b;
  font-size: 13px;
}
</style>
