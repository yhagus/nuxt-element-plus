<script setup lang="ts">
const { title } = useTitle();
</script>

<template>
  <div class="header">
    <span class="header__eyebrow">Tile One</span>
    <h1 class="header__title">
      {{ title || 'Dashboard' }}
    </h1>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding: 12px 14px;
  border: 1px solid #d9dfd5;
  border-radius: 16px;
  background: #fff;
}

.header__eyebrow {
  display: block;
  margin-bottom: 4px;
  color: #7d8c75;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.header__title {
  margin: 0;
  color: #33402e;
  font-size: 22px;
}
</style>
