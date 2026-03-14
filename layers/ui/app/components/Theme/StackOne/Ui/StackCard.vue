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
  padding: 16px;
  border-radius: 18px;
  background: #fff;
  box-shadow:
    0 0 0 1px rgba(111, 92, 135, 0.12),
    0 10px 20px rgba(111, 92, 135, 0.08);
}

.card__label {
  display: block;
  margin-bottom: 6px;
  color: #8d7ea5;
  font-size: 12px;
  text-transform: uppercase;
}

.card__value {
  display: block;
  color: #382d48;
  font-size: 22px;
}
</style>
