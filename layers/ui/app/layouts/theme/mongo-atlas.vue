<template>
  <div class="mongo-atlas-layout flex min-h-screen overflow-hidden text-[#0D2B20]">
    <!-- ═══════════════════════════════════ SIDEBAR ═══════════════════════════════════ -->
    <aside class="desktop-sidebar sidebar flex flex-col h-full overflow-y-auto flex-shrink-0">
      <!-- Logo -->
      <div class="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <path d="M16 3C16 3 8 10.5 8 19a8 8 0 0016 0C24 10.5 16 3 16 3z" fill="#00C48C" />
          <line x1="16" y1="5" x2="16" y2="29" stroke="#003D2B" stroke-width="1.8" stroke-linecap="round" />
        </svg>
        <span class="text-white font-bold text-[15px] tracking-tight">Atlas</span>
        <span class="ml-auto text-[10px] font-mono text-[#3d7060] border border-white/10 px-2 py-0.5 rounded">M10</span>
      </div>

      <!-- Org / Project -->
      <div class="px-3 py-3 border-b border-white/10">
        <div class="flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-white/6 transition-colors">
          <div class="w-7 h-7 rounded-md bg-[#00C48C]/20 flex items-center justify-center text-[10px] font-bold text-[#00C48C]">
            AC
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[10px] text-[#3d7060] uppercase tracking-wider font-bold">
              Organization
            </div>
            <div class="text-[13px] text-white font-medium truncate">
              Acme Corp
            </div>
          </div>
          <svg width="13" height="13" fill="none" stroke="#3d7060" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
        </div>
        <div class="flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-white/6 transition-colors mt-0.5">
          <div class="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/80">
            PR
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[10px] text-[#3d7060] uppercase tracking-wider font-bold">
              Project
            </div>
            <div class="text-[13px] text-white font-medium truncate">
              Production
            </div>
          </div>
          <svg width="13" height="13" fill="none" stroke="#3d7060" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-2">
        <div class="nav-section">
          Clusters
        </div>
        <div class="nav-item active">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
          Overview
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" /></svg>
          Collections
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
          Metrics
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
          Profiler
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M2 12H4M20 12h2M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41" /></svg>
          Performance Advisor
        </div>

        <div class="nav-section">
          Security
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          Database Access
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          Network Access
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          Advanced
        </div>

        <div class="nav-section">
          Services
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>
          App Services
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
          Charts
        </div>
        <div class="nav-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>
          Data Federation
        </div>
      </nav>

      <!-- Bottom links -->
      <div class="px-3 py-3 border-t border-white/10">
        <div class="nav-item text-[12.5px]">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></svg>
          Help &amp; Support
        </div>
        <div class="nav-item text-[12.5px] mt-0.5">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><path d="M12 9v4m0 4h.01" /></svg>
          Alerts &amp; Activity
        </div>
      </div>
    </aside>

    <!-- ═══════════════════════════════════ MAIN ═══════════════════════════════════ -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top bar -->
      <header class="topbar flex flex-wrap items-center gap-3 px-4 py-2 md:h-[54px] md:flex-nowrap md:px-6 md:py-0 flex-shrink-0">
        <div class="flex min-w-0 items-center gap-1.5 overflow-x-auto text-sm whitespace-nowrap">
          <span class="text-[#5A8A74]">Atlas</span>
          <svg width="13" height="13" fill="none" stroke="#A8CFBF" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
          <span class="text-[#5A8A74]">Clusters</span>
          <svg width="13" height="13" fill="none" stroke="#A8CFBF" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
          <span class="font-semibold text-[#0D2B20]">Cluster0</span>
        </div>
        <div class="ml-0 flex w-full items-center gap-3 sm:ml-auto sm:w-auto">
          <div class="flex h-8 w-full items-center gap-2 rounded-lg border border-[#C0DFCF] bg-[#F0FAF5] px-3 text-[13px] text-[#5A8A74] sm:w-52">
            <svg width="13" height="13" fill="none" stroke="#5A8A74" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            Search…
          </div>
          <button class="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F0FAF5] transition">
            <svg width="16" height="16" fill="none" stroke="#5A8A74" stroke-width="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <div class="w-8 h-8 rounded-full bg-[#00875A] flex items-center justify-center text-white text-[12px] font-bold cursor-pointer">
            JD
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto px-6 py-5">
        <!-- Page title -->
        <div class="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-[20px] font-bold text-[#0D2B20] tracking-tight">
                Cluster0
              </h1>
              <div class="dot-green" />
              <span class="badge badge-green">Active</span>
              <span class="badge badge-gray font-mono text-[10px]">AWS / us-east-1</span>
            </div>
            <p class="text-[12.5px] text-[#5A8A74] mt-0.5">
              M10 · MongoDB 7.0.6 · 3-node Replica Set
            </p>
          </div>
          <div class="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            <button class="btn-outline flex items-center gap-1.5">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4zM8 4v16M16 4v16M4 8h16M4 16h16" /></svg>
              Browse Collections
            </button>
            <button class="btn-primary flex items-center gap-1.5">
              <svg width="13" height="13" fill="none" stroke="white" stroke-width="2.2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
              Connect
            </button>
          </div>
        </div>

        <!-- ── Metric tiles ── -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div class="metric-tile">
            <div class="metric-label mb-1.5">
              Connections
            </div>
            <div class="metric-value">
              142
            </div>
            <div class="flex items-center gap-2 mt-2">
              <div class="metric-delta-up flex items-center gap-0.5">
                <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>+12%
              </div>
              <span class="text-[11px] text-[#5A8A74]">vs last hour</span>
            </div>
            <svg viewBox="0 0 100 30" class="w-full mt-2" preserveAspectRatio="none" height="28">
              <path class="sparkline-area" d="M0,22 L8,18 L18,20 L28,14 L38,16 L50,10 L60,12 L72,8 L84,11 L100,6 L100,30 L0,30 Z" />
              <path class="sparkline-line" d="M0,22 L8,18 L18,20 L28,14 L38,16 L50,10 L60,12 L72,8 L84,11 L100,6" />
            </svg>
          </div>

          <div class="metric-tile">
            <div class="metric-label mb-1.5">
              Network In
            </div>
            <div class="metric-value">
              38<span class="text-[16px] font-normal text-[#5A8A74]"> MB/s</span>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <div class="metric-delta-up flex items-center gap-0.5">
                <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>+5%
              </div>
              <span class="text-[11px] text-[#5A8A74]">vs last hour</span>
            </div>
            <svg viewBox="0 0 100 30" class="w-full mt-2" preserveAspectRatio="none" height="28">
              <path class="sparkline-area-teal" d="M0,25 L14,22 L26,20 L36,22 L46,15 L58,17 L70,11 L82,13 L92,9 L100,10 L100,30 L0,30 Z" />
              <path class="sparkline-line-teal" d="M0,25 L14,22 L26,20 L36,22 L46,15 L58,17 L70,11 L82,13 L92,9 L100,10" />
            </svg>
          </div>

          <div class="metric-tile">
            <div class="metric-label mb-1.5">
              Opcounters / s
            </div>
            <div class="metric-value">
              8.4<span class="text-[16px] font-normal text-[#5A8A74]">k</span>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <div class="metric-delta-down flex items-center gap-0.5">
                <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>-3%
              </div>
              <span class="text-[11px] text-[#5A8A74]">vs last hour</span>
            </div>
            <svg viewBox="0 0 100 30" class="w-full mt-2" preserveAspectRatio="none" height="28">
              <path class="sparkline-area" d="M0,10 L12,14 L24,10 L34,16 L48,13 L58,18 L70,14 L80,18 L92,15 L100,17 L100,30 L0,30 Z" />
              <path class="sparkline-line" d="M0,10 L12,14 L24,10 L34,16 L48,13 L58,18 L70,14 L80,18 L92,15 L100,17" />
            </svg>
          </div>

          <div class="metric-tile">
            <div class="metric-label mb-1.5">
              Disk Usage
            </div>
            <div class="metric-value">
              62<span class="text-[16px] font-normal text-[#5A8A74]">%</span>
            </div>
            <div class="text-[11px] text-[#5A8A74] mt-2 mb-1.5">
              24.8 GB / 40 GB
            </div>
            <div class="progress-track">
              <div class="progress-fill bg-[#f5a623]" style="width:62%" />
            </div>
            <div class="text-[11px] text-[#C97B00] font-semibold mt-1.5">
              Approaching limit
            </div>
          </div>
        </div>

        <!-- ── Chart + Health ── -->
        <div class="grid grid-cols-1 gap-4 mb-5 xl:grid-cols-3">
          <!-- Ops bar chart -->
          <div class="card xl:col-span-2">
            <div class="card-header flex items-center justify-between px-5 py-3">
              <div class="flex items-center gap-3">
                <span class="font-semibold text-[14px] text-[#0D2B20]">Operations Over Time</span>
                <span class="badge badge-gray text-[10px] font-mono">Last 24 hours</span>
              </div>
              <div class="flex flex-wrap items-center gap-2 text-[12px] text-[#3D6B55] xl:justify-end">
                <span class="flex items-center gap-1.5"><span class="w-3 h-1.5 rounded inline-block bg-[#00875A]" />Insert</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-1.5 rounded inline-block bg-[#00C48C]" />Query</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-1.5 rounded inline-block bg-[#f5a623]" />Update</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-1.5 rounded inline-block bg-[#D93025]" />Delete</span>
                <button class="btn-outline text-[12px] px-2.5 py-1 flex items-center gap-1">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h6" /></svg>
                  Filter
                </button>
              </div>
            </div>
            <div class="px-5 py-4">
              <svg viewBox="0 0 580 170" xmlns="http://www.w3.org/2000/svg" class="w-full" height="170">
                <text x="0" y="12" font-size="9" fill="#8FBFA8" font-family="IBM Plex Mono">10k</text>
                <text x="0" y="52" font-size="9" fill="#8FBFA8" font-family="IBM Plex Mono">7.5k</text>
                <text x="0" y="92" font-size="9" fill="#8FBFA8" font-family="IBM Plex Mono">5k</text>
                <text x="0" y="132" font-size="9" fill="#8FBFA8" font-family="IBM Plex Mono">2.5k</text>
                <text x="0" y="165" font-size="9" fill="#8FBFA8" font-family="IBM Plex Mono">0</text>
                <line x1="28" y1="8" x2="580" y2="8" stroke="#E5F2EC" stroke-width="1" />
                <line x1="28" y1="48" x2="580" y2="48" stroke="#E5F2EC" stroke-width="1" />
                <line x1="28" y1="88" x2="580" y2="88" stroke="#E5F2EC" stroke-width="1" />
                <line x1="28" y1="128" x2="580" y2="128" stroke="#E5F2EC" stroke-width="1" />
                <line x1="28" y1="162" x2="580" y2="162" stroke="#C8DFCF" stroke-width="1" />

                <g transform="translate(34,0)">  <rect x="0" y="90" width="7" height="72" fill="#00875A" rx="1.5" /><rect x="9" y="80" width="7" height="82" fill="#00C48C" rx="1.5" /><rect x="18" y="130" width="7" height="32" fill="#f5a623" rx="1.5" /><rect x="27" y="150" width="7" height="12" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">00</text></g>
                <g transform="translate(80,0)">  <rect x="0" y="100" width="7" height="62" fill="#00875A" rx="1.5" /><rect x="9" y="95" width="7" height="67" fill="#00C48C" rx="1.5" /><rect x="18" y="135" width="7" height="27" fill="#f5a623" rx="1.5" /><rect x="27" y="155" width="7" height="7" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">02</text></g>
                <g transform="translate(126,0)"> <rect x="0" y="110" width="7" height="52" fill="#00875A" rx="1.5" /><rect x="9" y="115" width="7" height="47" fill="#00C48C" rx="1.5" /><rect x="18" y="140" width="7" height="22" fill="#f5a623" rx="1.5" /><rect x="27" y="157" width="7" height="5" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">04</text></g>
                <g transform="translate(172,0)"> <rect x="0" y="60" width="7" height="102" fill="#00875A" rx="1.5" /><rect x="9" y="50" width="7" height="112" fill="#00C48C" rx="1.5" /><rect x="18" y="115" width="7" height="47" fill="#f5a623" rx="1.5" /><rect x="27" y="148" width="7" height="14" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">08</text></g>
                <g transform="translate(218,0)"> <rect x="0" y="30" width="7" height="132" fill="#00875A" rx="1.5" /><rect x="9" y="25" width="7" height="137" fill="#00C48C" rx="1.5" /><rect x="18" y="95" width="7" height="67" fill="#f5a623" rx="1.5" /><rect x="27" y="138" width="7" height="24" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">10</text></g>
                <g transform="translate(264,0)"> <rect x="0" y="18" width="7" height="144" fill="#00875A" rx="1.5" /><rect x="9" y="12" width="7" height="150" fill="#00C48C" rx="1.5" /><rect x="18" y="82" width="7" height="80" fill="#f5a623" rx="1.5" /><rect x="27" y="130" width="7" height="32" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">12</text></g>
                <g transform="translate(310,0)"> <rect x="0" y="22" width="7" height="140" fill="#00875A" rx="1.5" /><rect x="9" y="18" width="7" height="144" fill="#00C48C" rx="1.5" /><rect x="18" y="85" width="7" height="77" fill="#f5a623" rx="1.5" /><rect x="27" y="132" width="7" height="30" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">14</text></g>
                <g transform="translate(356,0)"> <rect x="0" y="45" width="7" height="117" fill="#00875A" rx="1.5" /><rect x="9" y="40" width="7" height="122" fill="#00C48C" rx="1.5" /><rect x="18" y="100" width="7" height="62" fill="#f5a623" rx="1.5" /><rect x="27" y="140" width="7" height="22" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">16</text></g>
                <g transform="translate(402,0)"> <rect x="0" y="55" width="7" height="107" fill="#00875A" rx="1.5" /><rect x="9" y="60" width="7" height="102" fill="#00C48C" rx="1.5" /><rect x="18" y="110" width="7" height="52" fill="#f5a623" rx="1.5" /><rect x="27" y="145" width="7" height="17" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">18</text></g>
                <g transform="translate(448,0)"> <rect x="0" y="75" width="7" height="87" fill="#00875A" rx="1.5" /><rect x="9" y="72" width="7" height="90" fill="#00C48C" rx="1.5" /><rect x="18" y="120" width="7" height="42" fill="#f5a623" rx="1.5" /><rect x="27" y="147" width="7" height="15" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">20</text></g>
                <g transform="translate(494,0)"> <rect x="0" y="85" width="7" height="77" fill="#00875A" rx="1.5" /><rect x="9" y="82" width="7" height="80" fill="#00C48C" rx="1.5" /><rect x="18" y="128" width="7" height="34" fill="#f5a623" rx="1.5" /><rect x="27" y="149" width="7" height="13" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">22</text></g>
                <g transform="translate(536,0)"> <rect x="0" y="70" width="7" height="92" fill="#00875A" rx="1.5" /><rect x="9" y="65" width="7" height="97" fill="#00C48C" rx="1.5" /><rect x="18" y="115" width="7" height="47" fill="#f5a623" rx="1.5" /><rect x="27" y="142" width="7" height="20" fill="#D93025" rx="1.5" /><text x="17" y="175" font-size="8.5" fill="#8FBFA8" text-anchor="middle" font-family="IBM Plex Mono">Now</text></g>
              </svg>
            </div>
          </div>

          <!-- Cluster health -->
          <div class="card flex flex-col">
            <div class="card-header px-5 py-3">
              <span class="font-semibold text-[14px] text-[#0D2B20]">Cluster Health</span>
            </div>
            <div class="flex-1 px-5 py-4 flex flex-col gap-3">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[10.5px] font-bold text-[#5A8A74] uppercase tracking-wider">Primary</span>
                  <span class="badge badge-green">Healthy</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="dot-green" />
                  <span class="text-[13px] font-semibold text-[#0D2B20]">atlas-ue1-01</span>
                  <span class="ml-auto font-mono text-[11px] text-[#5A8A74]">us-east-1a</span>
                </div>
              </div>

              <div class="border-t border-[#E8F5EF] pt-3">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[10.5px] font-bold text-[#5A8A74] uppercase tracking-wider">Secondary</span>
                  <span class="badge badge-teal">Healthy</span>
                </div>
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2">
                    <div class="dot-teal" />
                    <span class="text-[13px] text-[#0D2B20]">atlas-ue1-02</span>
                    <span class="ml-auto font-mono text-[11px] text-[#5A8A74]">us-east-1b</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="dot-teal" />
                    <span class="text-[13px] text-[#0D2B20]">atlas-ue1-03</span>
                    <span class="ml-auto font-mono text-[11px] text-[#5A8A74]">us-east-1c</span>
                  </div>
                </div>
              </div>

              <div class="border-t border-[#E8F5EF] pt-3">
                <div class="text-[10.5px] font-bold text-[#5A8A74] uppercase tracking-wider mb-2">
                  Replication Lag
                </div>
                <div class="flex items-end gap-2">
                  <span class="font-mono text-[22px] font-medium text-[#0D2B20]">0.3</span>
                  <span class="text-[12px] text-[#5A8A74] mb-0.5">ms avg</span>
                </div>
                <div class="progress-track mt-1.5">
                  <div class="progress-fill bg-[#00C48C]" style="width:3%" />
                </div>
              </div>

              <div class="border-t border-[#E8F5EF] pt-3">
                <div class="text-[10.5px] font-bold text-[#5A8A74] uppercase tracking-wider mb-2">
                  Uptime
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-mono text-[22px] font-medium text-[#0D2B20]">99.98<span class="text-[13px]">%</span></span>
                  <span class="badge badge-green ml-auto">SLA Met</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Bottom row ── -->
        <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <!-- Collections table -->
          <div class="card xl:col-span-2">
            <div class="card-header flex items-center justify-between px-5 py-3">
              <span class="font-semibold text-[14px] text-[#0D2B20]">Top Collections</span>
              <button class="btn-outline text-[12px] px-2.5 py-1">
                View All
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="tbl w-full">
                <thead>
                  <tr>
                    <th class="text-left">
                      Namespace
                    </th>
                    <th class="text-right">
                      Documents
                    </th>
                    <th class="text-right">
                      Size
                    </th>
                    <th class="text-right">
                      Avg Doc Size
                    </th>
                    <th class="text-right">
                      Indexes
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="font-mono text-[12.5px] text-[#00875A] font-semibold">mydb.<b>orders</b></span></td>
                    <td class="text-right font-mono text-[12.5px]">
                      4,821,033
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      18.4 GB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      3.99 KB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      7
                    </td>
                    <td><span class="badge badge-green">Healthy</span></td>
                  </tr>
                  <tr>
                    <td><span class="font-mono text-[12.5px] text-[#00875A] font-semibold">mydb.<b>users</b></span></td>
                    <td class="text-right font-mono text-[12.5px]">
                      2,144,918
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      8.1 GB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      3.97 KB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      5
                    </td>
                    <td><span class="badge badge-green">Healthy</span></td>
                  </tr>
                  <tr>
                    <td><span class="font-mono text-[12.5px] text-[#00875A] font-semibold">analytics.<b>events</b></span></td>
                    <td class="text-right font-mono text-[12.5px]">
                      19,302,881
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      6.7 GB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      0.36 KB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      3
                    </td>
                    <td><span class="badge badge-yellow">Index Suggest</span></td>
                  </tr>
                  <tr>
                    <td><span class="font-mono text-[12.5px] text-[#00875A] font-semibold">mydb.<b>products</b></span></td>
                    <td class="text-right font-mono text-[12.5px]">
                      384,720
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      1.2 GB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      3.27 KB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      4
                    </td>
                    <td><span class="badge badge-green">Healthy</span></td>
                  </tr>
                  <tr>
                    <td><span class="font-mono text-[12.5px] text-[#00875A] font-semibold">logs.<b>auditTrail</b></span></td>
                    <td class="text-right font-mono text-[12.5px]">
                      8,940,223
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      2.9 GB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      0.34 KB
                    </td>
                    <td class="text-right font-mono text-[12.5px]">
                      2
                    </td>
                    <td><span class="badge badge-teal">TTL Active</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Alerts -->
          <div class="card flex flex-col">
            <div class="card-header flex items-center justify-between px-5 py-3">
              <span class="font-semibold text-[14px] text-[#0D2B20]">Alerts</span>
              <span class="badge badge-red">3 Open</span>
            </div>
            <div class="flex-1 divide-y divide-[#E8F5EF] overflow-y-auto">
              <div class="px-5 py-3.5 hover:bg-[#F7FCF9] cursor-pointer transition-colors">
                <div class="flex items-start gap-2.5">
                  <div class="dot-red mt-1 flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="text-[13px] font-semibold text-[#0D2B20]">
                      Disk usage ≥ 60%
                    </div>
                    <div class="text-[11.5px] text-[#5A8A74] mt-0.5">
                      Cluster0 · us-east-1
                    </div>
                    <div class="text-[11px] text-[#D93025] mt-1 font-semibold">
                      Critical · 12 min ago
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-5 py-3.5 hover:bg-[#F7FCF9] cursor-pointer transition-colors">
                <div class="flex items-start gap-2.5">
                  <div class="dot-yellow mt-1 flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="text-[13px] font-semibold text-[#0D2B20]">
                      Connection spike detected
                    </div>
                    <div class="text-[11.5px] text-[#5A8A74] mt-0.5">
                      Cluster0 · Primary
                    </div>
                    <div class="text-[11px] text-[#C97B00] mt-1 font-semibold">
                      Warning · 34 min ago
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-5 py-3.5 hover:bg-[#F7FCF9] cursor-pointer transition-colors">
                <div class="flex items-start gap-2.5">
                  <div class="dot-yellow mt-1 flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="text-[13px] font-semibold text-[#0D2B20]">
                      Slow query &gt;100ms
                    </div>
                    <div class="text-[11.5px] text-[#5A8A74] mt-0.5">
                      analytics.events · find()
                    </div>
                    <div class="text-[11px] text-[#C97B00] mt-1 font-semibold">
                      Warning · 1 hr ago
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-5 py-3.5 hover:bg-[#F7FCF9] cursor-pointer transition-colors">
                <div class="flex items-start gap-2.5">
                  <div class="dot-teal mt-1 flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="text-[13px] font-semibold text-[#0D2B20]">
                      Backup completed
                    </div>
                    <div class="text-[11.5px] text-[#5A8A74] mt-0.5">
                      Snapshot · 10.2 GB
                    </div>
                    <div class="text-[11px] text-[#00875A] mt-1 font-semibold">
                      Info · 2 hr ago
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-5 py-3.5 hover:bg-[#F7FCF9] cursor-pointer transition-colors">
                <div class="flex items-start gap-2.5">
                  <div class="dot-green mt-1 flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="text-[13px] font-semibold text-[#0D2B20]">
                      Auto-scaling not triggered
                    </div>
                    <div class="text-[11.5px] text-[#5A8A74] mt-0.5">
                      Cluster0 · M10
                    </div>
                    <div class="text-[11px] text-[#00875A] mt-1 font-semibold">
                      Resolved · 3 hr ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-5 py-3 border-t border-[#E8F5EF]">
              <button class="text-[13px] text-[#00875A] font-semibold hover:underline">
                View all activity →
              </button>
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

/* ── Green palette ──
     Sidebar bg     : #003D2B  (deep forest green)
     Primary green  : #00875A  (MongoDB / Grab action green)
     Accent teal    : #00C48C  (Gojek / Grab highlight)
     Light green bg : #F4FAF7  (body)
     Card surface   : #FFFFFF
     Borders        : #D0E8DB
  */

.mongo-atlas-layout {
  font-family: 'Euclid Circular A', 'Segoe UI', sans-serif;
  background: #f4faf7;
}

/* ---------- Sidebar ---------- */
.sidebar {
  width: 224px;
  min-width: 224px;
  background: #003d2b;
  color: #8dbfab;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 13.5px;
  transition:
    background 0.15s,
    color 0.15s;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}
.nav-item.active {
  background: rgba(0, 196, 140, 0.18);
  color: #00c48c;
}
.nav-item.active svg {
  stroke: #00c48c;
}
.nav-section {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #3d7060;
  padding: 18px 14px 6px;
}

/* ---------- Top bar ---------- */
.topbar {
  background: #fff;
  border-bottom: 1px solid #d0e8db;
}

/* ---------- Cards ---------- */
.card {
  background: #fff;
  border: 1px solid #d0e8db;
  border-radius: 10px;
}
.card-header {
  border-bottom: 1px solid #e8f5ef;
}

/* ---------- Status dots ---------- */
.dot-green {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00875a;
  flex-shrink: 0;
}
.dot-teal {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00c48c;
  flex-shrink: 0;
}
.dot-yellow {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f5a623;
  flex-shrink: 0;
}
.dot-red {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d93025;
  flex-shrink: 0;
}

/* ---------- Sparklines ---------- */
.sparkline-area {
  fill: rgba(0, 135, 90, 0.09);
}
.sparkline-line {
  fill: none;
  stroke: #00875a;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.sparkline-area-teal {
  fill: rgba(0, 196, 140, 0.1);
}
.sparkline-line-teal {
  fill: none;
  stroke: #00c48c;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ---------- Badges ---------- */
.badge {
  font-size: 11px;
  font-weight: 600;
  border-radius: 5px;
  padding: 2px 8px;
}
.badge-green {
  background: #d4f5e6;
  color: #00613e;
}
.badge-teal {
  background: #c8f0e4;
  color: #007a58;
}
.badge-yellow {
  background: #fff3d6;
  color: #8a4f00;
}
.badge-red {
  background: #fde8e6;
  color: #a0180c;
}
.badge-gray {
  background: #e5f2ec;
  color: #3d6b55;
}

/* ---------- Progress bar ---------- */
.progress-track {
  height: 6px;
  background: #d8eddf;
  border-radius: 99px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s;
}

/* ---------- Table ---------- */
.tbl th {
  font-size: 11px;
  font-weight: 700;
  color: #5a8a74;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 10px 16px;
  border-bottom: 1px solid #e8f5ef;
  background: #f7fcf9;
}
.tbl td {
  font-size: 13px;
  padding: 10px 16px;
  border-bottom: 1px solid #f0f9f4;
  color: #1a3329;
}
.tbl tr:last-child td {
  border-bottom: none;
}
.tbl tr:hover td {
  background: #f7fcf9;
}

/* ---------- Metric tiles ---------- */
.metric-tile {
  background: #fff;
  border: 1px solid #d0e8db;
  border-radius: 10px;
  padding: 18px 20px;
}
.metric-value {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 26px;
  font-weight: 500;
  color: #0d2b20;
}
.metric-label {
  font-size: 11px;
  color: #5a8a74;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.metric-delta-up {
  font-size: 12px;
  color: #00875a;
  font-weight: 600;
}
.metric-delta-down {
  font-size: 12px;
  color: #d93025;
  font-weight: 600;
}

/* ---------- Scrollbar ---------- */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background: #a8cfbf;
  border-radius: 99px;
}

/* ---------- Buttons ---------- */
.btn-primary {
  background: #00875a;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 7px 16px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover {
  background: #006b47;
}
.btn-outline {
  background: #fff;
  color: #0d2b20;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 7px;
  border: 1px solid #b0d5c4;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-outline:hover {
  background: #f0faf5;
}

.font-mono {
  font-family: 'IBM Plex Mono', monospace;
}

@media (max-width: 1279px) {
  .desktop-sidebar {
    display: none;
  }
}
</style>
