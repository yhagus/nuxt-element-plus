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
  border: 1px solid #d8dce9;
  border-radius: 18px;
  background: #fff;
}

.stat__label {
  display: block;
  margin-bottom: 6px;
  color: #7c87a2;
  font-size: 12px;
  text-transform: uppercase;
}

.stat__value {
  display: block;
  color: #28344f;
  font-size: 22px;
}
</style>
