<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string }>(), { title: undefined, description: undefined });
</script>

<template>
  <section class="mist-panel">
    <div v-if="title || description" class="mist-panel__header">
      <h2 v-if="title" class="mist-panel__title">
        {{ title }}
      </h2>
      <p v-if="description" class="mist-panel__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.mist-panel {
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 18px 40px rgba(109, 150, 255, 0.08);
  backdrop-filter: blur(16px);
}
.mist-panel__header {
  margin-bottom: 14px;
}
.mist-panel__title {
  margin: 0 0 4px;
  color: #2f486b;
  font-size: 20px;
}
.mist-panel__description {
  margin: 0;
  color: #8ba0c0;
  font-size: 13px;
}
</style>
