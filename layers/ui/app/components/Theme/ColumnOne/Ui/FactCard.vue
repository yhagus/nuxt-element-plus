<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="card">
    <span class="card__label">{{ label }}</span>
    <strong class="card__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: 14px;
  border: 1px solid #e1d5c8;
  border-radius: 16px;
  background: #fffaf3;
}

.card__label {
  display: block;
  margin-bottom: 6px;
  color: #9d7f66;
  font-size: 12px;
  text-transform: uppercase;
}

.card__value {
  display: block;
  color: #4f3a29;
  font-size: 24px;
}
</style>
