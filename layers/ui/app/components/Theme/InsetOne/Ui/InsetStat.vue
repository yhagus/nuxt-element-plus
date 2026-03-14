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
  padding: 10px;
  border-radius: 12px;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(122, 100, 72, 0.12);
}

.stat__label {
  display: block;
  margin-bottom: 4px;
  color: #a58a70;
  font-size: 10px;
  text-transform: uppercase;
}

.stat__value {
  display: block;
  color: #513b27;
  font-size: 17px;
}
</style>
