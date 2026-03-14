<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="stat">
    <span class="stat__label">{{ label }}</span>
    <strong class="stat__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.stat {
  padding: 14px;
  border: 2px solid #1d1d1d;
  border-radius: 16px;
  background: #fff;
}

.stat__label {
  display: block;
  margin-bottom: 6px;
  color: #6d6d6d;
  font-size: 12px;
  text-transform: uppercase;
}

.stat__value {
  display: block;
  color: #1d1d1d;
  font-size: 24px;
}
</style>
