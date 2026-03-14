<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="pill">
    <span class="pill__label">{{ label }}</span>
    <strong class="pill__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid #d5e2f6;
  border-radius: 999px;
  background: #fff;
}

.pill__label {
  color: #7f97b7;
  font-size: 10px;
  text-transform: uppercase;
}

.pill__value {
  color: #27415f;
  font-size: 12px;
}
</style>
