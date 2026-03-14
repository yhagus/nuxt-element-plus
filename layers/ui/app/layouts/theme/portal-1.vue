<script setup lang="ts">
</script>

<template>
  <div class="portal-layout">
    <div class="portal-layout__shell">
      <header class="portal-layout__header">
        <ThemePortalOneLayoutHeader />
      </header>

      <main class="portal-layout__main">
        <div class="portal-layout__grid">
          <ThemePortalOneUiPortalBoard title="Portal Workspace">
            <slot />
          </ThemePortalOneUiPortalBoard>

          <aside class="portal-layout__aside">
            <ThemePortalOneUiPortalStat label="Forms" value="12" />
            <ThemePortalOneUiPortalStat label="Queue" value="4" />
            <ThemePortalOneUiPortalStat label="Flagged" value="1" />
          </aside>
        </div>
      </main>

      <ThemePortalOneLayoutFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.portal-layout {
  min-height: 100vh;
  padding: 20px;
  background: #eef0f6;
}

.portal-layout__shell {
  max-width: 1240px;
  margin: 0 auto;
}

.portal-layout__header {
  margin-bottom: 16px;
}

.portal-layout__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 1fr) 220px;
  }
}

.portal-layout__aside {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
