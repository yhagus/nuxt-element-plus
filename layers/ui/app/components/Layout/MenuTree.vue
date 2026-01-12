<script setup lang="ts">
interface ClassicMenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  badge?: string;
  badgeType?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  children?: ClassicMenuItem[];
}

interface MenuTreeProps {
  items: ClassicMenuItem[];
  depth?: number;
  openItems: string[];
  collapsed: boolean;
  isDesktop: boolean;
  isItemActive: (item: ClassicMenuItem) => boolean;
  hasActiveChild: (item: ClassicMenuItem) => boolean;
  isItemOpen: (item: ClassicMenuItem) => boolean;
  onToggle: (item: ClassicMenuItem) => void;
}

defineOptions({ name: 'MenuTree' });

const props = withDefaults(defineProps<MenuTreeProps>(), {
  depth: 0,
});

function itemClasses(item: ClassicMenuItem) {
  return [
    'menu-item',
    props.isItemActive(item) && 'is-active',
    props.hasActiveChild(item) && 'is-current',
    props.isItemOpen(item) && 'is-open',
  ].filter(Boolean);
}

function linkProps(item: ClassicMenuItem) {
  return item.route && !item.children?.length
    ? { isLink: true, to: item.route }
    : { isLink: false, to: undefined };
}
</script>

<template>
  <ul :class="['menu-level', `menu-level--${props.depth}`]">
    <li
      v-for="item in props.items"
      :key="item.id"
      :class="itemClasses(item)"
      :style="{ '--menu-indent': `${props.depth * 0.75}rem` }"
    >
      <UiTooltip
        v-if="props.collapsed && props.isDesktop"
        :content="item.label"
        placement="right"
        :show-after="500"
      >
        <template #default>
          <NuxtLink
            v-if="linkProps(item).isLink"
            :to="linkProps(item).to"
            class="menu-link"
          >
            <NIcon v-if="item.icon" :name="item.icon" class="menu-icon" />
            <span v-else class="menu-bullet" />
            <span class="menu-label">{{ item.label }}</span>
            <span v-if="item.badge" :class="['menu-badge', `menu-badge--${item.badgeType ?? 'info'}`]">
              {{ item.badge }}
            </span>
            <span v-if="item.children?.length" class="menu-caret" />
          </NuxtLink>
          <button v-else type="button" class="menu-link" @click="props.onToggle(item)">
            <NIcon v-if="item.icon" :name="item.icon" class="menu-icon" />
            <span v-else class="menu-bullet" />
            <span class="menu-label">{{ item.label }}</span>
            <span v-if="item.badge" :class="['menu-badge', `menu-badge--${item.badgeType ?? 'info'}`]">
              {{ item.badge }}
            </span>
            <span v-if="item.children?.length" class="menu-caret" />
          </button>
        </template>
      </UiTooltip>

      <NuxtLink
        v-else-if="linkProps(item).isLink"
        :to="linkProps(item).to"
        class="menu-link"
      >
        <NIcon v-if="item.icon" :name="item.icon" class="menu-icon" />
        <span v-else class="menu-bullet" />
        <span class="menu-label">{{ item.label }}</span>
        <span v-if="item.badge" :class="['menu-badge', `menu-badge--${item.badgeType ?? 'info'}`]">
          {{ item.badge }}
        </span>
        <span v-if="item.children?.length" class="menu-caret" />
      </NuxtLink>

      <button v-else type="button" class="menu-link" @click="props.onToggle(item)">
        <NIcon v-if="item.icon" :name="item.icon" class="menu-icon" />
        <span v-else class="menu-bullet" />
        <span class="menu-label">{{ item.label }}</span>
        <span v-if="item.badge" :class="['menu-badge', `menu-badge--${item.badgeType ?? 'info'}`]">
          {{ item.badge }}
        </span>
        <span v-if="item.children?.length" class="menu-caret" />
      </button>

      <div v-if="item.children?.length" class="submenu">
        <MenuTree
          :items="item.children"
          :depth="props.depth + 1"
          :open-items="props.openItems"
          :collapsed="props.collapsed"
          :is-desktop="props.isDesktop"
          :is-item-active="props.isItemActive"
          :has-active-child="props.hasActiveChild"
          :is-item-open="props.isItemOpen"
          :on-toggle="props.onToggle"
        />
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
</style>
