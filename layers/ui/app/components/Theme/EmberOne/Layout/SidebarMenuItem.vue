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
  color: #a27d6b;
  text-decoration: none;
  &:hover {
    background: rgba(255, 157, 106, 0.12);
    color: #5c3426;
  }
}
.item--active {
  background: linear-gradient(90deg, rgba(255, 157, 106, 0.18), rgba(255, 107, 107, 0.16));
  color: #5c3426;
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
