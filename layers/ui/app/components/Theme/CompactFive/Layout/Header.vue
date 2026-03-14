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
        <span class="header__eyebrow">Compact Five</span>
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
  border: 1px solid #252c38;
  border-radius: 14px;
  background: #181e27;
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
  border: 1px solid #252c38;
  border-radius: 10px;
  background: #181e27;
  color: #8bb2ff;
  cursor: pointer;
  @media (min-width: 1024px) {
    display: none;
  }
}
.header__eyebrow {
  display: block;
  color: #7d8aa1;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}
.header__title {
  margin: 0;
  color: #eef3ff;
  font-size: 18px;
  line-height: 1.1;
}
.header__user {
  color: #9aa8c0;
  font-size: 12px;
  white-space: nowrap;
}
</style>
