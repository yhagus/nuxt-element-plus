<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  note?: string;
}>();
</script>

<template>
  <div class="stat-tile">
    <span class="stat-tile__label">{{ label }}</span>
    <strong class="stat-tile__value">{{ value }}</strong>
    <p v-if="note" class="stat-tile__note">
      {{ note }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.stat-tile {
  padding: 16px;
  border: 1px solid #d8e0ea;
  border-radius: 18px;
  background: #fff;
}

.stat-tile__label {
  display: block;
  margin-bottom: 8px;
  color: #7d8ea0;
  font-size: 12px;
  text-transform: uppercase;
}

.stat-tile__value {
  display: block;
  color: #1f3347;
  font-size: 26px;
}

.stat-tile__note {
  margin: 8px 0 0;
  color: #6b7c8f;
  font-size: 12px;
}
</style>
