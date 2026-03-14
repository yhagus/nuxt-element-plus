<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  value: string;
  tone?: 'rose' | 'cobalt' | 'sand';
}>(), {
  tone: 'rose',
});

const toneClass = computed(() => `badge-panel--${props.tone}`);
</script>

<template>
  <div class="badge-panel" :class="toneClass">
    <span class="badge-panel__label">{{ label }}</span>
    <strong class="badge-panel__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.badge-panel {
  padding: 16px;
  border: 2px solid #2d221d;
  border-radius: 18px;
  background: #fff;
}

.badge-panel__label {
  display: block;
  margin-bottom: 6px;
  color: #7e695f;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.badge-panel__value {
  color: #2d221d;
  font-size: 20px;
}

.badge-panel--rose {
  background: #ffe0dc;
}

.badge-panel--cobalt {
  background: #dce6ff;
}

.badge-panel--sand {
  background: #f6e9cf;
}
</style>
