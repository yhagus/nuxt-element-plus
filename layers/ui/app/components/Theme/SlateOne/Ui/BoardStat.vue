<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="board-stat">
    <span class="board-stat__label">{{ label }}</span>
    <strong class="board-stat__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.board-stat {
  padding: 16px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 12px 26px rgba(64, 82, 102, 0.08);
}
.board-stat__label {
  display: block;
  margin-bottom: 8px;
  color: #7e8d9f;
  font-size: 12px;
  text-transform: uppercase;
}
.board-stat__value {
  display: block;
  color: #2d3a4a;
  font-size: 26px;
}
</style>
