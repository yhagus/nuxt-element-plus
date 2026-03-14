<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleDrawer'): void }>();
const { title } = useTitle();
</script>

<template>
  <div class="header">
    <button type="button" class="header__toggle" @click="emit('toggleDrawer')">
      <NIcon name="lucide:menu" size="18px" />
    </button>
    <div>
      <span class="header__eyebrow">Stack One</span>
      <h1 class="header__title">
        {{ title || 'Dashboard' }}
      </h1>
    </div>
    <span class="header__chip">Layered shell</span>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 18px;
  background: #fff;
  box-shadow:
    0 0 0 1px rgba(111, 92, 135, 0.12),
    0 10px 24px rgba(111, 92, 135, 0.08);
}

.header__toggle {
  width: 38px;
  height: 38px;
  border: 1px solid #e1d9ea;
  border-radius: 12px;
  background: #fff;
  color: #5d4d76;
  cursor: pointer;

  @media (min-width: 1080px) {
    display: none;
  }
}

.header__eyebrow {
  display: block;
  color: #8d7ea5;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #382d48;
  font-size: 24px;
}

.header__chip {
  padding: 7px 10px;
  border-radius: 999px;
  background: #f1ebf7;
  color: #5d4d76;
  font-size: 12px;
  font-weight: 700;
}
</style>
