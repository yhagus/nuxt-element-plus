<template>
  <div class="tencent-cloud-layout bg-tc-bg text-tc-text text-sm">
    <!-- Layout Wrapper -->
    <div class="flex min-h-screen overflow-hidden">
      <!-- ── SIDEBAR ── -->
      <aside class="desktop-sidebar w-52 flex-shrink-0 bg-tc-sidebar flex flex-col overflow-y-auto">
        <!-- Logo -->
        <div class="flex items-center gap-2 px-4 py-4 border-b border-white/10">
          <div class="w-7 h-7 rounded flex items-center justify-center" style="background:#0052d9">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <span class="text-white font-semibold text-sm tracking-tight">Tencent Cloud</span>
        </div>

        <!-- User info -->
        <div class="px-4 py-3 border-b border-white/10 flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-tc-blue flex items-center justify-center text-white text-xs font-semibold">
            JD
          </div>
          <div>
            <div class="text-white text-xs font-medium">
              john_dev
            </div>
            <div class="text-tc-muted text-xs">
              Enterprise
            </div>
          </div>
          <svg class="ml-auto w-3 h-3 text-tc-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 py-2">
          <div class="menu-group-title">
            Overview
          </div>
          <a href="#" class="sidebar-item active flex items-center gap-2.5 px-4 py-2 text-white text-xs">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="2" /><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="2" /><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="2" /><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="2" /></svg>
            Overview
          </a>

          <div class="menu-group-title">
            Compute
          </div>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" stroke-width="2" /><path d="M6 12h12M12 9v6" stroke-width="2" stroke-linecap="round" /></svg>
            Cloud Virtual Machine
          </a>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="2" /><path d="M12 7v5l3 3" stroke-width="2" stroke-linecap="round" /></svg>
            Tencent Kubernetes Engine
          </a>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke-width="2" stroke-linecap="round" /></svg>
            Serverless Cloud Function
          </a>

          <div class="menu-group-title">
            Storage
          </div>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" stroke-width="2" /><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke-width="2" /><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke-width="2" /></svg>
            Cloud Object Storage
          </a>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" stroke-width="2" /><path d="M7 8h10M7 12h6" stroke-width="2" stroke-linecap="round" /></svg>
            Cloud Block Storage
          </a>

          <div class="menu-group-title">
            Database
          </div>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3" stroke-width="2" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke-width="2" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke-width="2" /></svg>
            TencentDB for MySQL
          </a>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke-width="2" /><path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round" /></svg>
            TDSQL-C Serverless
          </a>

          <div class="menu-group-title">
            Networking
          </div>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            Virtual Private Cloud
          </a>
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" stroke-width="2" stroke-linecap="round" /></svg>
            Cloud Load Balancer
          </a>
        </nav>

        <!-- Bottom -->
        <div class="border-t border-white/10 py-2">
          <a href="#" class="sidebar-item flex items-center gap-2.5 px-4 py-2 text-gray-400 text-xs hover:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke-width="2" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke-width="2" /></svg>
            Settings
          </a>
        </div>
      </aside>

      <!-- ── MAIN CONTENT ── -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Navigation Bar -->
        <header class="bg-white border-b border-tc-border flex flex-wrap items-center gap-3 px-4 py-2 md:h-12 md:px-5">
          <!-- Breadcrumb -->
          <div class="hidden items-center gap-1 text-xs text-tc-muted md:flex">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke-width="2" /></svg>
            <span>/</span>
            <span class="text-tc-text font-medium">Overview</span>
          </div>

          <!-- Region selector -->
          <div class="hidden items-center gap-1.5 px-2.5 py-1 border border-tc-border rounded cursor-pointer hover:border-tc-blue text-xs lg:flex">
            <span class="w-1.5 h-1.5 rounded-full bg-tc-green" />
            <span>Guangzhou</span>
            <svg class="w-3 h-3 text-tc-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </div>

          <!-- Search -->
          <div class="w-full flex-1 md:max-w-xs">
            <div class="flex items-center gap-2 top-bar-search rounded px-3 py-1.5">
              <svg class="w-3.5 h-3.5 text-tc-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke-width="2" /><path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round" /></svg>
              <input class="bg-transparent text-xs flex-1 text-tc-text placeholder-tc-muted focus:outline-none top-bar-search" style="border:none;background:transparent" placeholder="Search products, docs, resources...">
            </div>
          </div>

          <!-- Right Actions -->
          <div class="ml-auto flex items-center gap-3">
            <!-- Notification -->
            <button class="relative p-1.5 rounded hover:bg-gray-100">
              <svg class="w-4 h-4 text-tc-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke-width="2" stroke-linecap="round" /></svg>
              <span class="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-tc-red" />
            </button>
            <!-- Help -->
            <button class="p-1.5 rounded hover:bg-gray-100">
              <svg class="w-4 h-4 text-tc-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" stroke-width="2" stroke-linecap="round" /></svg>
            </button>
            <!-- Avatar -->
            <div class="w-7 h-7 rounded-full bg-tc-blue flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
              JD
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-5 space-y-4">
          <!-- Page Title & Tabs -->
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-lg font-semibold text-tc-text">
                Overview
              </h1>
              <p class="text-tc-muted text-xs mt-0.5">
                Account: 100023891076 · Last refreshed 2 min ago
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button class="px-3 py-1.5 text-xs font-medium text-white rounded" style="background:#0052d9">
                + New Resource
              </button>
              <button class="px-3 py-1.5 text-xs font-medium text-tc-text border border-tc-border rounded hover:border-tc-blue hover:text-tc-blue">
                Customize
              </button>
            </div>
          </div>

          <!-- Alert Banner -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2.5 flex items-center gap-3">
            <svg class="w-4 h-4 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
            <span class="text-xs text-yellow-700">3 resources are expiring within 7 days. <a href="#" class="text-tc-blue font-medium underline">Renew now →</a></span>
            <button class="ml-auto text-yellow-400 hover:text-yellow-600">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- ── TOP STAT CARDS ── -->
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <!-- Account Balance -->
            <div class="card bg-white rounded-lg border border-tc-border p-4">
              <div class="flex items-center justify-between mb-3">
                <span class="text-tc-muted text-xs">Account Balance</span>
                <div class="service-icon" style="background:#e8f0fe">
                  <svg class="w-4 h-4" style="color:#0052d9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" stroke-width="2" /><path d="M2 10h20" stroke-width="2" /></svg>
                </div>
              </div>
              <div class="text-2xl font-semibold text-tc-text">
                ¥4,281.50
              </div>
              <div class="mt-1 flex items-center gap-3 text-xs text-tc-muted">
                <span>Vouchers: ¥200.00</span>
                <span>Frozen: ¥0</span>
              </div>
              <div class="mt-3 flex gap-2">
                <a href="#" class="text-xs text-tc-blue hover:underline">Top Up</a>
                <a href="#" class="text-xs text-tc-blue hover:underline">Details</a>
              </div>
            </div>

            <!-- Monthly Bill -->
            <div class="card bg-white rounded-lg border border-tc-border p-4">
              <div class="flex items-center justify-between mb-3">
                <span class="text-tc-muted text-xs">This Month's Bill</span>
                <div class="service-icon" style="background:#fff7e8">
                  <svg class="w-4 h-4" style="color:#ff7d00" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-3M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </div>
              </div>
              <div class="text-2xl font-semibold text-tc-text">
                ¥1,842.30
              </div>
              <div class="mt-1 text-xs flex items-center gap-1">
                <span class="stat-up">▲ 12.4%</span>
                <span class="text-tc-muted">vs last month</span>
              </div>
              <div class="mt-3 flex gap-2">
                <a href="#" class="text-xs text-tc-blue hover:underline">Bill Details</a>
                <a href="#" class="text-xs text-tc-blue hover:underline">Cost Analysis</a>
              </div>
            </div>

            <!-- Security Score -->
            <div class="card bg-white rounded-lg border border-tc-border p-4">
              <div class="flex items-center justify-between mb-3">
                <span class="text-tc-muted text-xs">Security Score</span>
                <div class="service-icon" style="background:#e8ffec">
                  <svg class="w-4 h-4" style="color:#00b42a" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="2" /></svg>
                </div>
              </div>
              <div class="flex items-end gap-2">
                <div class="text-2xl font-semibold" style="color:#00b42a">
                  86
                </div>
                <div class="text-tc-muted text-xs mb-1">
                  / 100 · Good
                </div>
              </div>
              <div class="progress-bar mt-2">
                <div class="progress-fill" style="width:86%;background:#00b42a" />
              </div>
              <div class="mt-3">
                <a href="#" class="text-xs text-tc-blue hover:underline">View Risks (3)</a>
              </div>
            </div>

            <!-- Tickets -->
            <div class="card bg-white rounded-lg border border-tc-border p-4">
              <div class="flex items-center justify-between mb-3">
                <span class="text-tc-muted text-xs">Support Tickets</span>
                <div class="service-icon" style="background:#ffece8">
                  <svg class="w-4 h-4" style="color:#f53f3f" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke-width="2" /></svg>
                </div>
              </div>
              <div class="text-2xl font-semibold text-tc-text">
                2
              </div>
              <div class="mt-1 text-xs text-tc-muted">
                1 pending · 1 in progress
              </div>
              <div class="mt-3 flex gap-2">
                <a href="#" class="text-xs text-tc-blue hover:underline">View Tickets</a>
                <a href="#" class="text-xs text-tc-blue hover:underline">New Ticket</a>
              </div>
            </div>
          </div>

          <!-- ── RESOURCE OVERVIEW ── -->
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <!-- Resource Summary -->
            <div class="card bg-white rounded-lg border border-tc-border p-4 xl:col-span-3">
              <div class="flex items-center justify-between mb-4">
                <span class="font-medium text-sm">My Resources</span>
                <a href="#" class="text-xs text-tc-blue hover:underline">All Resources →</a>
              </div>
              <div class="space-y-1">
                <!-- CVM -->
                <div class="resource-row flex items-center gap-3 px-2 py-2 rounded cursor-pointer">
                  <div class="service-icon w-8 h-8 rounded-md flex items-center justify-center" style="background:#e8f0fe;font-size:13px">
                    ☁️
                  </div>
                  <div class="flex-1">
                    <div class="text-xs font-medium">
                      Cloud Virtual Machine
                    </div>
                    <div class="text-xs text-tc-muted">
                      12 instances
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-tc-green animate-pulse-dot" />
                    <span class="text-xs text-tc-muted">10 running</span>
                  </div>
                </div>
                <!-- TKE -->
                <div class="resource-row flex items-center gap-3 px-2 py-2 rounded cursor-pointer">
                  <div class="service-icon w-8 h-8 rounded-md flex items-center justify-center" style="background:#e8f0fe;font-size:13px">
                    🐳
                  </div>
                  <div class="flex-1">
                    <div class="text-xs font-medium">
                      Kubernetes Engine
                    </div>
                    <div class="text-xs text-tc-muted">
                      3 clusters
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-tc-green" />
                    <span class="text-xs text-tc-muted">All healthy</span>
                  </div>
                </div>
                <!-- COS -->
                <div class="resource-row flex items-center gap-3 px-2 py-2 rounded cursor-pointer">
                  <div class="service-icon w-8 h-8 rounded-md flex items-center justify-center" style="background:#fff7e8;font-size:13px">
                    🗄️
                  </div>
                  <div class="flex-1">
                    <div class="text-xs font-medium">
                      Object Storage
                    </div>
                    <div class="text-xs text-tc-muted">
                      8 buckets · 1.4 TB
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-tc-green" />
                    <span class="text-xs text-tc-muted">Active</span>
                  </div>
                </div>
                <!-- MySQL -->
                <div class="resource-row flex items-center gap-3 px-2 py-2 rounded cursor-pointer">
                  <div class="service-icon w-8 h-8 rounded-md flex items-center justify-center" style="background:#e8ffec;font-size:13px">
                    🗃️
                  </div>
                  <div class="flex-1">
                    <div class="text-xs font-medium">
                      TencentDB MySQL
                    </div>
                    <div class="text-xs text-tc-muted">
                      5 instances
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-tc-yellow" />
                    <span class="text-xs text-tc-muted">1 warning</span>
                  </div>
                </div>
                <!-- CLB -->
                <div class="resource-row flex items-center gap-3 px-2 py-2 rounded cursor-pointer">
                  <div class="service-icon w-8 h-8 rounded-md flex items-center justify-center" style="background:#f5f0ff;font-size:13px">
                    ⚖️
                  </div>
                  <div class="flex-1">
                    <div class="text-xs font-medium">
                      Cloud Load Balancer
                    </div>
                    <div class="text-xs text-tc-muted">
                      4 load balancers
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-tc-green" />
                    <span class="text-xs text-tc-muted">All active</span>
                  </div>
                </div>
                <!-- SCF -->
                <div class="resource-row flex items-center gap-3 px-2 py-2 rounded cursor-pointer">
                  <div class="service-icon w-8 h-8 rounded-md flex items-center justify-center" style="background:#ffece8;font-size:13px">
                    ⚡
                  </div>
                  <div class="flex-1">
                    <div class="text-xs font-medium">
                      Serverless Functions
                    </div>
                    <div class="text-xs text-tc-muted">
                      24 functions
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-tc-green" />
                    <span class="text-xs text-tc-muted">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── CVM USAGE + ALERTS ── -->
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <!-- CVM Resource Usage -->
            <div class="card bg-white rounded-lg border border-tc-border p-4 xl:col-span-2">
              <div class="flex items-center justify-between mb-4">
                <span class="font-medium text-sm">CVM Instance Usage</span>
                <div class="flex items-center gap-2">
                  <select class="text-xs border border-tc-border rounded px-2 py-1 text-tc-text focus:outline-none focus:border-tc-blue">
                    <option>Guangzhou</option>
                    <option>Shanghai</option>
                    <option>Beijing</option>
                  </select>
                  <a href="#" class="text-xs text-tc-blue hover:underline">View All</a>
                </div>
              </div>

              <!-- Table Header -->
              <div class="grid text-xs text-tc-muted font-medium pb-2 border-b border-tc-border" style="grid-template-columns:2fr 1fr 1fr 1fr 1fr">
                <span>Instance</span>
                <span>Status</span>
                <span>CPU</span>
                <span>Memory</span>
                <span>Bandwidth</span>
              </div>

              <!-- Rows -->
              <div class="space-y-0.5 mt-1">
                <!-- Row 1 -->
                <div class="resource-row grid items-center py-2.5 text-xs rounded px-1" style="grid-template-columns:2fr 1fr 1fr 1fr 1fr">
                  <div>
                    <div class="font-medium text-tc-text">
                      ins-prod-web-01
                    </div>
                    <div class="text-tc-muted">
                      S6.4XLARGE32 · 16C/32G
                    </div>
                  </div>
                  <div><span class="badge-success px-2 py-0.5 rounded text-xs font-medium">Running</span></div>
                  <div>
                    <div class="text-tc-text mb-1">
                      72%
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:72%;background:#ff7d00" />
                    </div>
                  </div>
                  <div>
                    <div class="text-tc-text mb-1">
                      45%
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:45%;background:#0052d9" />
                    </div>
                  </div>
                  <div class="text-tc-text">
                    312 Mbps
                  </div>
                </div>
                <!-- Row 2 -->
                <div class="resource-row grid items-center py-2.5 text-xs rounded px-1" style="grid-template-columns:2fr 1fr 1fr 1fr 1fr">
                  <div>
                    <div class="font-medium text-tc-text">
                      ins-prod-api-01
                    </div>
                    <div class="text-tc-muted">
                      S6.2XLARGE16 · 8C/16G
                    </div>
                  </div>
                  <div><span class="badge-success px-2 py-0.5 rounded text-xs font-medium">Running</span></div>
                  <div>
                    <div class="text-tc-text mb-1">
                      38%
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:38%;background:#00b42a" />
                    </div>
                  </div>
                  <div>
                    <div class="text-tc-text mb-1">
                      61%
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:61%;background:#0052d9" />
                    </div>
                  </div>
                  <div class="text-tc-text">
                    87 Mbps
                  </div>
                </div>
                <!-- Row 3 -->
                <div class="resource-row grid items-center py-2.5 text-xs rounded px-1" style="grid-template-columns:2fr 1fr 1fr 1fr 1fr">
                  <div>
                    <div class="font-medium text-tc-text">
                      ins-prod-db-proxy
                    </div>
                    <div class="text-tc-muted">
                      S6.LARGE8 · 4C/8G
                    </div>
                  </div>
                  <div><span class="badge-warning px-2 py-0.5 rounded text-xs font-medium">Warning</span></div>
                  <div>
                    <div class="text-tc-text mb-1 stat-up font-medium">
                      91%
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:91%;background:#f53f3f" />
                    </div>
                  </div>
                  <div>
                    <div class="text-tc-text mb-1">
                      78%
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:78%;background:#ff7d00" />
                    </div>
                  </div>
                  <div class="text-tc-text">
                    44 Mbps
                  </div>
                </div>
                <!-- Row 4 -->
                <div class="resource-row grid items-center py-2.5 text-xs rounded px-1" style="grid-template-columns:2fr 1fr 1fr 1fr 1fr">
                  <div>
                    <div class="font-medium text-tc-text">
                      ins-stg-worker-01
                    </div>
                    <div class="text-tc-muted">
                      S6.MEDIUM4 · 2C/4G
                    </div>
                  </div>
                  <div><span class="badge-info px-2 py-0.5 rounded text-xs font-medium">Stopped</span></div>
                  <div>
                    <div class="text-tc-text mb-1">
                      0%
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:0%;background:#0052d9" />
                    </div>
                  </div>
                  <div>
                    <div class="text-tc-text mb-1">
                      0%
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:0%;background:#0052d9" />
                    </div>
                  </div>
                  <div class="text-tc-text">
                    0 Mbps
                  </div>
                </div>
              </div>
            </div>

            <!-- Alerts Panel -->
            <div class="card bg-white rounded-lg border border-tc-border p-4 xl:col-span-1">
              <div class="flex items-center justify-between mb-4">
                <span class="font-medium text-sm">Recent Alerts</span>
                <a href="#" class="text-xs text-tc-blue hover:underline">View All (14)</a>
              </div>
              <div class="space-y-2.5">
                <div class="alert-item border-tc-red bg-red-50 rounded-r px-3 py-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-tc-red">Critical</span>
                    <span class="text-xs text-tc-muted">12:31</span>
                  </div>
                  <div class="text-xs text-tc-text mt-0.5">
                    CPU usage exceeded 90% on <span class="font-medium">ins-prod-db-proxy</span>
                  </div>
                  <div class="text-xs text-tc-muted mt-1">
                    Cloud Monitor · 2 min ago
                  </div>
                </div>

                <div class="alert-item border-tc-orange bg-orange-50 rounded-r px-3 py-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-tc-orange">Warning</span>
                    <span class="text-xs text-tc-muted">11:58</span>
                  </div>
                  <div class="text-xs text-tc-text mt-0.5">
                    MySQL slow query rate above threshold
                  </div>
                  <div class="text-xs text-tc-muted mt-1">
                    DB Monitor · 35 min ago
                  </div>
                </div>

                <div class="alert-item border-tc-yellow bg-yellow-50 rounded-r px-3 py-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-yellow-600">Notice</span>
                    <span class="text-xs text-tc-muted">10:12</span>
                  </div>
                  <div class="text-xs text-tc-text mt-0.5">
                    CVM instance <span class="font-medium">ins-prod-web-01</span> auto-scaled to 4 pods
                  </div>
                  <div class="text-xs text-tc-muted mt-1">
                    Auto Scaling · 2h ago
                  </div>
                </div>

                <div class="alert-item border-tc-green bg-green-50 rounded-r px-3 py-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-tc-green">Resolved</span>
                    <span class="text-xs text-tc-muted">09:44</span>
                  </div>
                  <div class="text-xs text-tc-text mt-0.5">
                    Network latency spike resolved in Guangzhou
                  </div>
                  <div class="text-xs text-tc-muted mt-1">
                    Cloud Monitor · 3h ago
                  </div>
                </div>

                <div class="alert-item border-tc-blue bg-blue-50 rounded-r px-3 py-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-medium text-tc-blue">Info</span>
                    <span class="text-xs text-tc-muted">08:20</span>
                  </div>
                  <div class="text-xs text-tc-text mt-0.5">
                    SSL certificate for api.prod.com renewed successfully
                  </div>
                  <div class="text-xs text-tc-muted mt-1">
                    SSL Cert. Manager · 4h ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── BOTTOM ROW ── -->
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <!-- Quick Launch -->
            <div class="card bg-white rounded-lg border border-tc-border p-4">
              <div class="flex items-center justify-between mb-4">
                <span class="font-medium text-sm">Quick Launch</span>
              </div>
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <button class="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-tc-border hover:border-tc-blue hover:bg-blue-50 transition-all">
                  <span class="text-lg">☁️</span>
                  <span class="text-xs text-tc-text text-center leading-tight">Cloud VM</span>
                </button>
                <button class="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-tc-border hover:border-tc-blue hover:bg-blue-50 transition-all">
                  <span class="text-lg">🐳</span>
                  <span class="text-xs text-tc-text text-center leading-tight">TKE Cluster</span>
                </button>
                <button class="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-tc-border hover:border-tc-blue hover:bg-blue-50 transition-all">
                  <span class="text-lg">🗄️</span>
                  <span class="text-xs text-tc-text text-center leading-tight">Object Storage</span>
                </button>
                <button class="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-tc-border hover:border-tc-blue hover:bg-blue-50 transition-all">
                  <span class="text-lg">🗃️</span>
                  <span class="text-xs text-tc-text text-center leading-tight">MySQL DB</span>
                </button>
                <button class="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-tc-border hover:border-tc-blue hover:bg-blue-50 transition-all">
                  <span class="text-lg">⚡</span>
                  <span class="text-xs text-tc-text text-center leading-tight">Function</span>
                </button>
                <button class="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-tc-border hover:border-tc-blue hover:bg-blue-50 transition-all">
                  <span class="text-lg">🌐</span>
                  <span class="text-xs text-tc-text text-center leading-tight">CDN</span>
                </button>
              </div>
              <button class="mt-3 w-full py-2 text-xs text-tc-blue border border-tc-blue rounded hover:bg-blue-50 transition-all">
                Browse All Products →
              </button>
            </div>

            <!-- Activity Log -->
            <div class="card bg-white rounded-lg border border-tc-border p-4">
              <div class="flex items-center justify-between mb-4">
                <span class="font-medium text-sm">Operation Log</span>
                <a href="#" class="text-xs text-tc-blue hover:underline">View All</a>
              </div>
              <div class="space-y-3">
                <div class="flex gap-2.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-tc-green mt-1.5 flex-shrink-0" />
                  <div>
                    <div class="text-xs font-medium">
                      CreateInstance
                    </div>
                    <div class="text-xs text-tc-muted">
                      ins-prod-web-02 created · Guangzhou · sub-user-api
                    </div>
                    <div class="text-xs text-tc-muted mt-0.5">
                      Today 13:42
                    </div>
                  </div>
                </div>
                <div class="flex gap-2.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-tc-blue mt-1.5 flex-shrink-0" />
                  <div>
                    <div class="text-xs font-medium">
                      ModifySecurityGroup
                    </div>
                    <div class="text-xs text-tc-muted">
                      Added rule: Allow TCP 443 from 0.0.0.0/0
                    </div>
                    <div class="text-xs text-tc-muted mt-0.5">
                      Today 11:05
                    </div>
                  </div>
                </div>
                <div class="flex gap-2.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-tc-orange mt-1.5 flex-shrink-0" />
                  <div>
                    <div class="text-xs font-medium">
                      ResizeInstance
                    </div>
                    <div class="text-xs text-tc-muted">
                      ins-prod-db-proxy: 2C4G → 4C8G
                    </div>
                    <div class="text-xs text-tc-muted mt-0.5">
                      Today 09:18
                    </div>
                  </div>
                </div>
                <div class="flex gap-2.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-tc-muted mt-1.5 flex-shrink-0" />
                  <div>
                    <div class="text-xs font-medium">
                      DeleteBucket
                    </div>
                    <div class="text-xs text-tc-muted">
                      bucket-test-legacy-eu deleted
                    </div>
                    <div class="text-xs text-tc-muted mt-0.5">
                      Yesterday 18:33
                    </div>
                  </div>
                </div>
                <div class="flex gap-2.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-tc-green mt-1.5 flex-shrink-0" />
                  <div>
                    <div class="text-xs font-medium">
                      RenewInstance
                    </div>
                    <div class="text-xs text-tc-muted">
                      ins-prod-web-01 renewed for 1 year
                    </div>
                    <div class="text-xs text-tc-muted mt-0.5">
                      Yesterday 14:02
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section class="card rounded-lg border border-tc-border bg-white p-4">
            <slot />
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tencent-cloud-layout {
  font-family: 'IBM Plex Sans', 'Noto Sans', sans-serif;
}

