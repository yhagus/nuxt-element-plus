<script setup lang="ts">
</script>

<template>
  <div class="tabs-layout">
    <header class="tabs-layout__header">
      <ThemeTabsOneLayoutHeader />
    </header>

    <div class="tabs-layout__tabs">
      <ThemeTabsOneLayoutTabs />
    </div>

    <main class="tabs-layout__main">
      <div class="tabs-layout__badges">
        <ThemeTabsOneUiTabBadge label="Live" value="12" />
        <ThemeTabsOneUiTabBadge label="Draft" value="3" />
        <ThemeTabsOneUiTabBadge label="Review" value="5" />
      </div>

      <ThemeTabsOneUiTabPanel title="Tabs Workspace">
        <slot />
      </ThemeTabsOneUiTabPanel>
    </main>

    <ThemeTabsOneLayoutFooter />
  </div>
</template>

<style scoped lang="scss">
.tabs-layout {
  min-height: 100vh;
  background: #f7f8ff;
}

.tabs-layout__header,
.tabs-layout__tabs {
  padding: 10px 10px 0;
}

.tabs-layout__main {
  padding: 10px 10px 18px;
}

.tabs-layout__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
</style>
