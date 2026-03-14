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
  padding: 16px;
  border: 1px solid #e6d6c9;
  border-radius: 18px;
  background: #fffaf4;
}

.stat__label {
  display: block;
  margin-bottom: 6px;
  color: #a17e65;
  font-size: 12px;
  text-transform: uppercase;
}

.stat__value {
  display: block;
  color: #5b3e2a;
  font-size: 24px;
}
</style>
