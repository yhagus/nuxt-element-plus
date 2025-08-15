#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import process from 'node:process';

// Parse command line arguments
const args = process.argv.slice(2);

// Helper function to convert path to camelCase key
function pathToCamelCase(str) {
  // Convert "User/SelectUser" to "userSelectUser"
  return str
    .split('/')
    .map((part, index) => {
      // First part lowercase, subsequent parts PascalCase
      if (index === 0) {
        return part.toLowerCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
}

// Helper function to get component name from path
function getComponentName(path) {
  // Extract "SelectUser" from "User/SelectUser"
  const parts = path.split('/');
  return parts[parts.length - 1];
}

// Helper function to convert API handler to camelCase
function apiToCamelCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

if (args.length < 2) {
  console.error('Usage: node create-select.mjs <path> <apiHandler>');
  console.error('Example: node create-select.mjs User/SelectUser user');
  console.error('         node create-select.mjs Product/SelectProduct product');
  process.exit(1);
}

// Extract path and API handler
const [componentPath, apiHandler] = args;

// Generate names
const componentName = getComponentName(componentPath);
const camelCaseKey = pathToCamelCase(componentPath);
const apiCamelCase = apiToCamelCase(apiHandler);

// Generate Vue component template
function generateSelectComponent(path, apiHandler, camelKey) {
  return `<script setup lang="ts">
const props = defineProps<{
  modelValue?: any;
}>();

defineEmits(['update:modelValue']);

const { data, status, refresh } = await useAsyncData(
  '${camelKey}',
  () => api.${apiHandler}.getFindAll(),
  {
    lazy: true,
    immediate: !!props.modelValue,
  },
);

const options = computed(() => {
  return data.value?.data?.map(item => ({
    value: item.id,
    label: item.name,
  })) ?? [];
});
</script>

<template>
  <UiSelect
    :model-value="props.modelValue"
    :options="options"
    :loading="status === 'pending'"
    @on-open="refresh"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
`;
}

// Generate the component
const vueComponent = generateSelectComponent(componentPath, apiCamelCase, camelCaseKey);

// Create directory structure
const outputDir = join(process.cwd(), 'app', 'components', dirname(componentPath));
const outputPath = join(process.cwd(), 'app', 'components', `${componentPath}.vue`);

// Ensure directory exists
mkdirSync(outputDir, { recursive: true });

// Write to file
writeFileSync(outputPath, vueComponent, 'utf8');

console.log(`✅ Select component generated successfully!`);
console.log(`📁 File: ${outputPath}`);
console.log(`🏷️ Component: ${componentName}`);
console.log(`🔑 Key: ${camelCaseKey}`);
console.log(`🔗 API Handler: api.${apiCamelCase}.getFindAll()`);
console.log(`📝 Usage: <${componentPath.replace('/', '')} v-model="selectedValue" />`);
