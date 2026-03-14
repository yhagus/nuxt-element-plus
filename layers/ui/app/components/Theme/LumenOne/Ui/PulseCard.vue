<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  value: string;
  detail?: string;
  tone?: 'blue' | 'mint' | 'peach';
}>(), {
  detail: undefined,
  tone: 'blue',
});

const toneClass = computed(() => `pulse-card--${props.tone}`);
</script>

<template>
  <div class="pulse-card" :class="toneClass">
    <span class="pulse-card__label">{{ label }}</span>
    <strong class="pulse-card__value">{{ value }}</strong>
    <p v-if="detail" class="pulse-card__detail">
      {{ detail }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.pulse-card {
  padding: 16px;
  border: 1px solid #dbe7f6;
  border-radius: 18px;
  background: #fff;
}

.pulse-card__label {
  display: block;
  margin-bottom: 8px;
  color: #8aa0bc;
  font-size: 12px;
}

.pulse-card__value {
  display: block;
  color: #2c4367;
  font-size: 26px;
}

.pulse-card__detail {
  margin: 8px 0 0;
  color: #7f97b5;
  font-size: 12px;
}

.pulse-card--blue {
  box-shadow: inset 4px 0 0 #79a8ff;
}

.pulse-card--mint {
  box-shadow: inset 4px 0 0 #68d7bc;
}

.pulse-card--peach {
  box-shadow: inset 4px 0 0 #ffb490;
}
</style>
