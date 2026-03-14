<script setup lang="ts">
const { title } = useTitle();
const { user } = useAuthStore();
</script>

<template>
  <div class="hero">
    <div class="hero__copy">
      <span class="hero__eyebrow">Banner One</span>
      <h1 class="hero__title">
        {{ title || 'Dashboard' }}
      </h1>
      <p class="hero__text">
        Layout ini memakai header banner penuh dan navigasi horizontal.
      </p>
    </div>

    <div class="hero__meta">
      <span class="hero__user">{{ user?.username || user?.email || 'Admin' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
  border: 1px solid #e6d6c9;
  border-radius: 22px;
  background: #fffaf4;
}

.hero__eyebrow {
  display: block;
  margin-bottom: 6px;
  color: #b38663;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.hero__title {
  margin: 0 0 6px;
  color: #5b3e2a;
  font-size: 30px;
}

.hero__text {
  margin: 0;
  color: #8e735f;
  font-size: 14px;
}

.hero__user {
  color: #6c4f3a;
  font-size: 13px;
  font-weight: 700;
}
</style>
