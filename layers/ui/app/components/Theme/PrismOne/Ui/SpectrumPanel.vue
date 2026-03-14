<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string }>(), { title: undefined, description: undefined });
</script>

<template>
  <section class="spectrum-panel">
    <div v-if="title || description" class="spectrum-panel__header">
      <h2 v-if="title" class="spectrum-panel__title">
        {{ title }}
      </h2>
      <p v-if="description" class="spectrum-panel__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.spectrum-panel {
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.82));
  box-shadow: 0 18px 40px rgba(170, 115, 255, 0.1);
}
.spectrum-panel__header {
  margin-bottom: 14px;
}
.spectrum-panel__title {
  margin: 0 0 4px;
  color: #392458;
  font-size: 20px;
}
.spectrum-panel__description {
  margin: 0;
  color: #8f78ac;
  font-size: 13px;
}
</style>
