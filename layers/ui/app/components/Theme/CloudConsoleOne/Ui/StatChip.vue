<script setup lang="ts">
interface Props {
  label: string;
  value: string;
  tone?: 'success' | 'warning' | 'danger';
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'success',
});
</script>

<template>
  <div class="stat-chip" :class="`stat-chip--${props.tone}`">
    <p class="stat-chip__label">{{ props.label }}</p>
    <p class="stat-chip__value">{{ props.value }}</p>
  </div>
</template>

<style scoped lang="scss">
.stat-chip {
  border: 1px solid #d8e3f3;
  background: #ffffff;
  color: #17304d;
  border-radius: 12px;
  padding: 10px 12px;
}

.stat-chip__label {
  margin: 0;
  color: #5e7390;
  font-size: 11px;
}

.stat-chip__value {
  margin: 4px 0 0;
  font-size: 20px;
  font-weight: 700;
}

.stat-chip--success {
  box-shadow: inset 3px 0 0 #2b73d9;
}

.stat-chip--warning {
  box-shadow: inset 3px 0 0 #f59e0b;
}

.stat-chip--danger {
  box-shadow: inset 3px 0 0 #ef4444;
}
</style>
