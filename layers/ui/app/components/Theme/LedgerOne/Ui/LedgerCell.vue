<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="cell">
    <span class="cell__label">{{ label }}</span>
    <strong class="cell__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.cell {
  padding: 10px 12px;
  background: #fcfcf7;
}

.cell + .cell {
  border-left: 1px solid #d9dcc8;
}

.cell__label {
  display: block;
  margin-bottom: 4px;
  color: #8a916d;
  font-size: 10px;
  text-transform: uppercase;
}

.cell__value {
  display: block;
  color: #3f452e;
  font-size: 17px;
}
</style>
