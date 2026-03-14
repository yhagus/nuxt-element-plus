<script setup lang="ts">
</script>

<template>
  <div class="tile-layout">
    <header class="tile-layout__header">
      <ThemeTileOneLayoutHeader />
    </header>

    <section class="tile-layout__nav">
      <ThemeTileOneLayoutNav />
    </section>

    <main class="tile-layout__main">
      <div class="tile-layout__tiles">
        <ThemeTileOneUiTileStat label="Open" value="14" />
        <ThemeTileOneUiTileStat label="Done" value="82" />
        <ThemeTileOneUiTileStat label="Late" value="3" />
      </div>

      <ThemeTileOneUiTileBoard title="Tile Workspace">
        <slot />
      </ThemeTileOneUiTileBoard>
    </main>

    <ThemeTileOneLayoutFooter />
  </div>
</template>

<style scoped lang="scss">
.tile-layout {
  min-height: 100vh;
  background: #f4f6f3;
}

.tile-layout__header,
.tile-layout__nav {
  padding: 12px 12px 0;
}

.tile-layout__main {
  padding: 12px 12px 20px;
}

.tile-layout__tiles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}
</style>
