<script setup lang="ts">
interface DropdownProps {
  trigger?: 'click' | 'contextmenu' | 'focus' | 'hover';
  dropdownItems?: DropdownItem[];
  value?: string;
}
defineProps<DropdownProps>();
</script>

<template>
  <el-dropdown :trigger="trigger">
    <slot />
    <template v-if="$slots.dropdown" #dropdown>
      <slot name="dropdown" />
    </template>
    <template v-else #dropdown>
      <el-dropdown-menu>
        <template v-for="(item) in dropdownItems" :key="item.command">
          <slot v-if="$slots[`${item.command}-command`]" :name="`${item.command}-command`" :value="value" :label="item.label" :icon="item.icon" />
          <el-dropdown-item v-else :disabled="item.disabled" :command="item.command" @click="item.onClick?.(value)">
            <template v-if="$slots[`${item.command}-label`]">
              <slot :name="`${item.command}-label`" :value="value" :label="item.label" :icon="item.icon" />
            </template>
            <template v-else>
              <Icon v-if="item.icon" :name="item.icon" class="mr-1.5" size="16px" />
              {{ item.label }}
            </template>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="postcss">

</style>
