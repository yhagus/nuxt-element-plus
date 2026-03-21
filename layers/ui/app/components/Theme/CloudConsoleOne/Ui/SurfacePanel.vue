<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <section class="surface-panel">
    <header class="surface-panel__header">
      <h2 class="surface-panel__title">{{ props.title }}</h2>
      <p v-if="props.description" class="surface-panel__description">
        {{ props.description }}
      </p>
    </header>
    <div class="surface-panel__body">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.surface-panel {
  border: 1px solid #d8e3f3;
  background: #ffffff;
  border-radius: 14px;
  padding: 14px;
}

.surface-panel__header {
  margin-bottom: 10px;
}

.surface-panel__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #17304d;
}

.surface-panel__description {
  margin: 4px 0 0;
  font-size: 12px;
  color: #5e7390;
}

.surface-panel__body {
  min-height: 220px;
}
</style>
