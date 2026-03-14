<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  value: string;
  trend?: string;
  tone?: 'mint' | 'sky' | 'sun';
}>(), {
  trend: undefined,
  tone: 'mint',
});

const toneClass = computed(() => `metric-card--${props.tone}`);
</script>

<template>
  <div class="metric-card" :class="toneClass">
    <span class="metric-card__label">{{ label }}</span>
    <strong class="metric-card__value">{{ value }}</strong>
    <span v-if="trend" class="metric-card__trend">{{ trend }}</span>
  </div>
</template>

<style scoped lang="scss">
.metric-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 120px;
  padding: 18px;
  border-radius: 24px;
  background: rgba(255, 252, 246, 0.88);
  box-shadow:
    inset 0 0 0 1px rgba(113, 155, 145, 0.16),
    0 18px 40px rgba(68, 94, 88, 0.08);
}

.metric-card__label {
  color: #55716a;
  font-size: 13px;
}

.metric-card__value {
  color: #173732;
  font-size: 28px;
  line-height: 1;
}

.metric-card__trend {
  margin-top: auto;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.metric-card--mint .metric-card__trend {
  background: rgba(90, 179, 154, 0.14);
  color: #1f6a5d;
}

.metric-card--sky .metric-card__trend {
  background: rgba(111, 154, 230, 0.16);
  color: #3d62a8;
}

.metric-card--sun .metric-card__trend {
  background: rgba(243, 185, 76, 0.18);
  color: #926214;
}
</style>
