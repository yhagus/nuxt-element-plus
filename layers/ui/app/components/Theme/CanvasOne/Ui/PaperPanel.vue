<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  description?: string;
}>(), {
  title: undefined,
  description: undefined,
});
</script>

<template>
  <section class="paper-panel">
    <div v-if="title || description" class="paper-panel__header">
      <h2 v-if="title" class="paper-panel__title">
        {{ title }}
      </h2>
      <p v-if="description" class="paper-panel__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.paper-panel {
  padding: 18px;
  border: 2px solid #2d221d;
  border-radius: 24px;
  background: #fffdf7;
  box-shadow: 8px 8px 0 #2d221d;
}

.paper-panel__header {
  margin-bottom: 14px;
}

.paper-panel__title {
  margin: 0 0 4px;
  color: #2d221d;
  font-size: 20px;
}

.paper-panel__description {
  margin: 0;
  color: #7e695f;
  font-size: 13px;
}
</style>
