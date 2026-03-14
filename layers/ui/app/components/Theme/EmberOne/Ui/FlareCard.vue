<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="flare-card">
    <span class="flare-card__label">{{ label }}</span>
    <strong class="flare-card__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.flare-card {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(255, 157, 106, 0.16), rgba(255, 107, 107, 0.12));
}
.flare-card__label {
  display: block;
  margin-bottom: 8px;
  color: #a27d6b;
  font-size: 12px;
}
.flare-card__value {
  display: block;
  color: #5c3426;
  font-size: 26px;
}
</style>
