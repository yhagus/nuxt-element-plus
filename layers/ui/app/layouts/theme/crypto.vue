<template>
  <div class="crypto-layout">
    <!-- TICKER BAR -->
    <div class="border-b border-nova-border py-2 bg-nova-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div class="flex items-center gap-3 px-5">
        <span class="flex items-center gap-1.5 text-xs font-mono text-nova-accent shrink-0">
          <span class="live-dot" /> LIVE
        </span>
        <div class="ticker-wrap flex-1 overflow-hidden">
          <div class="ticker-track animate-ticker" style="animation:ticker 28s linear infinite">
            <!-- duplicated for seamless loop -->
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">BTC</span> $68,420.50 <span class="text-nova-accent">+2.34%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">ETH</span> $3,812.77 <span class="text-nova-accent">+1.18%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">SOL</span> $178.44 <span class="text-nova-accent">+4.52%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">BNB</span> $605.12 <span class="text-nova-red">-0.87%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">XRP</span> $0.6120 <span class="text-nova-accent">+0.44%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">ADA</span> $0.4451 <span class="text-nova-red">-1.23%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">AVAX</span> $37.88 <span class="text-nova-accent">+3.11%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">DOGE</span> $0.1722 <span class="text-nova-accent">+0.98%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">BTC</span> $68,420.50 <span class="text-nova-accent">+2.34%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">ETH</span> $3,812.77 <span class="text-nova-accent">+1.18%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">SOL</span> $178.44 <span class="text-nova-accent">+4.52%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">BNB</span> $605.12 <span class="text-nova-red">-0.87%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">XRP</span> $0.6120 <span class="text-nova-accent">+0.44%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">ADA</span> $0.4451 <span class="text-nova-red">-1.23%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">AVAX</span> $37.88 <span class="text-nova-accent">+3.11%</span></span>
            <span class="ticker-item text-nova-dim"><span class="text-nova-text font-bold">DOGE</span> $0.1722 <span class="text-nova-accent">+0.98%</span></span>
          </div>
        </div>
        <span class="text-xs font-mono text-nova-dim shrink-0">Market Cap: <span class="text-nova-text">$2.61T</span></span>
      </div>
    </div>

    <div class="flex min-h-screen">
      <!-- SIDEBAR -->
      <aside class="desktop-sidebar w-60 shrink-0 border-r border-nova-border p-5 flex flex-col gap-2 sticky top-[37px] h-[calc(100vh-37px)] overflow-y-auto">
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-7 h-7 rounded-lg bg-nova-accent flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,4.5 13,10.5 7,14 1,10.5 1,4.5" fill="#080b12" /></svg>
            </div>
            <span class="font-display font-800 text-lg text-nova-text tracking-tight">CryptoNova</span>
          </div>
          <p class="text-xs text-nova-dim font-mono">
            Pro Dashboard
          </p>
        </div>

        <p class="text-[10px] uppercase tracking-widest text-nova-muted font-mono mt-2 mb-1">
          Main
        </p>
        <div class="nav-link active">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
          Overview
        </div>
        <div class="nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
          Markets
        </div>
        <div class="nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
          Portfolio
        </div>
        <div class="nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
          Trade
        </div>

        <p class="text-[10px] uppercase tracking-widest text-nova-muted font-mono mt-4 mb-1">
          Analytics
        </p>
        <div class="nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
          Analytics
        </div>
        <div class="nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          Watchlist
        </div>

        <p class="text-[10px] uppercase tracking-widest text-nova-muted font-mono mt-4 mb-1">
          Account
        </p>
        <div class="nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          Profile
        </div>
        <div class="nav-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /></svg>
          Settings
        </div>

        <div class="mt-auto pt-4 border-t border-nova-border">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-nova-accent2 to-nova-accent flex items-center justify-center text-xs font-bold text-white">
              AJ
            </div>
            <div>
              <p class="text-sm font-semibold text-nova-text">
                Alex Jordan
              </p>
              <p class="text-xs text-nova-dim font-mono">
                Pro Member
              </p>
            </div>
          </div>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <!-- HEADER -->
        <div class="mb-6 flex flex-col gap-3 fade-in sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-display font-bold text-nova-text">
              Overview
            </h1>
            <p class="text-nova-dim text-sm font-mono mt-0.5">
              Sat, Mar 21, 2026 &nbsp;·&nbsp; UTC+7
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button class="flex items-center gap-2 text-sm text-nova-dim border border-nova-border px-4 py-2 rounded-lg hover:border-nova-accent/40 hover:text-nova-text transition-all">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              Alerts <span class="w-4 h-4 rounded-full bg-nova-red text-white text-[9px] flex items-center justify-center font-bold">3</span>
            </button>
            <button class="text-sm bg-nova-accent text-nova-bg font-bold px-4 py-2 rounded-lg hover:bg-nova-accent/85 transition-all shadow-glow-accent">
              + New Trade
            </button>
          </div>
        </div>

        <!-- STAT CARDS -->
        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <!-- Total Balance -->
          <div class="card card-glow-accent p-5 fade-in fade-in-1">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-xs font-mono text-nova-dim uppercase tracking-wider mb-1">
                  Total Balance
                </p>
                <p class="text-2xl font-display font-bold text-nova-text">
                  $84,621<span class="text-nova-accent text-lg">.40</span>
                </p>
              </div>
              <div class="w-9 h-9 rounded-xl bg-nova-accent/10 flex items-center justify-center">
                <svg width="18" height="18" fill="none" stroke="#00f5c4" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="badge-up">↑ 12.4%</span>
              <span class="text-xs text-nova-dim font-mono">vs last month</span>
            </div>
          </div>
          <!-- 24h PnL -->
          <div class="card p-5 fade-in fade-in-2">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-xs font-mono text-nova-dim uppercase tracking-wider mb-1">
                  24h PnL
                </p>
                <p class="text-2xl font-display font-bold text-nova-accent">
                  +$2,148<span class="text-lg">.90</span>
                </p>
              </div>
              <div class="w-9 h-9 rounded-xl bg-nova-accent/10 flex items-center justify-center">
                <svg width="18" height="18" fill="none" stroke="#00f5c4" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="badge-up">↑ 3.8%</span>
              <span class="text-xs text-nova-dim font-mono">today</span>
            </div>
          </div>
          <!-- Open Positions -->
          <div class="card p-5 fade-in fade-in-3">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-xs font-mono text-nova-dim uppercase tracking-wider mb-1">
                  Open Positions
                </p>
                <p class="text-2xl font-display font-bold text-nova-text">
                  7
                </p>
              </div>
              <div class="w-9 h-9 rounded-xl bg-nova-accent2/10 flex items-center justify-center">
                <svg width="18" height="18" fill="none" stroke="#7b5cfa" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="badge-down">↓ 2</span>
              <span class="text-xs text-nova-dim font-mono">from yesterday</span>
            </div>
          </div>
          <!-- Win Rate -->
          <div class="card p-5 fade-in fade-in-4">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-xs font-mono text-nova-dim uppercase tracking-wider mb-1">
                  Win Rate
                </p>
                <p class="text-2xl font-display font-bold text-nova-text">
                  72<span class="text-nova-accent3 text-lg">%</span>
                </p>
              </div>
              <div class="w-9 h-9 rounded-xl bg-nova-accent3/10 flex items-center justify-center">
                <svg width="18" height="18" fill="none" stroke="#f5a623" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02l1.18-6.88-5-4.87 6.91-1.01L12 2z" /></svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="badge-up">↑ 5.2%</span>
              <span class="text-xs text-nova-dim font-mono">this week</span>
            </div>
          </div>
        </div>

        <!-- MAIN CHART + ALLOCATION -->
        <div class="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <!-- Main Chart -->
          <div class="card p-5 fade-in fade-in-2 xl:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="flex items-center gap-3">
                  <h2 class="font-display font-bold text-nova-text text-lg">
                    Portfolio Performance
                  </h2>
                  <span class="badge-up">+18.6% this month</span>
                </div>
                <p class="text-xs text-nova-dim font-mono mt-1">
                  All assets combined · USD
                </p>
              </div>
              <div class="flex items-center gap-1 text-xs font-mono">
                <button class="px-3 py-1.5 rounded-md bg-nova-accent/10 text-nova-accent font-bold">
                  1M
                </button>
                <button class="px-3 py-1.5 rounded-md text-nova-dim hover:text-nova-text transition-colors">
                  3M
                </button>
                <button class="px-3 py-1.5 rounded-md text-nova-dim hover:text-nova-text transition-colors">
                  6M
                </button>
                <button class="px-3 py-1.5 rounded-md text-nova-dim hover:text-nova-text transition-colors">
                  1Y
                </button>
              </div>
            </div>
            <!-- SVG Chart -->
            <div class="relative h-48">
              <svg viewBox="0 0 600 180" preserveAspectRatio="none" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#00f5c4" stop-opacity="0.22" />
                    <stop offset="100%" stop-color="#00f5c4" stop-opacity="0" />
                  </linearGradient>
                  <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#7b5cfa" stop-opacity="0.14" />
                    <stop offset="100%" stop-color="#7b5cfa" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <!-- Grid lines -->
                <line x1="0" y1="36" x2="600" y2="36" stroke="#1a2235" stroke-width="1" />
                <line x1="0" y1="72" x2="600" y2="72" stroke="#1a2235" stroke-width="1" />
                <line x1="0" y1="108" x2="600" y2="108" stroke="#1a2235" stroke-width="1" />
                <line x1="0" y1="144" x2="600" y2="144" stroke="#1a2235" stroke-width="1" />
                <!-- Area fill green -->
                <path d="M0,148 C40,140 60,130 90,115 C120,100 140,120 170,105 C200,90 220,95 250,80 C280,65 300,70 330,55 C360,40 380,50 410,38 C440,26 460,32 490,22 C520,12 560,18 600,10 L600,180 L0,180 Z" fill="url(#areaGrad)" />
                <!-- Area fill purple -->
                <path d="M0,160 C40,155 70,148 100,140 C130,132 150,142 180,135 C210,128 230,132 260,120 C290,108 310,114 340,102 C370,90 395,96 420,86 C450,76 470,82 500,72 C530,62 560,68 600,58 L600,180 L0,180 Z" fill="url(#areaGrad2)" />
                <!-- Line green (main portfolio) -->
                <path class="area-path" d="M0,148 C40,140 60,130 90,115 C120,100 140,120 170,105 C200,90 220,95 250,80 C280,65 300,70 330,55 C360,40 380,50 410,38 C440,26 460,32 490,22 C520,12 560,18 600,10" fill="none" stroke="#00f5c4" stroke-width="2" stroke-linecap="round" />
                <!-- Line purple (BTC) -->
                <path d="M0,160 C40,155 70,148 100,140 C130,132 150,142 180,135 C210,128 230,132 260,120 C290,108 310,114 340,102 C370,90 395,96 420,86 C450,76 470,82 500,72 C530,62 560,68 600,58" fill="none" stroke="#7b5cfa" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 3" />
                <!-- Dot on latest point -->
                <circle cx="600" cy="10" r="4" fill="#00f5c4" opacity="0.9" />
                <circle cx="600" cy="10" r="8" fill="#00f5c4" opacity="0.2" />
              </svg>
              <!-- Y labels -->
              <div class="absolute left-0 top-0 h-full flex flex-col justify-between pointer-events-none" style="margin-top:-6px;">
                <span class="text-[10px] font-mono text-nova-muted">$90K</span>
                <span class="text-[10px] font-mono text-nova-muted">$75K</span>
                <span class="text-[10px] font-mono text-nova-muted">$60K</span>
                <span class="text-[10px] font-mono text-nova-muted">$45K</span>
              </div>
            </div>
            <!-- X labels -->
            <div class="flex justify-between mt-2 px-5">
              <span class="text-[10px] font-mono text-nova-muted">Feb 18</span>
              <span class="text-[10px] font-mono text-nova-muted">Feb 24</span>
              <span class="text-[10px] font-mono text-nova-muted">Mar 1</span>
              <span class="text-[10px] font-mono text-nova-muted">Mar 7</span>
              <span class="text-[10px] font-mono text-nova-muted">Mar 14</span>
              <span class="text-[10px] font-mono text-nova-muted">Mar 21</span>
            </div>
            <div class="flex items-center gap-5 mt-3 pt-3 border-t border-nova-border">
              <div class="flex items-center gap-2">
                <span class="w-3 h-0.5 bg-nova-accent inline-block rounded" /><span class="text-xs font-mono text-nova-dim">Portfolio</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-0.5 bg-nova-accent2 inline-block rounded border-dashed" /><span class="text-xs font-mono text-nova-dim">BTC Reference</span>
              </div>
            </div>
          </div>

          <!-- Portfolio Allocation -->
          <div class="card p-5 fade-in fade-in-3">
            <h2 class="font-display font-bold text-nova-text mb-1">
              Allocation
            </h2>
            <p class="text-xs text-nova-dim font-mono mb-4">
              By asset · 7 holdings
            </p>
            <!-- Donut SVG -->
            <div class="flex justify-center mb-5">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="52" fill="none" stroke="#1a2235" stroke-width="20" />
                <!-- BTC: 42% -->
                <circle
                  cx="70" cy="70" r="52" fill="none" stroke="#00f5c4" stroke-width="20"
                  stroke-dasharray="137.4 326.6" stroke-dashoffset="0" class="donut-ring"
                />
                <!-- ETH: 28% -->
                <circle
                  cx="70" cy="70" r="52" fill="none" stroke="#7b5cfa" stroke-width="20"
                  stroke-dasharray="91.6 372.4" stroke-dashoffset="-137.4" class="donut-ring"
                />
                <!-- SOL: 16% -->
                <circle
                  cx="70" cy="70" r="52" fill="none" stroke="#f5a623" stroke-width="20"
                  stroke-dasharray="52.4 411.6" stroke-dashoffset="-229" class="donut-ring"
                />
                <!-- Others: 14% -->
                <circle
                  cx="70" cy="70" r="52" fill="none" stroke="#2a3a55" stroke-width="20"
                  stroke-dasharray="45.8 418.2" stroke-dashoffset="-281.4" class="donut-ring"
                />
                <text x="70" y="66" text-anchor="middle" fill="#e2e8f0" font-family="Syne" font-size="15" font-weight="700">$84.6K</text>
                <text x="70" y="80" text-anchor="middle" fill="#8896aa" font-family="Space Mono" font-size="9">Total</text>
              </svg>
            </div>
            <div class="space-y-2.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-nova-accent" /><span class="text-sm text-nova-text font-semibold">BTC</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="progress-bar w-20">
                    <div class="progress-fill bg-nova-accent" style="width:42%" />
                  </div>
                  <span class="text-xs font-mono text-nova-dim w-8 text-right">42%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-nova-accent2" /><span class="text-sm text-nova-text font-semibold">ETH</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="progress-bar w-20">
                    <div class="progress-fill bg-nova-accent2" style="width:28%" />
                  </div>
                  <span class="text-xs font-mono text-nova-dim w-8 text-right">28%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-nova-accent3" /><span class="text-sm text-nova-text font-semibold">SOL</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="progress-bar w-20">
                    <div class="progress-fill bg-nova-accent3" style="width:16%" />
                  </div>
                  <span class="text-xs font-mono text-nova-dim w-8 text-right">16%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-nova-muted" /><span class="text-sm text-nova-text font-semibold">Others</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="progress-bar w-20">
                    <div class="progress-fill bg-nova-muted" style="width:14%" />
                  </div>
                  <span class="text-xs font-mono text-nova-dim w-8 text-right">14%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MARKET TABLE + RECENT TX -->
        <div class="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <!-- Market Table -->
          <div class="card fade-in fade-in-3 xl:col-span-2">
            <div class="flex items-center justify-between p-5 pb-3 border-b border-nova-border">
              <h2 class="font-display font-bold text-nova-text">
                Top Markets
              </h2>
              <a href="#" class="text-xs font-mono text-nova-accent hover:underline">View all →</a>
            </div>
            <!-- Header -->
            <div class="coin-row text-[10px] font-mono text-nova-muted uppercase tracking-wider px-4 pt-3 pb-1">
              <span>#</span>
              <span>Name</span>
              <span class="text-right">Price</span>
              <span class="text-right">24h</span>
              <span class="text-right">7d</span>
              <span class="text-right">Mkt Cap</span>
            </div>
            <!-- Rows -->
            <div class="px-2 pb-2">
              <!-- BTC -->
              <div class="coin-row">
                <span class="text-nova-dim font-mono text-xs">1</span>
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-[#f7931a]/15 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f7931a"><path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" /></svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nova-text">
                      Bitcoin
                    </p>
                    <p class="text-[10px] font-mono text-nova-muted">
                      BTC
                    </p>
                  </div>
                </div>
                <span class="text-sm font-mono text-nova-text text-right">$68,420</span>
                <span class="badge-up text-right ml-auto">+2.34%</span>
                <span class="badge-up text-right ml-auto">+8.92%</span>
                <span class="text-xs font-mono text-nova-dim text-right">$1.34T</span>
              </div>
              <!-- ETH -->
              <div class="coin-row">
                <span class="text-nova-dim font-mono text-xs">2</span>
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-[#627eea]/15 flex items-center justify-center shrink-0">
                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M6 0l-.1.34v11.18l.1.1L12 8.28 6 0z" fill="#627eea" opacity=".8" /><path d="M6 0L0 8.28l6 3.34V0z" fill="#627eea" /><path d="M6 12.37l-.07.09v4.37L6 18l6-8.45-6 2.82z" fill="#627eea" opacity=".8" /><path d="M6 18v-5.63L0 9.55 6 18z" fill="#627eea" /><path d="M6 11.62l6-3.34-6-2.72v6.06z" fill="#627eea" opacity=".5" /><path d="M0 8.28l6 3.34V5.56L0 8.28z" fill="#627eea" opacity=".7" /></svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nova-text">
                      Ethereum
                    </p>
                    <p class="text-[10px] font-mono text-nova-muted">
                      ETH
                    </p>
                  </div>
                </div>
                <span class="text-sm font-mono text-nova-text text-right">$3,812</span>
                <span class="badge-up text-right ml-auto">+1.18%</span>
                <span class="badge-up text-right ml-auto">+5.44%</span>
                <span class="text-xs font-mono text-nova-dim text-right">$458B</span>
              </div>
              <!-- SOL -->
              <div class="coin-row">
                <span class="text-nova-dim font-mono text-xs">3</span>
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-[#9945ff]/15 flex items-center justify-center shrink-0">
                    <svg width="14" height="12" viewBox="0 0 56 44" fill="none"><path d="M9.9 32.5a1.4 1.4 0 0 1 1-.4h44.7c.6 0 .9.8.5 1.3l-7.1 7.2a1.4 1.4 0 0 1-1 .4H2.3a.7.7 0 0 1-.5-1.3l8.1-7.2z" fill="#9945ff" /><path d="M9.9 1.4A1.4 1.4 0 0 1 10.9 1h44.7c.6 0 .9.8.5 1.3l-7.1 7.2a1.4 1.4 0 0 1-1 .4H2.3A.7.7 0 0 1 1.8 8.5L9.9 1.4z" fill="#03e1ff" /><path d="M48.1 17a1.4 1.4 0 0 0-1-.4H2.4a.7.7 0 0 0-.5 1.3l8.1 7.1a1.4 1.4 0 0 0 1 .4h44.7c.6 0 .9-.7.5-1.3l-8.1-7.1z" fill="#dc1fff" /></svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nova-text">
                      Solana
                    </p>
                    <p class="text-[10px] font-mono text-nova-muted">
                      SOL
                    </p>
                  </div>
                </div>
                <span class="text-sm font-mono text-nova-text text-right">$178.44</span>
                <span class="badge-up text-right ml-auto">+4.52%</span>
                <span class="badge-up text-right ml-auto">+12.1%</span>
                <span class="text-xs font-mono text-nova-dim text-right">$83B</span>
              </div>
              <!-- BNB -->
              <div class="coin-row">
                <span class="text-nova-dim font-mono text-xs">4</span>
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-[#f3ba2f]/15 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f3ba2f"><path d="M12 2l2.6 2.6-6.2 6.2-2.6-2.6L12 2zm-5.4 5.4l2.6 2.6-2.6 2.6-2.6-2.6 2.6-2.6zM12 7.4l6.6 6.6-2.6 2.6-4-4-4 4-2.6-2.6L12 7.4zm5.4 5.4l2.6-2.6 2.6 2.6-2.6 2.6-2.6-2.6zM12 17.4l-2.6-2.6 2.6-2.6 2.6 2.6-2.6 2.6z" /></svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nova-text">
                      BNB
                    </p>
                    <p class="text-[10px] font-mono text-nova-muted">
                      BNB
                    </p>
                  </div>
                </div>
                <span class="text-sm font-mono text-nova-text text-right">$605.12</span>
                <span class="badge-down text-right ml-auto">-0.87%</span>
                <span class="badge-up text-right ml-auto">+3.21%</span>
                <span class="text-xs font-mono text-nova-dim text-right">$91B</span>
              </div>
              <!-- XRP -->
              <div class="coin-row">
                <span class="text-nova-dim font-mono text-xs">5</span>
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-[#00aae4]/15 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#00aae4"><path d="M20 4h-2.5l-5.5 5.5-5.5-5.5H4l7 7-7 7h2.5l5.5-5.5 5.5 5.5H20l-7-7 7-7z" /></svg>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nova-text">
                      XRP
                    </p>
                    <p class="text-[10px] font-mono text-nova-muted">
                      XRP
                    </p>
                  </div>
                </div>
                <span class="text-sm font-mono text-nova-text text-right">$0.6120</span>
                <span class="badge-up text-right ml-auto">+0.44%</span>
                <span class="badge-down text-right ml-auto">-2.33%</span>
                <span class="text-xs font-mono text-nova-dim text-right">$34B</span>
              </div>
            </div>
          </div>

          <!-- Recent Transactions + Fear & Greed -->
          <div class="flex flex-col gap-4">
            <!-- Fear & Greed -->
            <div class="card p-5 fade-in fade-in-4">
              <h2 class="font-display font-bold text-nova-text mb-1">
                Fear & Greed
              </h2>
              <p class="text-xs text-nova-dim font-mono mb-4">
                Market sentiment index
              </p>
              <div class="flex items-center justify-center mb-3">
                <div class="relative w-28 h-14 overflow-hidden">
                  <svg viewBox="0 0 120 60" class="w-full h-full">
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#ff4560" />
                        <stop offset="35%" stop-color="#f5a623" />
                        <stop offset="65%" stop-color="#f5a623" />
                        <stop offset="100%" stop-color="#00f5c4" />
                      </linearGradient>
                    </defs>
                    <path d="M10,55 A50,50 0 0,1 110,55" fill="none" stroke="#1a2235" stroke-width="10" stroke-linecap="round" />
                    <path d="M10,55 A50,50 0 0,1 110,55" fill="none" stroke="url(#gaugeGrad)" stroke-width="10" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="47" />
                    <!-- Needle at ~72 (greed) -->
                    <line x1="60" y1="55" x2="95" y2="18" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" />
                    <circle cx="60" cy="55" r="4" fill="#e2e8f0" />
                  </svg>
                </div>
              </div>
              <div class="text-center">
                <span class="text-2xl font-display font-bold text-nova-accent">72</span>
                <p class="text-xs font-mono text-nova-accent mt-0.5">
                  Greed
                </p>
              </div>
              <div class="flex justify-between text-[10px] font-mono text-nova-muted mt-2">
                <span>Fear</span><span>Neutral</span><span>Greed</span>
              </div>
            </div>

            <!-- Recent Transactions -->
            <div class="card p-5 flex-1 fade-in fade-in-5">
              <div class="flex items-center justify-between mb-3">
                <h2 class="font-display font-bold text-nova-text">
                  Recent Txns
                </h2>
                <a href="#" class="text-xs font-mono text-nova-accent hover:underline">All →</a>
              </div>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-full bg-nova-accent/10 flex items-center justify-center">
                      <svg width="12" height="12" fill="none" stroke="#00f5c4" stroke-width="2.2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-nova-text">
                        Bought BTC
                      </p>
                      <p class="text-[10px] font-mono text-nova-dim">
                        0.145 BTC
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-mono text-nova-text">
                      -$9,921
                    </p>
                    <p class="text-[10px] font-mono text-nova-dim">
                      2h ago
                    </p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-full bg-nova-red/10 flex items-center justify-center">
                      <svg width="12" height="12" fill="none" stroke="#ff4560" stroke-width="2.2" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-nova-text">
                        Sold ETH
                      </p>
                      <p class="text-[10px] font-mono text-nova-dim">
                        1.2 ETH
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-mono text-nova-accent">
                      +$4,575
                    </p>
                    <p class="text-[10px] font-mono text-nova-dim">
                      5h ago
                    </p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-full bg-nova-accent/10 flex items-center justify-center">
                      <svg width="12" height="12" fill="none" stroke="#00f5c4" stroke-width="2.2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-nova-text">
                        Bought SOL
                      </p>
                      <p class="text-[10px] font-mono text-nova-dim">
                        20 SOL
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-mono text-nova-text">
                      -$3,568
                    </p>
                    <p class="text-[10px] font-mono text-nova-dim">
                      1d ago
                    </p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-full bg-nova-accent2/10 flex items-center justify-center">
                      <svg width="12" height="12" fill="none" stroke="#7b5cfa" stroke-width="2.2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /></svg>
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-nova-text">
                        Swapped
                      </p>
                      <p class="text-[10px] font-mono text-nova-dim">
                        BNB → AVAX
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-mono text-nova-dim">
                      0 fee
                    </p>
                    <p class="text-[10px] font-mono text-nova-dim">
                      2d ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM ROW: Quick Trade + News -->
        <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <!-- Quick Trade -->
          <div class="card p-5 fade-in fade-in-5">
            <h2 class="font-display font-bold text-nova-text mb-4">
              Quick Trade
            </h2>
            <div class="flex gap-2 mb-4">
              <button class="flex-1 py-2 rounded-lg bg-nova-accent text-nova-bg text-sm font-bold hover:bg-nova-accent/85 transition-all">
                Buy
              </button>
              <button class="flex-1 py-2 rounded-lg border border-nova-border text-nova-dim text-sm font-bold hover:border-nova-red/50 hover:text-nova-red transition-all">
                Sell
              </button>
            </div>
            <div class="space-y-3">
              <div>
                <label class="text-[10px] font-mono text-nova-dim uppercase tracking-wider">Asset</label>
                <div class="mt-1 flex items-center justify-between bg-nova-bg border border-nova-border rounded-lg px-3 py-2.5">
                  <span class="text-sm font-semibold text-nova-text">Bitcoin (BTC)</span>
                  <svg width="12" height="12" fill="none" stroke="#8896aa" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
              <div>
                <label class="text-[10px] font-mono text-nova-dim uppercase tracking-wider">Amount (USD)</label>
                <div class="mt-1 flex items-center bg-nova-bg border border-nova-border rounded-lg px-3 py-2.5 focus-within:border-nova-accent/50 transition-colors">
                  <span class="text-nova-dim font-mono text-sm mr-2">$</span>
                  <input type="text" value="1,000" class="bg-transparent text-sm font-mono text-nova-text outline-none flex-1 w-full">
                </div>
              </div>
              <div class="flex justify-between text-xs font-mono">
                <span class="text-nova-dim">≈ 0.01461 BTC</span>
                <span class="text-nova-dim">Bal: <span class="text-nova-text">$8,421</span></span>
              </div>
              <button class="w-full py-2.5 rounded-lg bg-nova-accent text-nova-bg font-bold text-sm hover:bg-nova-accent/85 transition-all shadow-glow-accent mt-1">
                Place Buy Order
              </button>
            </div>
          </div>

          <!-- News Feed -->
          <div class="card p-5 fade-in fade-in-6 xl:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-display font-bold text-nova-text">
                Market News
              </h2>
              <span class="text-xs font-mono text-nova-dim">Last updated: 2m ago</span>
            </div>
            <div class="space-y-4">
              <div class="flex items-start gap-3 pb-4 border-b border-nova-border">
                <div class="w-14 h-14 rounded-xl bg-nova-accent/8 border border-nova-accent/15 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" fill="none" stroke="#00f5c4" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-mono bg-nova-accent/10 text-nova-accent px-2 py-0.5 rounded">BTC</span>
                    <span class="text-[10px] font-mono text-nova-dim">3 min ago · CoinDesk</span>
                  </div>
                  <p class="text-sm font-semibold text-nova-text leading-snug">
                    Bitcoin Surges Past $68K as Institutional Demand Hits Record High in Q1 2026
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3 pb-4 border-b border-nova-border">
                <div class="w-14 h-14 rounded-xl bg-nova-accent2/8 border border-nova-accent2/15 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" fill="none" stroke="#7b5cfa" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02l1.18-6.88-5-4.87 6.91-1.01L12 2z" /></svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-mono bg-nova-accent2/10 text-nova-accent2 px-2 py-0.5 rounded">ETH</span>
                    <span class="text-[10px] font-mono text-nova-dim">18 min ago · The Block</span>
                  </div>
                  <p class="text-sm font-semibold text-nova-text leading-snug">
                    Ethereum's Pectra Upgrade Scheduled for April, Boosting Validator Efficiency
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-14 h-14 rounded-xl bg-nova-accent3/8 border border-nova-accent3/15 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" fill="none" stroke="#f5a623" stroke-width="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-mono bg-nova-accent3/10 text-nova-accent3 px-2 py-0.5 rounded">SOL</span>
                    <span class="text-[10px] font-mono text-nova-dim">42 min ago · Decrypt</span>
                  </div>
                  <p class="text-sm font-semibold text-nova-text leading-snug">
                    Solana DeFi TVL Crosses $10B for First Time, Driven by Surge in Liquid Staking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="card mt-4 p-5">
          <slot />
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
    * {
  box-sizing: border-box;
}
.crypto-layout {
  background-color: #080b12;
  background-image:
    linear-gradient(rgba(0, 245, 196, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 196, 0.035) 1px, transparent 1px);
  background-size: 32px 32px;
  font-family: 'Syne', sans-serif;
  color: #e2e8f0;
  min-height: 100vh;
}
::-webkit-scrollbar {
  width: 6px;
  background: #0e1420;
}
::-webkit-scrollbar-thumb {
  background: #1a2235;
  border-radius: 4px;
}
.card {
  background: #0e1420;
  border: 1px solid #1a2235;
  border-radius: 16px;
}
.card-glow-accent {
  box-shadow: 0 0 32px rgba(0, 245, 196, 0.08);
}
.card-glow-purple {
  box-shadow: 0 0 32px rgba(123, 92, 250, 0.08);
}
.badge-up {
  background: rgba(0, 245, 196, 0.12);
  color: #00f5c4;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 11px;
  font-family: 'Space Mono', monospace;
}
.badge-down {
  background: rgba(255, 69, 96, 0.12);
  color: #ff4560;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 11px;
  font-family: 'Space Mono', monospace;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border-radius: 10px;
  color: #8896aa;
  font-size: 14px;
  font-weight: 600;
  transition:
    background 0.18s,
    color 0.18s;
  cursor: pointer;
}
.nav-link:hover,
.nav-link.active {
  background: rgba(0, 245, 196, 0.08);
  color: #00f5c4;
}
.sparkline {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 28px;
}
.sparkline-bar {
  width: 3px;
  border-radius: 2px;
  opacity: 0.8;
  transition: height 0.3s;
}
.mini-chart {
  position: relative;
  height: 56px;
  width: 100%;
}
.mini-chart svg {
  width: 100%;
  height: 100%;
}
.ticker-wrap {
  overflow: hidden;
}
.ticker-track {
  display: flex;
  gap: 0;
  white-space: nowrap;
}
.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
}
.live-dot {
  width: 7px;
  height: 7px;
  background: #00f5c4;
  border-radius: 50%;
  display: inline-block;
  animation: pulse2 1.6s ease-in-out infinite;
}
.progress-bar {
  height: 4px;
  background: #1a2235;
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease;
}
.coin-row {
  display: grid;
  grid-template-columns: 28px 1fr 110px 90px 90px 90px;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  transition: background 0.15s;
  cursor: pointer;
}
.coin-row:hover {
  background: rgba(255, 255, 255, 0.03);
}
.donut-ring {
  transform-origin: center;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.fade-in {
  animation: fadeIn 0.5s ease both;
}
.fade-in-1 {
  animation-delay: 0.05s;
}
.fade-in-2 {
  animation-delay: 0.12s;
}
.fade-in-3 {
  animation-delay: 0.19s;
}
.fade-in-4 {
  animation-delay: 0.26s;
}
.fade-in-5 {
  animation-delay: 0.33s;
}
.fade-in-6 {
  animation-delay: 0.4s;
}
.area-path {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  animation: drawPath 1.4s ease 0.4s forwards;
}
@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

/* Tailwind-config utility replacements used by this layout */
.font-display {
  font-family: 'Syne', 'Segoe UI', sans-serif;
}

.font-mono {
  font-family: 'Space Mono', 'JetBrains Mono', monospace;
}

.font-800 {
  font-weight: 800;
}

.text-nova-bg {
  color: #080b12;
}

.text-nova-text {
  color: #e2e8f0;
}

.text-nova-dim {
  color: #8896aa;
}

.text-nova-muted {
  color: #4a5568;
}

.text-nova-accent {
  color: #00f5c4;
}

.text-nova-accent2 {
  color: #7b5cfa;
}

.text-nova-accent3 {
  color: #f5a623;
}

.text-nova-red {
  color: #ff4560;
}

.bg-nova-bg {
  background: #080b12;
}

.bg-nova-card {
  background: #0e1420;
}

.bg-nova-card\/50 {
  background: rgba(14, 20, 32, 0.5);
}

.bg-nova-accent {
  background: #00f5c4;
}

.bg-nova-accent\/10 {
  background: rgba(0, 245, 196, 0.1);
}

.bg-nova-accent\/8 {
  background: rgba(0, 245, 196, 0.08);
}

.bg-nova-accent2 {
  background: #7b5cfa;
}

.bg-nova-accent2\/10 {
  background: rgba(123, 92, 250, 0.1);
}

.bg-nova-accent2\/8 {
  background: rgba(123, 92, 250, 0.08);
}

.bg-nova-accent3 {
  background: #f5a623;
}

.bg-nova-accent3\/10 {
  background: rgba(245, 166, 35, 0.1);
}

.bg-nova-accent3\/8 {
  background: rgba(245, 166, 35, 0.08);
}

.bg-nova-red {
  background: #ff4560;
}

.bg-nova-red\/10 {
  background: rgba(255, 69, 96, 0.1);
}

.bg-nova-muted {
  background: #4a5568;
}

.border-nova-border {
  border-color: #1a2235;
}

.border-nova-accent\/15 {
  border-color: rgba(0, 245, 196, 0.15);
}

.border-nova-accent2\/15 {
  border-color: rgba(123, 92, 250, 0.15);
}

.border-nova-accent3\/15 {
  border-color: rgba(245, 166, 35, 0.15);
}

.shadow-glow-accent {
  box-shadow: 0 0 24px rgba(0, 245, 196, 0.18);
}

.shadow-glow-purple {
  box-shadow: 0 0 24px rgba(123, 92, 250, 0.18);
}

.shadow-glow-red {
  box-shadow: 0 0 16px rgba(255, 69, 96, 0.18);
}

.animate-ticker {
  animation: ticker 24s linear infinite;
}

.from-nova-accent2 {
  --tw-gradient-from: #7b5cfa var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(123 92 250 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-nova-accent {
  --tw-gradient-to: #00f5c4 var(--tw-gradient-to-position);
}

.hover\:text-nova-text:hover {
  color: #e2e8f0;
}

.hover\:text-nova-red:hover {
  color: #ff4560;
}

.hover\:bg-nova-accent\/85:hover {
  background: rgba(0, 245, 196, 0.85);
}

.hover\:border-nova-accent\/40:hover {
  border-color: rgba(0, 245, 196, 0.4);
}

.hover\:border-nova-red\/50:hover {
  border-color: rgba(255, 69, 96, 0.5);
}

.focus-within\:border-nova-accent\/50:focus-within {
  border-color: rgba(0, 245, 196, 0.5);
}

@media (max-width: 1279px) {
  .desktop-sidebar {
    display: none;
  }
}
</style>
