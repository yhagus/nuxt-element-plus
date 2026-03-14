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
  border: 1px solid #252c38;
  border-radius: 12px;
  background: #181e27;
}
.mini-stat__label {
  display: block;
  margin-bottom: 4px;
  color: #7d8aa1;
  font-size: 10px;
  text-transform: uppercase;
}
.mini-stat__value {
  display: block;
  color: #eef3ff;
  font-size: 18px;
}
</style>
