<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleSidebar'): void }>();
const { title } = useTitle();
const { user } = useAuthStore();
</script>

<template>
  <div class="header">
    <div class="header__left">
      <button type="button" class="header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="16px" />
      </button>
      <div>
        <span class="header__eyebrow">Compact Four</span>
        <h1 class="header__title">
          {{ title || 'Dashboard' }}
        </h1>
      </div>
    </div>
    <div class="header__user">
      {{ user?.username || user?.email || 'Admin' }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 50px;
  padding: 8px 10px;
  border: 1px solid #dde0f6;
  border-radius: 14px;
  background: #fff;
}
.header__left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.header__toggle {
  width: 32px;
  height: 32px;
  border: 1px solid #dde0f6;
  border-radius: 10px;
  background: #fff;
  color: #4e56a7;
  cursor: pointer;
  @media (min-width: 1024px) {
    display: none;
  }
}
.header__eyebrow {
  display: block;
  color: #8b90c8;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}
.header__title {
  margin: 0;
  color: #313775;
  font-size: 18px;
  line-height: 1.1;
}
.header__user {
  color: #7076a7;
  font-size: 12px;
  white-space: nowrap;
}
</style>
