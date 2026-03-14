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
      <span class="header__eyebrow">Outline One</span>
      <h1 class="header__title">
        {{ title || 'Dashboard' }}
      </h1>
    </div>
    <span class="header__chip">Outlined shell</span>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: 2px solid #1d1d1d;
  border-radius: 18px;
  background: #fff;
}

.header__toggle {
  width: 38px;
  height: 38px;
  border: 2px solid #1d1d1d;
  border-radius: 12px;
  background: #fff;
  color: #1d1d1d;
  cursor: pointer;

  @media (min-width: 1080px) {
    display: none;
  }
}

.header__eyebrow {
  display: block;
  color: #6d6d6d;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #1d1d1d;
  font-size: 24px;
}

.header__chip {
  padding: 7px 10px;
  border: 2px solid #1d1d1d;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}
</style>
