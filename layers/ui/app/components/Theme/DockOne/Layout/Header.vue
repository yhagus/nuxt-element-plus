<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleRail'): void }>();
const { title } = useTitle();
const { user } = useAuthStore();
</script>

<template>
  <div class="header">
    <div class="header__left">
      <button type="button" class="header__toggle" @click="emit('toggleRail')">
        <NIcon name="lucide:panel-left-open" size="16px" />
      </button>
      <div>
        <span class="header__eyebrow">Dock</span>
        <h1 class="header__title">
          {{ title || 'Dashboard' }}
        </h1>
      </div>
    </div>
    <div class="header__dock">
      <span class="header__chip">Compact rail</span>
      <span class="header__user">{{ user?.username || user?.email || 'Admin' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid #d5e2f6;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 24px rgba(61, 108, 201, 0.08);
}

.header__left,
.header__dock {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__toggle {
  width: 32px;
  height: 32px;
  border: 1px solid #d5e2f6;
  border-radius: 999px;
  background: #fff;
  color: #3d6cc9;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
}

.header__eyebrow {
  display: block;
  color: #7f97b7;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #27415f;
  font-size: 17px;
}

.header__chip {
  padding: 6px 10px;
  border-radius: 999px;
  background: #edf4ff;
  color: #3d6cc9;
  font-size: 11px;
  font-weight: 700;
}

.header__user {
  color: #5a7392;
  font-size: 12px;
}
</style>
