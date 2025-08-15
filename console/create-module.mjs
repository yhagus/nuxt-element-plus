#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
dirname(__filename);
const moduleName = process.argv[2];
async function createModule() {
  // Get the module name from command line arguments
  if (!moduleName) {
    console.error('❌ Error: Module name is required');
    console.log('Usage: node create-module.js <module-name>');
    console.log('Example: node create-module.js cmo');
    process.exit(1);
  }

  // Define the target directory and file path
  const targetDir = join(process.cwd(), 'app', 'api', 'modules', moduleName);
  const targetFile = join(targetDir, 'index.ts');

  // Template content with dynamic endpoint
  const templateContent = `import type { NitroFetchOptions } from 'nitropack'
import type { UseFetchOptions } from 'nuxt/app'

export function findAll(options?: UseFetchOptions<any>) {
  return useAPI('/v1/${moduleName}', {
    ...options,
    lazy: true,
  })
}

export function getAll(options?: NitroFetchOptions<any>) {
  return (useNuxtApp().$api as typeof $fetch)('/v1/${moduleName}', options)
}

export function show(id: string, options?: NitroFetchOptions<any>) {
  return (useNuxtApp().$api as typeof $fetch)(\`/v1/${moduleName}/\${id}\`, options)
}

export function create(form: UseForm, options?: NitroFetchOptions<any>) {
  const { refresh } = useRefresh()
  return form.post('/v1/${moduleName}', {
    ...options,
    async onResponse(context) {
      if (context.response.ok) {
        refresh()
      }
      if (options?.onResponse && typeof options.onResponse === 'function') {
        options.onResponse(context)
      }
    },
  })
}

export function update(form: UseForm, id: string, options?: NitroFetchOptions<any>) {
  const { refresh } = useRefresh()
  return form.patch(\`/v1/${moduleName}/\${id}\`, {
    ...options,
    async onResponse(context) {
      if (context.response.ok) {
        refresh()
      }
      if (options?.onResponse && typeof options.onResponse === 'function') {
        options.onResponse(context)
      }
    },
  })
}

export function destroy(id: string, options?: NitroFetchOptions<any>) {
  const { refresh } = useRefresh()
  return (useNuxtApp().$api as typeof $fetch)(\`/v1/${moduleName}/\${id}\`, {
    ...options,
    method: 'DELETE',
    async onResponse(context) {
      if (context.response.ok) {
        refresh()
      }
      if (options?.onResponse && typeof options.onResponse === 'function') {
        options.onResponse(context)
      }
    },
  })
}
`;

  try {
    // Create the directory structure recursively
    await mkdir(targetDir, { recursive: true });

    // Write the file
    await writeFile(targetFile, templateContent, 'utf8');

    console.log(`✅ Module created successfully!`);
    console.log(`📁 Location: ${targetFile}`);
    console.log(`🔗 Endpoint: /v1/${moduleName}`);

    // Run generate.mjs after successful creation
    console.log(`🔄 Running generate.mjs...`);
    await runGenerate();

    // Run eslint on api/index.ts after generate.mjs
    console.log(`🔧 Running ESLint on api/index.ts...`);
    await runESLint();
    console.log(`🔧 Running ESLint on api/modules/${moduleName}/index.ts...`);
    await selfESLint();
  }
  catch (error) {
    console.error('❌ Error creating module:', error.message);
    process.exit(1);
  }
}

// Function to run generate.mjs
function runGenerate() {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['generate.mjs'], {
      stdio: 'inherit', // This will show the output from generate.mjs
      cwd: process.cwd(),
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('✅ generate.mjs completed successfully!');
        resolve();
      }
      else {
        console.error(`❌ generate.mjs exited with code ${code}`);
        reject(new Error(`generate.mjs failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      console.error('❌ Error running generate.mjs:', error.message);
      reject(error);
    });
  });
}

// Function to run ESLint on api/index.ts
function runESLint() {
  return new Promise((resolve) => {
    const targetFile = join(process.cwd(), 'app', 'api', 'index.ts');

    const child = spawn('npx', ['eslint', '--fix', targetFile], {
      stdio: 'inherit', // This will show the ESLint output
      cwd: process.cwd(),
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('✅ ESLint completed successfully!');
        resolve();
      }
      else {
        // ESLint returns non-zero for warnings/errors, but we don't want to fail the whole process
        console.log(`⚠️ ESLint finished with warnings/errors (exit code ${code})`);
        resolve(); // Still resolve, don't fail the whole process
      }
    });

    child.on('error', (error) => {
      console.error('❌ Error running ESLint:', error.message);
      console.log('💡 Make sure ESLint is installed: pnpm add -D eslint');
      resolve(); // Don't fail the whole process if ESLint is not available
    });
  });
}

function selfESLint() {
  return new Promise((resolve) => {
    const targetFile = join(process.cwd(), 'app', 'api', 'modules', `${moduleName}`, 'index.ts');

    const child = spawn('npx', ['eslint', '--fix', targetFile], {
      stdio: 'inherit', // This will show the ESLint output
      cwd: process.cwd(),
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('✅ ESLint completed successfully!');
        resolve();
      }
      else {
        // ESLint returns non-zero for warnings/errors, but we don't want to fail the whole process
        console.log(`⚠️ ESLint finished with warnings/errors (exit code ${code})`);
        resolve(); // Still resolve, don't fail the whole process
      }
    });

    child.on('error', (error) => {
      console.error('❌ Error running ESLint:', error.message);
      console.log('💡 Make sure ESLint is installed: pnpm add -D eslint');
      resolve(); // Don't fail the whole process if ESLint is not available
    });
  });
}

// Run the function
createModule().catch((error) => {
  console.error(error);
});
