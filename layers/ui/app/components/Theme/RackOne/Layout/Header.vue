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
      <span class="header__eyebrow">Rack One</span>
      <h1 class="header__title">
        {{ title || 'Dashboard' }}
      </h1>
    </div>
    <span class="header__chip">Inset shell</span>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 14px;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(116, 91, 68, 0.12);
}

.header__toggle {
  width: 32px;
  height: 32px;
  border: 1px solid #e4d8ca;
  border-radius: 10px;
  background: #fff;
  color: #6a4b33;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.header__eyebrow {
  display: block;
  color: #a1836d;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #503a29;
  font-size: 17px;
}

.header__chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: #f5ede4;
  color: #6a4b33;
  font-size: 11px;
  font-weight: 700;
}
</style>
