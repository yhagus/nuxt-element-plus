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
  border: 1px solid #d9dfd5;
  border-radius: 16px;
  background: #fff;
}

.stat__label {
  display: block;
  margin-bottom: 6px;
  color: #7d8c75;
  font-size: 11px;
  text-transform: uppercase;
}

.stat__value {
  display: block;
  color: #33402e;
  font-size: 20px;
}
</style>
