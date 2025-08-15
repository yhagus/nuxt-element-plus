#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

// Parse command line arguments
const args = process.argv.slice(2);

// Helper function to convert kebab-case to snake case
function toSnakeCase(str) {
  return str.toLowerCase().replace(/-/g, '_');
}

// Supported field types
const supportedTypes = [
  'string',
  'password',
  'number',
  'select',
  'multiple-select',
  'tag-input',
  'textarea',
];

if (args.length < 2) {
  console.error('Usage: node create-form.mjs <moduleName> <field1:type:rule> <field2:type:rule> ...');
  console.error('Example: node create-form.mjs User name:string:required password:password:required age:number:nullable');
  console.error('Supported types: string, password, number, select, multiple-select, tag-input, textarea');
  process.exit(1);
}

// Extract module name and field definitions
const moduleName = args[0];
const fieldArgs = args.slice(1);

// Parse field definitions
const fields = fieldArgs.map((arg) => {
  const parts = arg.split(':');
  if (parts.length !== 3) {
    console.error(`Invalid field format: ${arg}. Expected format: fieldName:type:rule`);
    process.exit(1);
  }

  const [name, type, rule] = parts;

  if (!supportedTypes.includes(type)) {
    console.error(`Unsupported field type: ${type}. Supported types: ${supportedTypes.join(', ')}`);
    process.exit(1);
  }

  if (!['required', 'nullable'].includes(rule)) {
    console.error(`Rule must be 'required' or 'nullable'. Got: ${rule}`);
    process.exit(1);
  }

  return { name, type, rule };
});

// Generate useForm object with appropriate default values
function generateUseForm(fields) {
  const formFields = fields.map((field) => {
    let defaultValue = '\'\'';

    switch (field.type) {
      case 'number':
        defaultValue = '0';
        break;
      case 'multiple-select':
      case 'tag-input':
        defaultValue = '[]';
        break;
      case 'select':
        defaultValue = 'null';
        break;
      default:
        defaultValue = '\'\'';
    }

    return `  ${field.name}: ${defaultValue},`;
  }).join('\n');

  return `const form = useForm({\n${formFields}\n})`;
}

// Generate form items based on field type
function generateFormItems(fields) {
  return fields.map((field) => {
    let inputComponent = '';

    switch (field.type) {
      case 'string':
        inputComponent = `<UiInput id="${field.name}" v-model="form.${field.name}" name="${field.name}" />`;
        break;
      case 'password':
        inputComponent = `<UiInput id="${field.name}" v-model="form.${field.name}" name="${field.name}" type="password" />`;
        break;
      case 'number':
        inputComponent = `<UiInput id="${field.name}" v-model="form.${field.name}" name="${field.name}" type="number" />`;
        break;
      case 'textarea':
        inputComponent = `<UiInput id="${field.name}" v-model="form.${field.name}" name="${field.name}" type="textarea" :rows="5" />`;
        break;
      case 'select':
        inputComponent = `<UiSelect id="${field.name}" v-model="form.${field.name}" name="${field.name}" :options="[]" />`;
        break;
      case 'multiple-select':
        inputComponent = `<UiSelect id="${field.name}" v-model="form.${field.name}" name="${field.name}" :options="[]" :multiple="true" />`;
        break;
      case 'tag-input':
        inputComponent = `<UiInputTag id="${field.name}" v-model="form.${field.name}" name="${field.name}" />`;
        break;
      default:
        inputComponent = `<UiInput id="${field.name}" v-model="form.${field.name}" name="${field.name}" />`;
    }

    return `    <UiFormItem label="${field.name}" prop="${field.name}" for="${field.name}" :error="form.errors.${field.name}">
      ${inputComponent}
    </UiFormItem>`;
  }).join('\n');
}

// Generate rules
function generateRules(fields) {
  const requiredFields = fields.filter(field => field.rule === 'required');

  if (requiredFields.length === 0) {
    return 'const rules = reactive<FormRules>({})';
  }

  const ruleEntries = requiredFields.map((field) => {
    return `  ${field.name}: [
    {
      required: true,
      message: 'Field ${field.name} is required',
    },
  ],`;
  }).join('\n');

  return `const rules = reactive<FormRules>({\n${ruleEntries}\n})`;
}

// Generate complete Vue component
function generateVueComponent(fields) {
  const formItems = generateFormItems(fields);
  const useFormCode = generateUseForm(fields);
  const rulesCode = generateRules(fields);

  return `<template>
  <UiForm :model="form" :rules="rules" :processing="form.processing" @submit="$emit('submit', form)">
${formItems}
  </UiForm>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'

defineEmits<{
  (e: 'submit', form: UseForm): void
}>()

${useFormCode}

${rulesCode}
</script>

<style scoped lang="postcss">

</style>`;
}

// Generate the component
const vueComponent = generateVueComponent(fields);

// Create directory structure
const outputDir = join(process.cwd(), 'app', 'components', 'Form', moduleName);
const createOutputPath = join(outputDir, 'Create.vue');
const editOutputPath = join(outputDir, 'Edit.vue');

// Ensure directory exists
mkdirSync(outputDir, { recursive: true });

// Write to file
writeFileSync(createOutputPath, vueComponent, 'utf8');
writeFileSync(editOutputPath, vueComponent, 'utf8');

console.log(`✅ Form component generated successfully!`);
console.log(`📁 File: ${createOutputPath}`);
console.log(`📁 File: ${editOutputPath}`);
console.log(`📂 Module: ${moduleName}`);
console.log('\n📋 Generated useForm:');
console.log(generateUseForm(fields));
console.log('\n🎯 Fields:', fields.map(f => `${f.name} (${f.type}, ${f.rule})`).join(', '));

// Enhanced usage examples
console.log('\n💡 Usage examples:');
console.log('  pnpm create:form User name:string:required email:string:required');
console.log('  pnpm create:form Profile bio:textarea:nullable age:number:required');
console.log('  pnpm create:form Settings password:password:required tags:tag-input:nullable');
console.log('  pnpm create:form Product category:select:required features:multiple-select:nullable');
