<script setup lang="ts">
defineProps<{ label: string; value: string }>();
</script>

<template>
  <div class="chip">
    <span class="chip__label">{{ label }}</span>
    <strong class="chip__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.chip {
  padding: 10px;
  border: 1px solid #dce2e5;
  border-radius: 12px;
  background: #fff;
}

.chip__label {
  display: block;
  margin-bottom: 4px;
  color: #7b9299;
  font-size: 10px;
  text-transform: uppercase;
}

.chip__value {
  display: block;
  color: #23373d;
  font-size: 17px;
}
</style>
