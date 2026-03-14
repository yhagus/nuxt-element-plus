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
  <section class="velvet-panel">
    <div v-if="title || description" class="velvet-panel__header">
      <h2 v-if="title" class="velvet-panel__title">
        {{ title }}
      </h2>
      <p v-if="description" class="velvet-panel__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.velvet-panel {
  padding: 18px;
  border: 1px solid rgba(214, 171, 84, 0.12);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(24, 21, 35, 0.86), rgba(16, 13, 24, 0.92));
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
}

.velvet-panel__header {
  margin-bottom: 14px;
}

.velvet-panel__title {
  margin: 0 0 4px;
  color: #faf3e6;
  font-size: 20px;
}

.velvet-panel__description {
  margin: 0;
  color: #a9a0c0;
  font-size: 13px;
}
</style>