.tencent-cloud-layout * {
  box-sizing: border-box;
}

.tencent-cloud-layout ::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.tencent-cloud-layout ::-webkit-scrollbar-track {
  background: transparent;
}

.tencent-cloud-layout ::-webkit-scrollbar-thumb {
  background: #c9cdd4;
  border-radius: 4px;
}

.sidebar-item {
  transition: background 0.15s ease;
}

.sidebar-item:hover {
  background: #263047;
}

.sidebar-item.active {
  background: #0052d9;
}

.card {
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.stat-up {
  color: #00b42a;
}

.stat-down {
  color: #f53f3f;
}

.badge-success {
  background: #e8ffec;
  color: #00b42a;
}

.badge-warning {
  background: #fff7e8;
  color: #ff7d00;
}

.badge-error {
  background: #ffece8;
  color: #f53f3f;
}

.badge-info {
  background: #e8f0fe;
  color: #0052d9;
}

.progress-bar {
  height: 6px;
  border-radius: 3px;
  background: #e5e6eb;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.top-bar-search {
  background: #f2f3f5;
  border: 1px solid #e5e6eb;
}

.top-bar-search:focus {
  outline: none;
  border-color: #0052d9;
  background: #fff;
}

.service-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.animate-pulse-dot {
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

.resource-row:hover {
  background: #f7f8fa;
}

.alert-item {
  border-left: 3px solid;
}

.menu-group-title {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #86909c;
  padding: 12px 16px 4px;
}

.bg-tc-bg {
  background: #f2f3f5;
}

.bg-tc-sidebar {
  background: #1c2333;
}

.bg-tc-blue {
  background: #0052d9;
}

.bg-tc-green {
  background: #00b42a;
}

.bg-tc-red {
  background: #f53f3f;
}

.bg-tc-yellow {
  background: #ffb400;
}

.bg-tc-orange {
  background: #ff7d00;
}

.bg-tc-muted {
  background: #86909c;
}

.text-tc-text {
  color: #1d2129;
}

.text-tc-muted {
  color: #86909c;
}

.text-tc-blue {
  color: #0052d9;
}

.text-tc-green {
  color: #00b42a;
}

.text-tc-red {
  color: #f53f3f;
}

.text-tc-orange {
  color: #ff7d00;
}

.border-tc-border {
  border-color: #dbe0e8;
}

.border-tc-red {
  border-color: #f53f3f;
}

.border-tc-orange {
  border-color: #ff7d00;
}

.border-tc-yellow {
  border-color: #ffb400;
}

.border-tc-green {
  border-color: #00b42a;
}

.border-tc-blue {
  border-color: #0052d9;
}

.hover\:border-tc-blue:hover {
  border-color: #0052d9;
}

.hover\:text-tc-blue:hover {
  color: #0052d9;
}

.focus\:border-tc-blue:focus {
  border-color: #0052d9;
}

@media (max-width: 1279px) {
  .desktop-sidebar {
    display: none;
  }
}
</style>
