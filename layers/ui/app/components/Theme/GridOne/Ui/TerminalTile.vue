<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  value: string;
  state?: 'normal' | 'warning' | 'danger';
}>(), {
  state: 'normal',
});

const stateClass = computed(() => `terminal-tile--${props.state}`);
</script>

<template>
  <div class="terminal-tile" :class="stateClass">
    <span class="terminal-tile__label">{{ label }}</span>
    <strong class="terminal-tile__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.terminal-tile {
  padding: 16px;
  border: 1px solid rgba(43, 255, 146, 0.12);
  background: rgba(8, 17, 14, 0.92);
}

.terminal-tile__label {
  display: block;
  margin-bottom: 8px;
  color: #7bcba0;
  font-size: 12px;
  text-transform: uppercase;
}

.terminal-tile__value {
  display: block;
  font-size: 26px;
}

.terminal-tile--normal .terminal-tile__value {
  color: #71ffba;
}

.terminal-tile--warning .terminal-tile__value {
  color: #ffd36e;
}

.terminal-tile--danger .terminal-tile__value {
  color: #ff8f8f;
}
</style>
