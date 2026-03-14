<script setup lang="ts">
interface SidebarMenuItem { title: string; path: string; icon: string }
const props = defineProps<{ item: SidebarMenuItem }>();
const route = useRoute();
const isActive = computed(() => props.item.path === '/' ? route.path === '/' : route.path === props.item.path || route.path.startsWith(`${props.item.path}/`));
</script>

<template>
  <NuxtLink :to="item.path" class="item" :class="{ 'item--active': isActive }">
    <span class="item__icon"><NIcon :name="item.icon" size="18px" /></span>
    <span class="item__label">{{ item.title }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 0 14px;
  border-radius: 14px;
  color: #7e8d9f;
  text-decoration: none;
  &:hover {
    background: #edf2f7;
    color: #2d3a4a;
  }
}
.item--active {
  background: #405266;
  color: #fff;
}
.item__icon {
  display: inline-flex;
  width: 22px;
  justify-content: center;
}
.item__label {
  font-size: 14px;
  font-weight: 600;
}
</style>
