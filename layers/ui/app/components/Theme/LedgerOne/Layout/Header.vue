<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleDrawer'): void }>();
const { title } = useTitle();
</script>

<template>
  <div class="header">
    <button type="button" class="header__toggle" @click="emit('toggleDrawer')">
      <NIcon name="lucide:menu" size="16px" />
    </button>
    <div>
      <span class="header__eyebrow">Ledger One</span>
      <h1 class="header__title">
        {{ title || 'Dashboard' }}
      </h1>
    </div>
    <span class="header__chip">Dense rows</span>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid #d9dcc8;
  border-radius: 12px;
  background: #fcfcf7;
}

.header__toggle {
  width: 32px;
  height: 32px;
  border: 1px solid #d9dcc8;
  border-radius: 10px;
  background: #fcfcf7;
  color: #5d6640;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.header__eyebrow {
  display: block;
  color: #8a916d;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #3f452e;
  font-size: 18px;
}

.header__chip {
  padding: 6px 10px;
  border: 1px solid #d9dcc8;
  border-radius: 999px;
  color: #5d6640;
  font-size: 11px;
  font-weight: 700;
}
</style>
