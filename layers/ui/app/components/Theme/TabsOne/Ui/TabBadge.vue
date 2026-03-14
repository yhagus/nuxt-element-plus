<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="badge">
    <span class="badge__label">{{ label }}</span>
    <strong class="badge__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid #dedff7;
  border-radius: 999px;
  background: #fff;
}

.badge__label {
  color: #8b8fc7;
  font-size: 10px;
  text-transform: uppercase;
}

.badge__value {
  color: #353a7a;
  font-size: 12px;
}
</style>
