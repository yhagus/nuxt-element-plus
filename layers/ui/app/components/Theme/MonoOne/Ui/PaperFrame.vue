<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string }>(), { title: undefined, description: undefined });
</script>

<template>
  <section class="paper-frame">
    <div v-if="title || description" class="paper-frame__header">
      <h2 v-if="title" class="paper-frame__title">
        {{ title }}
      </h2>
      <p v-if="description" class="paper-frame__description">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.paper-frame {
  padding: 18px;
  border: 2px solid #111;
  background: #fff;
}
.paper-frame__header {
  margin-bottom: 14px;
}
.paper-frame__title {
  margin: 0 0 4px;
  color: #111;
  font-size: 20px;
}
.paper-frame__description {
  margin: 0;
  color: #666;
  font-size: 13px;
}
</style>
