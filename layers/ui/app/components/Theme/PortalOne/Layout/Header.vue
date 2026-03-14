<script setup lang="ts">
const { title } = useTitle();
const { user } = useAuthStore();
</script>

<template>
  <div class="header">
    <div>
      <span class="header__eyebrow">Portal One</span>
      <h1 class="header__title">
        {{ title || 'Dashboard' }}
      </h1>
    </div>

    <div class="header__right">
      <span class="header__chip">Centered shell</span>
      <span class="header__user">{{ user?.username || user?.email || 'Admin' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid #d8dce9;
  border-radius: 22px;
  background: #fff;
}

.header__eyebrow {
  display: block;
  margin-bottom: 6px;
  color: #7c87a2;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #28344f;
  font-size: 28px;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__chip {
  padding: 8px 12px;
  border-radius: 999px;
  background: #eef1f8;
  color: #4a5877;
  font-size: 12px;
  font-weight: 700;
}

.header__user {
  color: #5f6d8b;
  font-size: 13px;
}
</style>
