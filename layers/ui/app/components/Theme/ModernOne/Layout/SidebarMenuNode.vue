<script setup lang="ts">
const props = withDefaults(defineProps<{
  menu: IMenu;
  level?: number;
}>(), {
  level: 0,
});

const route = useRoute();

function handleNavigate(path?: string) {
  if (!path) {
    return;
  }

  navigateTo(path, { replace: true });
}

function isActive(path?: string) {
  if (!path) {
    return false;
  }

  return route.path === path;
}

function getChildren(menu: IMenu) {
  return (menu as IMenu & { children?: IMenu[] }).children ?? menu.child ?? [];
}

function hasChildren(menu: IMenu) {
  return getChildren(menu).length > 0;
}

function isRouteInMenu(menu: IMenu): boolean {
  if (menu.path && isActive(menu.path)) {
    return true;
  }

  const children = getChildren(menu);
  if (!children.length) {
    return false;
  }

  return children.some(child => isRouteInMenu(child));
}

function indentForLevel(level: number) {
  return 50 + (level - 1) * 20;
}

const isExpanded = ref(false);
const isCurrent = computed(() => isRouteInMenu(props.menu));
const currentIndent = computed(() => indentForLevel(props.level));
const childIndent = computed(() => indentForLevel(props.level + 1));
const currentIndentStyle = computed(() => ({
  paddingLeft: `${currentIndent.value}px`,
}));
const childIndentStyle = computed(() => ({
  paddingLeft: `${childIndent.value}px`,
}));

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
}

watch(
  () => route.path,
  () => {
    if (isRouteInMenu(props.menu)) {
      isExpanded.value = true;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="hasChildren(menu)" class="sidebar-submenu">
    <button
      type="button"
      class="sidebar-submenu__title"
      :class="{ 'is-indent': !menu.icon && level === 0, 'is-active': isCurrent }"
      :style="level > 0 ? currentIndentStyle : undefined"
      @click="toggleExpanded"
    >
      <NIcon v-if="menu.icon" :name="menu.icon" class="sidebar-submenu__icon" />
      <span class="sidebar-submenu__label">{{ menu.title }}</span>
      <span class="sidebar-submenu__chevron" :class="{ 'is-open': isExpanded }" aria-hidden="true">
        <svg viewBox="0 0 20 20" class="sidebar-submenu__chevron-icon">
          <path
            d="M6 8l4 4 4-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
    <ul v-show="isExpanded" class="sidebar-submenu__list">
      <li v-for="item in getChildren(menu)" :key="item.path ?? item.title">
        <ThemeModernOneLayoutSidebarMenuNode
          v-if="hasChildren(item) && (item.permissions ? hasPermissions(item.permissions) : true)"
          :menu="item"
          :level="level + 1"
        />
        <button
          v-else-if="!hasChildren(item) && (item.permissions ? hasPermissions(item.permissions) : true)"
          type="button"
          class="sidebar-submenu__item"
          :class="{ 'is-active': isActive(item.path) }"
          :style="childIndentStyle"
          @click="handleNavigate(item.path)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </div>
  <button
    v-else
    type="button"
    class="sidebar-menu__item"
    :class="{ 'is-active': isActive(menu.path) }"
    @click="handleNavigate(menu.path)"
  >
    <span class="sidebar-menu__icon">
      <NIcon :name="menu.icon ?? ''" />
      <span v-if="menu?.useBadge" class="sidebar-menu__badge">1</span>
    </span>
    <span class="sidebar-menu__title">{{ menu.title }}</span>
  </button>
</template>

<style scoped lang="scss">
.sidebar-menu__item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  gap: 12px;
  border: 0;
  background-color: rgb(25, 26, 28);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.sidebar-menu__item:hover {
  background-color: rgb(55, 56, 59);
  color: rgb(217, 186, 97);
}

.sidebar-menu__item:focus-visible {
  outline: 2px solid #c5d4e0;
  outline-offset: -2px;
}

.sidebar-menu__item.is-active {
  background-color: rgb(55, 56, 59);
  color: rgb(217, 186, 97);
}

.sidebar-menu__icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
}

.sidebar-menu__badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background-color: #ff3b30;
  color: #ffffff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}

.sidebar-submenu {
  color: #ffffff;
}

.sidebar-submenu__title {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  background-color: rgb(25, 26, 28);
  border: 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sidebar-submenu__title:hover {
  background-color: rgb(55, 56, 59);
  color: rgb(217, 186, 97);
}

.sidebar-submenu__title:focus-visible {
  outline: 2px solid #c5d4e0;
  outline-offset: -2px;
}

.sidebar-submenu__title.is-active {
  background-color: rgb(55, 56, 59);
  color: rgb(217, 186, 97);
}

.sidebar-submenu__title.is-indent {
  padding-left: 10px;
}

.sidebar-submenu__label {
  flex: 1;
}

.sidebar-submenu__chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: inherit;
  transition: transform 0.2s ease;
}

.sidebar-submenu__chevron.is-open {
  transform: rotate(180deg);
}

.sidebar-submenu__chevron-icon {
  width: 16px;
  height: 16px;
}

.sidebar-submenu__icon {
  margin-right: 12px;
  min-width: 20px;
  min-height: 20px;
}

.sidebar-submenu__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-submenu__item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 0;
  background-color: rgb(25, 26, 28);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.sidebar-submenu__item:hover {
  background-color: rgb(55, 56, 59);
  color: rgb(217, 186, 97);
}

.sidebar-submenu__item:focus-visible {
  outline: 2px solid #c5d4e0;
  outline-offset: -2px;
}

.sidebar-submenu__item.is-active {
  background-color: rgb(55, 56, 59);
  color: rgb(217, 186, 97);
}
</style>
