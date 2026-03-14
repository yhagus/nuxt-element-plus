<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleSidebar'): void }>();
const { title } = useTitle();
</script>

<template>
  <div class="header">
    <button type="button" class="header__toggle" @click="emit('toggleSidebar')">
      <NIcon name="lucide:menu" size="16px" />
    </button>
    <div class="header__copy">
      <span class="header__eyebrow">Split One</span>
      <h1 class="header__title">
        {{ title || 'Dashboard' }}
      </h1>
    </div>
    <div class="header__chip">
      Utility split
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid #dce2e5;
  border-radius: 12px;
  background: #fff;
}

.header__toggle {
  width: 32px;
  height: 32px;
  border: 1px solid #dce2e5;
  border-radius: 10px;
  background: #fff;
  color: #37515b;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.header__eyebrow {
  display: block;
  color: #7b9299;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #23373d;
  font-size: 17px;
}

.header__chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: #eef3f5;
  color: #37515b;
  font-size: 11px;
  font-weight: 700;
}
</style>
