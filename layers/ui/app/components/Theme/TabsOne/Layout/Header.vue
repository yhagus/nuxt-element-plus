<script setup lang="ts">
const { title } = useTitle();
const { user } = useAuthStore();
</script>

<template>
  <div class="header">
    <div>
      <span class="header__eyebrow">Tabs One</span>
      <h1 class="header__title">
        {{ title || 'Dashboard' }}
      </h1>
    </div>
    <span class="header__user">{{ user?.username || user?.email || 'Admin' }}</span>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid #dedff7;
  border-radius: 14px;
  background: #fff;
}

.header__eyebrow {
  display: block;
  color: #8b8fc7;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #353a7a;
  font-size: 18px;
}

.header__user {
  color: #7075aa;
  font-size: 12px;
}
</style>
