<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleSidebar'): void }>();
const { title } = useTitle();
</script>

<template>
  <div class="header">
    <button type="button" class="header__toggle" @click="emit('toggleSidebar')">
      <NIcon name="lucide:menu" size="16px" />
    </button>
    <div>
      <span class="header__eyebrow">Inset One</span>
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
  box-shadow: inset 0 0 0 1px rgba(122, 100, 72, 0.12);
}

.header__toggle {
  width: 32px;
  height: 32px;
  border: 1px solid #e6dbcd;
  border-radius: 10px;
  background: #fff;
  color: #6d5236;
  cursor: pointer;

  @media (min-width: 1100px) {
    display: none;
  }
}

.header__eyebrow {
  display: block;
  color: #a58a70;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #513b27;
  font-size: 17px;
}

.header__chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: #f7efe6;
  color: #6d5236;
  font-size: 11px;
  font-weight: 700;
}
</style>
