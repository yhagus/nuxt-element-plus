<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string;
  value: string;
  subtitle?: string;
  accent?: 'emerald' | 'amber';
}>(), {
  subtitle: undefined,
  accent: 'emerald',
});

const accentClass = computed(() => `insight-card--${props.accent}`);
</script>

<template>
  <div class="insight-card" :class="accentClass">
    <span class="insight-card__title">{{ title }}</span>
    <strong class="insight-card__value">{{ value }}</strong>
    <p v-if="subtitle" class="insight-card__subtitle">
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.insight-card {
  padding: 18px;
  border: 1px solid #dce7e1;
  border-radius: 20px;
  background: #fff;
}

.insight-card__title {
  display: block;
  margin-bottom: 8px;
  color: #6f8b85;
  font-size: 13px;
}

.insight-card__value {
  display: block;
  color: #1d352e;
  font-size: 28px;
  line-height: 1.1;
}

.insight-card__subtitle {
  margin: 8px 0 0;
  color: #708c85;
  font-size: 12px;
}

.insight-card--emerald {
  box-shadow: inset 4px 0 0 #2fa277;
}

.insight-card--amber {
  box-shadow: inset 4px 0 0 #d7a53e;
}
</style>
