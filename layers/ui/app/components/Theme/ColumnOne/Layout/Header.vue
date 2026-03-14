<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleSidebar'): void }>();
const { title } = useTitle();
const { user } = useAuthStore();
</script>

<template>
  <div class="header">
    <div class="header__left">
      <button type="button" class="header__toggle" @click="emit('toggleSidebar')">
        <NIcon name="lucide:menu" size="18px" />
      </button>
      <div>
        <span class="header__eyebrow">Column One</span>
        <h1 class="header__title">
          {{ title || 'Dashboard' }}
        </h1>
      </div>
    </div>

    <div class="header__meta">
      <span class="header__chip">Wide sidebar</span>
      <span class="header__user">{{ user?.username || user?.email || 'Admin' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #e1d5c8;
  border-radius: 18px;
  background: #fffaf3;
}

.header__left,
.header__meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__toggle {
  width: 38px;
  height: 38px;
  border: 1px solid #e1d5c8;
  border-radius: 12px;
  background: #fffaf3;
  color: #6a4e38;
  cursor: pointer;

  @media (min-width: 1100px) {
    display: none;
  }
}

.header__eyebrow {
  display: block;
  color: #9d7f66;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #4f3a29;
  font-size: 24px;
}

.header__chip {
  padding: 7px 10px;
  border-radius: 999px;
  background: #f0e3d4;
  color: #6a4e38;
  font-size: 12px;
  font-weight: 700;
}

.header__user {
  color: #7b6351;
  font-size: 13px;
}
</style>
