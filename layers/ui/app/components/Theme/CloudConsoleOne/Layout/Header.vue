<script setup lang="ts">
interface Emits {
  (e: 'toggle-sidebar'): void;
}

defineEmits<Emits>();
</script>

<template>
  <header class="theme-header">
    <div class="theme-header__left">
      <UiButton type="button" size="small" variant="secondary" @click="$emit('toggle-sidebar')">
        <NIcon name="lucide:panel-left" />
      </UiButton>
      <div>
        <p class="theme-header__title">Cloud Console</p>
        <p class="theme-header__subtitle">Konsol resource cloud dengan navigasi proyek dan panel detail.</p>
      </div>
    </div>

    <div class="theme-header__right">
      <UiButton type="button" variant="text" size="small">
        <NIcon name="lucide:bell" />
      </UiButton>
      <UiButton type="button" variant="text" size="small">
        <NIcon name="lucide:user-round" />
      </UiButton>
    </div>
  </header>
</template>

<style scoped lang="scss">
.theme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid #d8e3f3;
  background: #ffffff;
  color: #17304d;
}

.theme-header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-header__right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.theme-header__title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
}

.theme-header__subtitle {
  margin: 2px 0 0;
  font-size: 11px;
  color: #5e7390;
}
</style>
