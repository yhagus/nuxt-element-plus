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
  <section class="soft-panel">
    <div v-if="title || description" class="soft-panel__header">
      <h2 v-if="title" class="soft-panel__title">
        {{ title }}
      </h2>
      <p v-if="description" class="soft-panel__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.soft-panel {
  padding: 18px;
  border: 1px solid #dbe7f6;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 40px rgba(92, 121, 164, 0.08);
}

.soft-panel__header {
  margin-bottom: 14px;
}

.soft-panel__title {
  margin: 0 0 4px;
  color: #2c4367;
  font-size: 20px;
}

.soft-panel__description {
  margin: 0;
  color: #8aa0bc;
  font-size: 13px;
}
</style>
