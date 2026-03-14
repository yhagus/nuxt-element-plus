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
  border: 1px solid #f0d7dd;
  border-radius: 12px;
  background: #fff;
}
.mini-stat__label {
  display: block;
  margin-bottom: 4px;
  color: #b88a97;
  font-size: 10px;
  text-transform: uppercase;
}
.mini-stat__value {
  display: block;
  color: #5b2735;
  font-size: 18px;
}
</style>
