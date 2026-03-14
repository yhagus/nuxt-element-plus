<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string }>(), { title: undefined, description: undefined });
</script>

<template>
  <section class="board-panel">
    <div v-if="title || description" class="board-panel__header">
      <h2 v-if="title" class="board-panel__title">
        {{ title }}
      </h2>
      <p v-if="description" class="board-panel__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.board-panel {
  padding: 18px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 14px 32px rgba(64, 82, 102, 0.08);
}
.board-panel__header {
  margin-bottom: 14px;
}
.board-panel__title {
  margin: 0 0 4px;
  color: #2d3a4a;
  font-size: 20px;
}
.board-panel__description {
  margin: 0;
  color: #7e8d9f;
  font-size: 13px;
}
</style>
