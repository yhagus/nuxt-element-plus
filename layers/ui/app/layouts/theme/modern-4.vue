<script setup lang="ts">
</script>

<template>
  <div class="modern-four-layout">
    <aside class="modern-four-layout__aside">
      <ThemeModernOneLayoutSidebar />
    </aside>

    <div class="modern-four-layout__content">
      <header class="modern-four-layout__header">
        <ThemeModernOneLayoutHeader />
      </header>

      <main class="modern-four-layout__main">
        <section class="modern-four-layout__banner">
          <div class="modern-four-layout__banner-copy">
            <span class="modern-four-layout__eyebrow">Modern Four</span>
            <h1>Operator workspace dengan struktur menu mendalam</h1>
            <p>
              Cocok untuk halaman admin yang perlu menonjolkan sidebar rekursif, notifikasi, dan menu akun tanpa menambah kompleksitas ke page component.
            </p>
          </div>
          <div class="modern-four-layout__banner-stats">
            <div>
              <strong>146</strong>
              <span>Antrian aktif</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Workflow macet</span>
            </div>
            <div>
              <strong>99.2%</strong>
              <span>Sinkronisasi</span>
            </div>
          </div>
        </section>

        <section class="modern-four-layout__body">
          <article class="modern-four-layout__canvas">
            <div class="modern-four-layout__section-head">
              <div>
                <span class="modern-four-layout__eyebrow">Canvas</span>
                <h2>Area konten utama</h2>
              </div>
              <div class="modern-four-layout__pills">
                <span>Audit</span>
                <span>Approvals</span>
                <span>Dispatch</span>
              </div>
            </div>
            <div class="modern-four-layout__slot">
              <slot />
            </div>
          </article>

          <aside class="modern-four-layout__stack">
            <article class="modern-four-layout__card">
              <span class="modern-four-layout__eyebrow">Akun</span>
              <p>Header tema ini sudah menyiapkan dropdown profil dengan akses cepat dan aksi logout.</p>
            </article>
            <article class="modern-four-layout__card">
              <span class="modern-four-layout__eyebrow">Navigasi</span>
              <p>Sidebar mendukung submenu bertingkat, jadi contoh ini bisa dipakai untuk struktur modul yang dalam.</p>
            </article>
          </aside>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modern-four-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(217, 186, 97, 0.12), transparent 26%),
    linear-gradient(180deg, #111315 0%, #171a1f 100%);
  color: #f4f7fb;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.modern-four-layout__aside {
  position: fixed;
  z-index: 20;
  width: 256px;
  max-height: 100vh;
}

.modern-four-layout__content {
  padding-left: 256px;
}

.modern-four-layout__header {
  position: sticky;
  top: 0;
  z-index: 15;
}

.modern-four-layout__main {
  min-height: calc(100vh - 84px);
  padding: 24px;
}

.modern-four-layout__banner,
.modern-four-layout__canvas,
.modern-four-layout__card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(19, 22, 27, 0.78);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
}

.modern-four-layout__banner {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  padding: 26px;
  border-radius: 28px;
  margin-bottom: 20px;

  @media (min-width: 1080px) {
    grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.8fr);
    align-items: end;
  }
}

.modern-four-layout__eyebrow {
  color: #d9ba61;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.modern-four-layout__banner-copy {
  h1 {
    margin: 10px 0 12px;
    font-size: 34px;
    line-height: 1.05;
  }

  p {
    max-width: 760px;
    margin: 0;
    color: #a7b0c0;
    line-height: 1.8;
  }
}

.modern-four-layout__banner-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  div {
    padding: 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.04);
  }

  strong {
    display: block;
    margin-bottom: 4px;
    color: #fff;
    font-size: 28px;
  }

  span {
    color: #9ba5b7;
    font-size: 13px;
  }
}

.modern-four-layout__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: minmax(0, 1fr) 320px;
  }
}

.modern-four-layout__canvas {
  padding: 24px;
  border-radius: 28px;
}

.modern-four-layout__section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  h2 {
    margin: 8px 0 0;
    font-size: 24px;
  }
}

.modern-four-layout__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  span {
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(217, 186, 97, 0.12);
    color: #f7df96;
    font-size: 12px;
    font-weight: 700;
  }
}

.modern-four-layout__slot {
  min-height: 420px;
}

.modern-four-layout__stack {
  display: grid;
  gap: 20px;
  align-content: start;
}

.modern-four-layout__card {
  padding: 22px;
  border-radius: 24px;

  p {
    margin: 10px 0 0;
    color: #a7b0c0;
    line-height: 1.8;
  }
}
</style>
