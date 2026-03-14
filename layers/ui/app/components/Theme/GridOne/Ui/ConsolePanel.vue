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
  <section class="console-panel">
    <div v-if="title || description" class="console-panel__header">
      <h2 v-if="title" class="console-panel__title">
        {{ title }}
      </h2>
      <p v-if="description" class="console-panel__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.console-panel {
  padding: 16px;
  border: 1px solid rgba(43, 255, 146, 0.12);
  background: rgba(8, 17, 14, 0.88);
}

.console-panel__header {
  margin-bottom: 12px;
}

.console-panel__title {
  margin: 0 0 4px;
  color: #dcffe9;
  font-size: 18px;
}

.console-panel__description {
  margin: 0;
  color: #7bcba0;
  font-size: 12px;
  font-family: monospace;
}
</style>
