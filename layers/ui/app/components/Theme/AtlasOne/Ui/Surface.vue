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
  <section class="surface">
    <div v-if="title || description" class="surface__header">
      <h2 v-if="title" class="surface__title">
        {{ title }}
      </h2>
      <p v-if="description" class="surface__description">
        {{ description }}
      </p>
    </div>
    <div class="surface__body">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.surface {
  padding: 18px;
  border: 1px solid #d7e4dd;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
}

.surface__header {
  margin-bottom: 14px;
}

.surface__title {
  margin: 0 0 4px;
  color: #1d352e;
  font-size: 20px;
}

.surface__description {
  margin: 0;
  color: #709089;
  font-size: 13px;
}
</style>
