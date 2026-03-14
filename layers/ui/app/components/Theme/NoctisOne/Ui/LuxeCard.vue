<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  value: string;
  footnote?: string;
  tone?: 'gold' | 'plum';
}>(), {
  footnote: undefined,
  tone: 'gold',
});

const toneClass = computed(() => `luxe-card--${props.tone}`);
</script>

<template>
  <div class="luxe-card" :class="toneClass">
    <span class="luxe-card__label">{{ label }}</span>
    <strong class="luxe-card__value">{{ value }}</strong>
    <p v-if="footnote" class="luxe-card__footnote">
      {{ footnote }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.luxe-card {
  padding: 18px;
  border: 1px solid rgba(214, 171, 84, 0.12);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
}

.luxe-card__label {
  display: block;
  margin-bottom: 8px;
  color: #c8b285;
  font-size: 12px;
  text-transform: uppercase;
}

.luxe-card__value {
  display: block;
  color: #faf3e6;
  font-size: 28px;
}

.luxe-card__footnote {
  margin: 8px 0 0;
  color: #a9a0c0;
  font-size: 12px;
}

.luxe-card--gold {
  box-shadow: inset 4px 0 0 #d6ab54;
}

.luxe-card--plum {
  box-shadow: inset 4px 0 0 #8f66c7;
}
</style>
