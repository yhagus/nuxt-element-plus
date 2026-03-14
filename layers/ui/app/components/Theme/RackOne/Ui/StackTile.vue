<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="tile">
    <span class="tile__label">{{ label }}</span>
    <strong class="tile__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.tile {
  padding: 10px;
  border-radius: 12px;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(116, 91, 68, 0.12);
}

.tile__label {
  display: block;
  margin-bottom: 4px;
  color: #a1836d;
  font-size: 10px;
  text-transform: uppercase;
}

.tile__value {
  display: block;
  color: #503a29;
  font-size: 18px;
}
</style>
