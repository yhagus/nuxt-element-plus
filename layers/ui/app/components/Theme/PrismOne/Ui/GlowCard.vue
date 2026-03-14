<script setup lang="ts">
const props = withDefaults(defineProps<{ label: string; value: string; tone?: 'pink' | 'cyan' | 'amber' }>(), { tone: 'pink' });
const toneClass = computed(() => `glow-card--${props.tone}`);
</script>

<template>
  <div class="glow-card" :class="toneClass">
    <span class="glow-card__label">{{ label }}</span>
    <strong class="glow-card__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.glow-card {
  padding: 16px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 16px 34px rgba(170, 115, 255, 0.1);
}
.glow-card__label {
  display: block;
  margin-bottom: 8px;
  color: #8f78ac;
  font-size: 12px;
}
.glow-card__value {
  display: block;
  color: #392458;
  font-size: 26px;
}
.glow-card--pink {
  box-shadow: 0 16px 34px rgba(255, 121, 176, 0.18);
}
.glow-card--cyan {
  box-shadow: 0 16px 34px rgba(125, 220, 255, 0.22);
}
.glow-card--amber {
  box-shadow: 0 16px 34px rgba(255, 190, 95, 0.22);
}
</style>
