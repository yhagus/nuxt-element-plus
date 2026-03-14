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
  <section class="section-frame">
    <div v-if="title || description" class="section-frame__header">
      <h2 v-if="title" class="section-frame__title">
        {{ title }}
      </h2>
      <p v-if="description" class="section-frame__description">
        {{ description }}
      </p>
    </div>
    <div class="section-frame__body">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-frame {
  padding: 18px;
  border-radius: 28px;
  background: rgba(255, 252, 246, 0.86);
  box-shadow:
    inset 0 0 0 1px rgba(113, 155, 145, 0.16),
    0 24px 60px rgba(68, 94, 88, 0.08);
}

.section-frame__header {
  margin-bottom: 14px;
}

.section-frame__title {
  margin: 0 0 4px;
  color: #173732;
  font-size: 20px;
}

.section-frame__description {
  margin: 0;
  color: #5f7d76;
  font-size: 13px;
}

.section-frame__body {
  min-height: 120px;
}
</style>
