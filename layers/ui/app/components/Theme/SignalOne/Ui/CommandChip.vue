<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  value: string;
  tone?: 'neutral' | 'success' | 'warning';
}>(), {
  tone: 'neutral',
});

const toneClass = computed(() => `command-chip--${props.tone}`);
</script>

<template>
  <div class="command-chip" :class="toneClass">
    <span class="command-chip__label">{{ label }}</span>
    <strong class="command-chip__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.command-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(88, 119, 166, 0.2);
  background: rgba(10, 25, 45, 0.64);
}

.command-chip__label {
  color: #89a4cf;
  font-size: 12px;
  font-weight: 600;
}

.command-chip__value {
  font-size: 13px;
  color: #eff5ff;
}

.command-chip--success .command-chip__value {
  color: #7de3b5;
}

.command-chip--warning .command-chip__value {
  color: #ffcd7a;
}
</style>
