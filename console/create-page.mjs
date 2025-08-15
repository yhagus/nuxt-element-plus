#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

// ES6 module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: node create-page.mjs <path> <type>');
  console.error('Example: node create-page.mjs configuration/bank IBank');
  process.exit(1);
}

const [pagePath, typeInterface] = args;

// Helper function to convert kebab-case to camelCase
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

// Helper function to convert kebab-case to PascalCase
function toPascalCase(str) {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

// Helper function to convert kebab-case to snake case
function toLowercase(str) {
  return str.toLowerCase().replace(/-/g, '_');
}

// Extract path parts and generate names
const pathParts = pagePath.split('/');
const entityName = pathParts[pathParts.length - 1]; // e.g., 'e-statement'
const camelCaseEntity = toCamelCase(entityName); // e.g., 'eStatement'
const pascalCaseEntity = toPascalCase(entityName); // e.g., 'EStatement'
const lowercaseEntity = toLowercase(entityName); // e.g., 'estatement'
const activeVarName = `active${pascalCaseEntity}`; // e.g., 'activeEStatement'

// Create the file path (relative to project root)
const projectRoot = path.resolve(__dirname);
const filePath = path.join(projectRoot, 'app', 'pages', pagePath, 'index.vue');
const dirPath = path.dirname(filePath);

// Template with replacements
const template = `<template>
  <div />
</template>

<script setup lang="ts">
const route = useRoute()

const { data, status, refresh } = await api.${camelCaseEntity}.findAll({
  query: {
    search: computed(() => route.query.search ?? undefined),
    limit: computed(() => route.query.limit ?? undefined),
    page: computed(() => route.query.page ?? undefined),
  },
})

const columns: TableColumn[] = [
  {
    label: 'No',
    prop: (_, index) => \`\${generateCurrentIndex(index, data.value?.meta?.limit, data.value?.meta?.currentPage)}\`,
    visible: true,
    width: 60,
    align: 'center',
  },
  {
    label: 'Action',
    prop: 'action',
    width: 100,
    align: 'center',
    visible: true,
  },
]

const ${activeVarName} = ref<${typeInterface}>()

async function handleEdit(id: string) {
  ${activeVarName}.value = undefined
  await api.${camelCaseEntity}.show(id).then((response) => {
    ${activeVarName}.value = response
  })
}
async function handleStore(form: UseForm) {
  await api.${camelCaseEntity}.create(form)
}
async function handleUpdate(form: UseForm, id: string) {
  await api.${camelCaseEntity}.update(form, id)
}
async function handleDelete(id: string) {
  await api.${camelCaseEntity}.destroy(id)
}

useHead({
  title: '${pascalCaseEntity}',
})
</script>
`;

// Create directory if it doesn't exist
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`✅ Created directory: ${dirPath}`);
}

// Write the file
fs.writeFileSync(filePath, template);
console.log(`✅ Created page: ${filePath}`);
console.log(`📄 Entity: ${entityName}`);
console.log(`🐪 CamelCase: ${camelCaseEntity}`);
console.log(`📝 PascalCase: ${pascalCaseEntity}`);
console.log(`🔤 Lowercase: ${lowercaseEntity}`);
console.log(`🔧 Type: ${typeInterface}`);
console.log(`📝 Active variable: ${activeVarName}`);
console.log(`🚀 Ready to use!`);
