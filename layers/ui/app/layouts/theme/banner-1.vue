<script setup lang="ts">
</script>

<template>
  <div class="banner-layout">
    <header class="banner-layout__hero">
      <ThemeBannerOneLayoutHeader />
    </header>

    <div class="banner-layout__subnav">
      <ThemeBannerOneLayoutNav />
    </div>

    <main class="banner-layout__main">
      <div class="banner-layout__metrics">
        <ThemeBannerOneUiBannerStat label="Reach" value="182k" />
        <ThemeBannerOneUiBannerStat label="CTR" value="7.4%" />
        <ThemeBannerOneUiBannerStat label="Spend" value="Rp 84 Jt" />
      </div>

      <ThemeBannerOneUiBoard title="Banner Workspace">
        <slot />
      </ThemeBannerOneUiBoard>
    </main>

    <ThemeBannerOneLayoutFooter />
  </div>
</template>

<style scoped lang="scss">
.banner-layout {
  min-height: 100vh;
  background: #f8f3ee;
}

.banner-layout__hero,
.banner-layout__subnav {
  padding: 16px 16px 0;
}

.banner-layout__main {
  padding: 16px;
}

.banner-layout__metrics {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
