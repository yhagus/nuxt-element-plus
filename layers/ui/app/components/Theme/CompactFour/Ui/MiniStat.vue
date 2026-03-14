<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="mini-stat">
    <span class="mini-stat__label">{{ label }}</span>
    <strong class="mini-stat__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.mini-stat {
  padding: 10px;
  border: 1px solid #dde0f6;
  border-radius: 12px;
  background: #fff;
}
.mini-stat__label {
  display: block;
  margin-bottom: 4px;
  color: #8b90c8;
  font-size: 10px;
  text-transform: uppercase;
}
.mini-stat__value {
  display: block;
  color: #313775;
  font-size: 18px;
}
</style>
