// generate-index.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Derive the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust the paths to match your folder structure
const modulesDir = path.join(__dirname, 'app', 'api', 'modules');
const indexFile = path.join(__dirname, 'app', 'api', 'index.ts');

// Function to convert kebab-case to camelCase
function toCamelCase(name) {
  return name
    .replace(/-([a-z])/g, g => g[1].toUpperCase())
    .replace(/^[A-Z]/, g => g[0].toLowerCase());
}

// Function to get immediate subdirectories
async function getImmediateDirectories(dir) {
  const results = [];
  try {
    const list = await fs.readdir(dir, { withFileTypes: true });
    // console.log(`Reading directory: ${dir}`);
    // console.log(`Contents: ${list.map(dirent => dirent.name).join(', ')}`);

    for (const dirent of list) {
      if (dirent.isDirectory()) {
        const res = path.resolve(dir, dirent.name);
        // console.log(`Directory: ${res}`);
        results.push(res);
      }
    }
  }
  catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return results;
}

// Generate index.ts content
async function generateIndex() {
  try {
    const directories = await getImmediateDirectories(modulesDir);
    // console.log(`Found directories: ${directories.join(', ')}`);
    const imports = [];
    const exports = [];

    directories.forEach((dir) => {
      const folderName = path.basename(dir);
      const camelCaseName = toCamelCase(folderName);
      const modulePath = `./modules/${folderName}/index`; // Path to index.ts inside each folder

      // console.log(`Folder Name: ${folderName}, CamelCase: ${camelCaseName}`);
      // console.log(`Folder Name: ${folderName}`);

      if (camelCaseName) {
        imports.push(`import * as ${camelCaseName} from '${modulePath}';`);
        exports.push(`  ${camelCaseName},`);
      }
      else {
        // console.warn(`Skipping folder with invalid camelCase name: ${folderName}`)
      }
    });
    // console.log('Type-safe api file generated:')
    // console.log(directories.map(dir => path.basename(dir)).join(', '))

    const indexContent = `
${imports.join('\n')}

export const api = {
  ${exports.join('')}
};

export type Api = typeof api;`;

    await fs.writeFile(indexFile, indexContent.trim());
    // console.log('Type-safe api file generated successfully.');
  }
  catch (error) {
    console.error('Error generating index file:', error);
  }
}

generateIndex();
