<script setup lang="ts">
const props = withDefaults(defineProps<{ label: string; value: string; tone?: 'mint' | 'violet' | 'gold' }>(), { tone: 'mint' });
const toneClass = computed(() => `halo-card--${props.tone}`);
</script>

<template>
  <div class="halo-card" :class="toneClass">
    <span class="halo-card__label">{{ label }}</span>
    <strong class="halo-card__value">{{ value }}</strong>
  </div>
</template>

<style scoped lang="scss">
.halo-card {
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(10px);
}
.halo-card__label {
  display: block;
  margin-bottom: 8px;
  color: #8ba0c0;
  font-size: 12px;
}
.halo-card__value {
  display: block;
  color: #2f486b;
  font-size: 26px;
}
.halo-card--mint {
  box-shadow: 0 16px 34px rgba(125, 255, 219, 0.22);
}
.halo-card--violet {
  box-shadow: 0 16px 34px rgba(177, 121, 255, 0.18);
}
.halo-card--gold {
  box-shadow: 0 16px 34px rgba(255, 214, 112, 0.2);
}
</style>
