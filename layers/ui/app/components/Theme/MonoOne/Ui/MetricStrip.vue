<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="metric-strip">
    <span class="metric-strip__label">{{ label }}</span>
    <strong class="metric-strip__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.metric-strip {
  padding: 16px;
  border: 2px solid #111;
  background: #fff;
}
.metric-strip__label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
}
.metric-strip__value {
  display: block;
  color: #111;
  font-size: 26px;
}
</style>
