# Nuxt Boilerplate
Monorepo Nuxt 4 workspace with shared conventions, UI components, and API patterns based on personal preferences.

## Requirements

- Node.js 22+
- pnpm

## SSR Support (only when `ssr: true` in `nuxt.config.ts`)
Create file `.npmrc`, add these code:
```
shamefully-hoist=true
node-linker=hoisted
```

## Quick Start

```bash
pnpm install
pnpm dev
```
