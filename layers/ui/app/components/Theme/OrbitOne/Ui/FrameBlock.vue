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
  <section class="frame-block">
    <div v-if="title || description" class="frame-block__header">
      <h2 v-if="title" class="frame-block__title">
        {{ title }}
      </h2>
      <p v-if="description" class="frame-block__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.frame-block {
  padding: 18px;
  border: 1px solid #d8e0ea;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.92);
}

.frame-block__header {
  margin-bottom: 14px;
}

.frame-block__title {
  margin: 0 0 4px;
  color: #1f3347;
  font-size: 20px;
}

.frame-block__description {
  margin: 0;
  color: #7d8ea0;
  font-size: 13px;
}
</style>
