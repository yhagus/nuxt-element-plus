<template>
  <div class="clickup-layout min-h-screen flex overflow-hidden dot-bg">
    <!-- ─────────── SIDEBAR ─────────── -->
    <aside class="desktop-sidebar w-60 bg-white flex flex-col border-r border-cu-border min-h-screen shrink-0 shadow-[1px_0_0_#E4E4EE]" style="position:relative;z-index:2">
      <div class="flex items-center gap-2.5 px-5 py-4 border-b border-cu-border">
        <div class="w-7 h-7 rounded-lg bg-cu-purple flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4 17.5L12 5l8 12.5H4z" /></svg>
        </div>
        <span class="font-bold text-cu-text text-sm tracking-tight">ClickUp</span>
        <svg class="w-4 h-4 ml-auto text-cu-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
      </div>

      <div class="px-3 pt-3.5">
        <div class="flex items-center gap-2 bg-cu-bg border border-cu-border rounded-lg px-3 py-2 text-xs text-cu-muted cursor-pointer hover:border-cu-purple-mid transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
          Search
          <span class="ml-auto font-mono text-[10px] bg-white border border-cu-border px-1.5 py-0.5 rounded">⌘K</span>
        </div>
      </div>

      <nav class="flex-1 px-2 pt-4 space-y-0.5 text-sm overflow-y-auto">
        <p class="px-3 pb-1 text-[10px] font-semibold text-cu-muted uppercase tracking-widest">
          Main
        </p>

        <a href="#" class="sidebar-item active flex items-center gap-2.5 px-3 py-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke-width="2" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke-width="2" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke-width="2" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke-width="2" /></svg>
          Dashboard
        </a>
        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Home
        </a>
        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          My Tasks
          <span class="ml-auto badge bg-cu-purple text-white px-1.5 py-0.5 rounded-full">12</span>
        </a>
        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          Inbox
          <span class="ml-auto badge bg-cu-red text-white px-1.5 py-0.5 rounded-full">3</span>
        </a>
        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Goals
        </a>

        <p class="px-3 pt-4 pb-1 text-[10px] font-semibold text-cu-muted uppercase tracking-widest">
          Spaces
        </p>

        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted">
          <span class="w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center bg-cu-blue text-white shrink-0">D</span>
          Design System
        </a>
        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted">
          <span class="w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center bg-cu-green text-white shrink-0">E</span>
          Engineering
        </a>
        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted">
          <span class="w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center bg-cu-orange text-white shrink-0">M</span>
          Marketing
        </a>
        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted">
          <span class="w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center bg-cu-red text-white shrink-0">P</span>
          Product
        </a>
        <a href="#" class="sidebar-item flex items-center gap-2.5 px-3 py-2 cursor-pointer text-cu-muted text-xs mt-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Add Space
        </a>
      </nav>

      <div class="px-4 py-3.5 border-t border-cu-border flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full bg-cu-purple flex items-center justify-center text-xs font-bold text-white shrink-0">
          JD
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-cu-text truncate">
            Jordan Davis
          </p>
          <p class="text-[10px] text-cu-muted">
            Admin · Workspace
          </p>
        </div>
        <svg class="w-4 h-4 text-cu-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
      </div>
    </aside>

    <!-- ─────────── MAIN ─────────── -->
    <main class="flex-1 flex flex-col overflow-hidden" style="position:relative;z-index:1">
      <header class="bg-white border-b border-cu-border px-4 py-3.5 flex flex-wrap items-center gap-3 shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.05)] md:px-6">
        <div>
          <h1 class="text-[15px] font-bold text-cu-text tracking-tight">
            Dashboard
          </h1>
          <p class="text-xs text-cu-muted mt-0.5">
            Welcome back, Jordan 👋 &nbsp;·&nbsp; Sat, March 21, 2026
          </p>
        </div>
        <div class="ml-auto flex w-full items-center justify-end gap-2 sm:w-auto">
          <button class="flex items-center gap-1.5 text-xs text-cu-muted px-3 py-1.5 rounded-lg border border-cu-border bg-white hover:border-cu-purple-mid hover:text-cu-purple transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
            Filter
          </button>
          <button class="flex items-center gap-1.5 text-xs text-cu-muted px-3 py-1.5 rounded-lg border border-cu-border bg-white hover:border-cu-purple-mid hover:text-cu-purple transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            This Week
          </button>
          <button class="flex items-center gap-1.5 text-xs bg-cu-purple text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#5244B8] transition-all shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            Add Widget
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto p-4 space-y-5 md:p-6">
        <!-- ── STAT CARDS ── -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div class="card p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="w-9 h-9 rounded-xl bg-cu-purple-light flex items-center justify-center">
                <svg class="w-[18px] h-[18px] text-cu-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </div>
              <span class="tag bg-cu-green-light text-cu-green">↑ 8%</span>
            </div>
            <p class="text-[26px] font-bold text-cu-text leading-none">
              248
            </p>
            <p class="text-xs text-cu-muted mt-1">
              Tasks Completed
            </p>
            <div class="progress-track mt-3">
              <div class="progress-fill bg-cu-purple" style="width:72%" />
            </div>
            <p class="text-[10px] font-mono text-cu-muted mt-1.5">
              72% of monthly goal
            </p>
          </div>

          <div class="card p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="w-9 h-9 rounded-xl bg-cu-red-light flex items-center justify-center">
                <svg class="w-[18px] h-[18px] text-cu-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span class="tag bg-cu-red-light text-cu-red">Attention</span>
            </div>
            <p class="text-[26px] font-bold text-cu-text leading-none">
              34
            </p>
            <p class="text-xs text-cu-muted mt-1">
              Overdue Tasks
            </p>
            <div class="progress-track mt-3">
              <div class="progress-fill bg-cu-red" style="width:28%" />
            </div>
            <p class="text-[10px] font-mono text-cu-muted mt-1.5">
              28% of active tasks
            </p>
          </div>

          <div class="card p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="w-9 h-9 rounded-xl bg-cu-blue-light flex items-center justify-center">
                <svg class="w-[18px] h-[18px] text-cu-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span class="tag bg-cu-green-light text-cu-green">↑ 2 new</span>
            </div>
            <p class="text-[26px] font-bold text-cu-text leading-none">
              18
            </p>
            <p class="text-xs text-cu-muted mt-1">
              Team Members
            </p>
            <div class="mt-3 flex items-center" style="display:flex">
              <div style="margin-left:0" class="w-6 h-6 rounded-full bg-cu-purple border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                JD
              </div>
              <div style="margin-left:-6px" class="w-6 h-6 rounded-full bg-cu-blue border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                AM
              </div>
              <div style="margin-left:-6px" class="w-6 h-6 rounded-full bg-cu-green border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                KL
              </div>
              <div style="margin-left:-6px" class="w-6 h-6 rounded-full bg-cu-orange border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                TR
              </div>
              <div style="margin-left:-6px" class="w-6 h-6 rounded-full bg-cu-bg border-2 border-white flex items-center justify-center text-[8px] font-semibold text-cu-muted">
                +14
              </div>
            </div>
          </div>

          <div class="card p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="w-9 h-9 rounded-xl bg-cu-yellow-light flex items-center justify-center">
                <svg class="w-[18px] h-[18px] text-cu-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span class="tag bg-cu-green-light text-cu-green">On track</span>
            </div>
            <p class="text-[26px] font-bold text-cu-text leading-none">
              6
            </p>
            <p class="text-xs text-cu-muted mt-1">
              Active Sprints
            </p>
            <div class="progress-track mt-3">
              <div class="progress-fill bg-cu-yellow" style="width:55%" />
            </div>
            <p class="text-[10px] font-mono text-cu-muted mt-1.5">
              55% avg velocity
            </p>
          </div>
        </div>

        <!-- ── LINE CHART + ACTIVITY ── -->
        <div class="grid grid-cols-1 gap-4 xl:grid-cols-5">
          <div class="card p-5 xl:col-span-3">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-sm font-bold text-cu-text">
                  Task Completion Trend
                </h3>
                <p class="text-xs text-cu-muted">
                  Last 8 weeks · all spaces
                </p>
              </div>
              <div class="flex gap-1">
                <button class="text-[11px] font-semibold bg-cu-purple-light text-cu-purple px-2.5 py-1 rounded-md border border-cu-purple-mid">
                  Completed
                </button>
                <button class="text-[11px] text-cu-muted px-2.5 py-1 rounded-md border border-transparent hover:border-cu-border hover:text-cu-text transition-all">
                  Created
                </button>
              </div>
            </div>

            <!-- SVG Line Chart — no external library -->
            <!-- Data: [28,35,42,31,55,48,61,58], range 10-70 → y = 150-(val-10)/60*130 -->
            <!-- y values: 28→116, 35→100, 42→84, 31→103, 55→69, 48→80, 61→54, 58→59 -->
            <svg viewBox="0 0 580 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;overflow:visible">
              <!-- grid -->
              <line class="grid-ln" x1="44" y1="20" x2="560" y2="20" />
              <line class="grid-ln" x1="44" y1="53" x2="560" y2="53" />
              <line class="grid-ln" x1="44" y1="86" x2="560" y2="86" />
              <line class="grid-ln" x1="44" y1="119" x2="560" y2="119" />
              <line class="grid-ln" x1="44" y1="152" x2="560" y2="152" />
              <!-- y labels -->
              <text class="ax-lbl" x="38" y="24" text-anchor="end">70</text>
              <text class="ax-lbl" x="38" y="57" text-anchor="end">55</text>
              <text class="ax-lbl" x="38" y="90" text-anchor="end">40</text>
              <text class="ax-lbl" x="38" y="123" text-anchor="end">25</text>
              <text class="ax-lbl" x="38" y="156" text-anchor="end">10</text>
              <!-- x labels — 8 points spaced from x=88 to x=556, step≈66.8 -->
              <text class="ax-lbl" x="88" y="170" text-anchor="middle">Wk 1</text>
              <text class="ax-lbl" x="155" y="170" text-anchor="middle">Wk 2</text>
              <text class="ax-lbl" x="222" y="170" text-anchor="middle">Wk 3</text>
              <text class="ax-lbl" x="289" y="170" text-anchor="middle">Wk 4</text>
              <text class="ax-lbl" x="356" y="170" text-anchor="middle">Wk 5</text>
              <text class="ax-lbl" x="423" y="170" text-anchor="middle">Wk 6</text>
              <text class="ax-lbl" x="490" y="170" text-anchor="middle">Wk 7</text>
              <text class="ax-lbl" x="557" y="170" text-anchor="middle">Wk 8</text>
              <!-- area -->
              <polygon class="cl-area" points="88,116 155,100 222,84 289,103 356,69 423,80 490,54 557,59 557,152 88,152" opacity="0.55" />
              <!-- line -->
              <polyline class="cl" points="88,116 155,100 222,84 289,103 356,69 423,80 490,54 557,59" />
              <!-- dots -->
              <circle class="cl-dot" cx="88" cy="116" r="4" />
              <circle class="cl-dot" cx="155" cy="100" r="4" />
              <circle class="cl-dot" cx="222" cy="84" r="4" />
              <circle class="cl-dot" cx="289" cy="103" r="4" />
              <circle class="cl-dot" cx="356" cy="69" r="4" />
              <circle class="cl-dot" cx="423" cy="80" r="4" />
              <circle class="cl-dot" cx="490" cy="54" r="4" />
              <circle class="cl-dot" cx="557" cy="59" r="5" stroke-width="3" />
              <!-- tooltip on last point -->
              <rect x="520" y="34" width="60" height="22" rx="5" fill="#6152CC" />
              <text x="550" y="49" text-anchor="middle" font-family="DM Mono,monospace" font-size="11" font-weight="500" fill="white">58 tasks</text>
            </svg>
          </div>

          <!-- Activity Feed -->
          <div class="card p-5 flex flex-col xl:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-bold text-cu-text">
                Recent Activity
              </h3>
              <a href="#" class="text-[11px] text-cu-purple font-medium hover:underline">View all</a>
            </div>
            <div class="space-y-0 divide-y divide-cu-border flex-1">
              <div class="flex gap-3 items-start py-2.5">
                <div class="w-7 h-7 rounded-full bg-cu-purple flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                  AM
                </div>
                <div>
                  <p class="text-xs text-cu-text leading-relaxed">
                    <span class="font-semibold">Alex M.</span> completed <span class="text-cu-purple font-medium">UI Redesign Sprint #3</span>
                  </p><p class="text-[10px] text-cu-muted mt-0.5 font-mono">
                    2 min ago
                  </p>
                </div>
              </div>
              <div class="flex gap-3 items-start py-2.5">
                <div class="w-7 h-7 rounded-full bg-cu-blue flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                  KL
                </div>
                <div>
                  <p class="text-xs text-cu-text leading-relaxed">
                    <span class="font-semibold">Kim L.</span> commented on <span class="text-cu-blue font-medium">API Integration</span>
                  </p><p class="text-[10px] text-cu-muted mt-0.5 font-mono">
                    14 min ago
                  </p>
                </div>
              </div>
              <div class="flex gap-3 items-start py-2.5">
                <div class="w-7 h-7 rounded-full bg-cu-green flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                  TR
                </div>
                <div>
                  <p class="text-xs text-cu-text leading-relaxed">
                    <span class="font-semibold">Tom R.</span> moved <span class="text-cu-green font-medium">Data Pipeline</span> → In Progress
                  </p><p class="text-[10px] text-cu-muted mt-0.5 font-mono">
                    1 hr ago
                  </p>
                </div>
              </div>
              <div class="flex gap-3 items-start py-2.5">
                <div class="w-7 h-7 rounded-full bg-cu-orange flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                  JD
                </div>
                <div>
                  <p class="text-xs text-cu-text leading-relaxed">
                    <span class="font-semibold">Jordan D.</span> created <span class="text-cu-orange font-medium">Q2 Roadmap Review</span>
                  </p><p class="text-[10px] text-cu-muted mt-0.5 font-mono">
                    3 hr ago
                  </p>
                </div>
              </div>
              <div class="flex gap-3 items-start py-2.5">
                <div class="w-7 h-7 rounded-full bg-cu-red flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                  SR
                </div>
                <div>
                  <p class="text-xs text-cu-text leading-relaxed">
                    <span class="font-semibold">Sara R.</span> closed sprint <span class="text-cu-red font-medium">Marketing Wk 12</span>
                  </p><p class="text-[10px] text-cu-muted mt-0.5 font-mono">
                    5 hr ago
                  </p>
                </div>
              </div>
              <div class="flex gap-3 items-start py-2.5">
                <div class="w-7 h-7 rounded-full bg-cu-yellow flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                  MP
                </div>
                <div>
                  <p class="text-xs text-cu-text leading-relaxed">
                    <span class="font-semibold">Mike P.</span> assigned <span class="text-cu-yellow font-medium">Auth Bug Fix</span> to Alex
                  </p><p class="text-[10px] text-cu-muted mt-0.5 font-mono">
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── STATUS DONUT + TASKS + WORKLOAD ── -->
        <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <!-- Donut chart — pure SVG -->
          <!-- r=72, circumference=452.4; data: completed 72%(326), inprog 18%(81), review 8%(36), todo 2%(9) -->
          <div class="card p-5">
            <h3 class="text-sm font-bold text-cu-text mb-0.5">
              Task Status
            </h3>
            <p class="text-xs text-cu-muted mb-4">
              All spaces · this week
            </p>

            <svg viewBox="0 0 200 200" style="width:100%;max-width:176px;display:block;margin:0 auto">
              <!-- bg ring -->
              <circle cx="100" cy="100" r="72" fill="none" stroke="#EBEBF5" stroke-width="22" />
              <!-- Completed 72% → 326 of 452 -->
              <circle
                cx="100" cy="100" r="72" fill="none" stroke="#0F9D58" stroke-width="22"
                stroke-dasharray="326 452" stroke-dashoffset="113"
                class="ring-seg" style="animation-delay:0s"
              />
              <!-- In Progress 18% → 81 -->
              <circle
                cx="100" cy="100" r="72" fill="none" stroke="#1A73E8" stroke-width="22"
                stroke-dasharray="81 452" stroke-dashoffset="-213"
                class="ring-seg" style="animation-delay:.08s"
              />
              <!-- In Review 8% → 36 -->
              <circle
                cx="100" cy="100" r="72" fill="none" stroke="#F9AB00" stroke-width="22"
                stroke-dasharray="36 452" stroke-dashoffset="-294"
                class="ring-seg" style="animation-delay:.16s"
              />
              <!-- To Do 2% → 9 -->
              <circle
                cx="100" cy="100" r="72" fill="none" stroke="#CACADA" stroke-width="22"
                stroke-dasharray="9 452" stroke-dashoffset="-330"
                class="ring-seg" style="animation-delay:.24s"
              />
              <!-- center label -->
              <text x="100" y="93" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="26" font-weight="700" fill="#1E1E2D">344</text>
              <text x="100" y="113" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="11" fill="#7878A0">total tasks</text>
            </svg>

            <div class="mt-4 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm bg-cu-green" />Completed</span>
                <span class="font-mono font-semibold text-cu-text">248</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm bg-cu-blue" />In Progress</span>
                <span class="font-mono font-semibold text-cu-text">62</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm bg-cu-yellow" />In Review</span>
                <span class="font-mono font-semibold text-cu-text">28</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm bg-cu-border-dark" />To Do</span>
                <span class="font-mono font-semibold text-cu-text">6</span>
              </div>
            </div>
          </div>

          <!-- Priority Tasks -->
          <div class="card p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-bold text-cu-text">
                Priority Tasks
              </h3>
              <a href="#" class="text-[11px] text-cu-purple font-medium hover:underline">All tasks</a>
            </div>
            <div class="space-y-1">
              <div class="task-row flex items-center gap-3 px-2 py-2.5">
                <div class="check-box border-cu-red" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-cu-text truncate">
                    Fix auth token expiry bug
                  </p>
                  <p class="text-[10px] text-cu-muted">
                    Engineering · Due today
                  </p>
                </div>
                <span class="tag bg-cu-red-light text-cu-red shrink-0">Urgent</span>
              </div>
              <div class="task-row flex items-center gap-3 px-2 py-2.5">
                <div class="check-box border-cu-orange" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-cu-text truncate">
                    Q2 OKR presentation deck
                  </p>
                  <p class="text-[10px] text-cu-muted">
                    Marketing · Due tomorrow
                  </p>
                </div>
                <span class="tag bg-cu-orange-light text-cu-orange shrink-0">High</span>
              </div>
              <div class="task-row flex items-center gap-3 px-2 py-2.5">
                <div class="check-box border-cu-blue" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-cu-text truncate">
                    Design system tokens update
                  </p>
                  <p class="text-[10px] text-cu-muted">
                    Design · Mar 25
                  </p>
                </div>
                <span class="tag bg-cu-blue-light text-cu-blue shrink-0">Normal</span>
              </div>
              <div class="task-row flex items-center gap-3 px-2 py-2.5">
                <div class="check-box border-cu-blue" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-cu-text truncate">
                    Integrate Stripe webhooks
                  </p>
                  <p class="text-[10px] text-cu-muted">
                    Engineering · Mar 26
                  </p>
                </div>
                <span class="tag bg-cu-blue-light text-cu-blue shrink-0">Normal</span>
              </div>
              <div class="task-row flex items-center gap-3 px-2 py-2.5">
                <div class="check-box border-cu-border-dark" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-cu-muted truncate">
                    Write onboarding copy v2
                  </p>
                  <p class="text-[10px] text-cu-muted">
                    Marketing · Mar 30
                  </p>
                </div>
                <span class="tag bg-cu-bg text-cu-muted border border-cu-border shrink-0">Low</span>
              </div>
              <div class="task-row flex items-center gap-3 px-2 py-2.5">
                <div class="check-box border-cu-border-dark" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-cu-muted truncate">
                    Audit accessibility issues
                  </p>
                  <p class="text-[10px] text-cu-muted">
                    Design · Apr 2
                  </p>
                </div>
                <span class="tag bg-cu-bg text-cu-muted border border-cu-border shrink-0">Low</span>
              </div>
            </div>
          </div>

          <!-- Team Workload -->
          <div class="card p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-bold text-cu-text">
                Team Workload
              </h3>
              <a href="#" class="text-[11px] text-cu-purple font-medium hover:underline">Manage</a>
            </div>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-cu-purple flex items-center justify-center text-[9px] font-bold text-white">
                      AM
                    </div>
                    <span class="text-xs font-medium text-cu-text">Alex M.</span>
                  </div>
                  <span class="text-[10px] font-mono text-cu-muted">12 tasks</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill bg-cu-purple" style="width:85%" />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-cu-blue flex items-center justify-center text-[9px] font-bold text-white">
                      KL
                    </div>
                    <span class="text-xs font-medium text-cu-text">Kim L.</span>
                  </div>
                  <span class="text-[10px] font-mono text-cu-muted">9 tasks</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill bg-cu-blue" style="width:65%" />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-cu-green flex items-center justify-center text-[9px] font-bold text-white">
                      TR
                    </div>
                    <span class="text-xs font-medium text-cu-text">Tom R.</span>
                  </div>
                  <span class="text-[10px] font-mono text-cu-muted">7 tasks</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill bg-cu-green" style="width:50%" />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-cu-orange flex items-center justify-center text-[9px] font-bold text-white">
                      JD
                    </div>
                    <span class="text-xs font-medium text-cu-text">Jordan D.</span>
                  </div>
                  <span class="text-[10px] font-mono text-cu-muted">5 tasks</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill bg-cu-orange" style="width:36%" />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-cu-red flex items-center justify-center text-[9px] font-bold text-white">
                      SR
                    </div>
                    <span class="text-xs font-medium text-cu-text">Sara R.</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-[10px] font-mono text-cu-red font-semibold">14 tasks</span>
                    <span class="tag bg-cu-red-light text-cu-red" style="font-size:9px;padding:1px 6px">Overloaded</span>
                  </div>
                </div>
                <div class="progress-track">
                  <div class="progress-fill bg-cu-red" style="width:92%" />
                </div>
              </div>
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-cu-yellow flex items-center justify-center text-[9px] font-bold text-white">
                      MP
                    </div>
                    <span class="text-xs font-medium text-cu-text">Mike P.</span>
                  </div>
                  <span class="text-[10px] font-mono text-cu-muted">3 tasks</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill bg-cu-yellow" style="width:22%" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="card p-5">
          <slot />
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
    *,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.clickup-layout {
  font-family: 'DM Sans', sans-serif;
  background: #f5f5fa;
  color: #1e1e2d;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cacada;
  border-radius: 4px;
}

.sidebar-item {
  border-left: 3px solid transparent;
  transition: all 0.15s ease;
  border-radius: 0 8px 8px 0;
}
.sidebar-item:hover {
  background: #f0f0fa;
  border-left-color: #c7caff;
}
.sidebar-item.active {
  background: #eef0ff;
  border-left-color: #6152cc;
  color: #6152cc;
  font-weight: 600;
}

.card {
  background: #fff;
  border: 1px solid #e4e4ee;
  border-radius: 14px;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
}
.card:hover {
  box-shadow: 0 4px 20px rgba(97, 82, 204, 0.09);
  border-color: #c7caff;
}

.tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
}
.badge {
  font-size: 10px;
  font-weight: 700;
}

.progress-track {
  background: #ebebf5;
  border-radius: 99px;
  height: 6px;
  overflow: hidden;
}
.progress-fill {
  height: 6px;
  border-radius: 99px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-row {
  border-radius: 8px;
  transition: background 0.12s;
  cursor: pointer;
}
.task-row:hover {
  background: #f8f8fd;
}

.check-box {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 2px solid;
  flex-shrink: 0;
  transition: background 0.15s;
}

/* dot pattern */
.dot-bg {
  background-image: radial-gradient(#cacada 1px, transparent 1px);
  background-size: 22px 22px;
}

/* SVG chart styles */
.grid-ln {
  stroke: #e4e4ee;
  stroke-width: 1;
}
.ax-lbl {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  fill: #9898b8;
}
.cl {
  fill: none;
  stroke: #6152cc;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.cl-area {
  fill: #eef0ff;
}
.cl-dot {
  fill: #fff;
  stroke: #6152cc;
  stroke-width: 2.5;
}

/* donut animation */
@keyframes ring-in {
  from {
    stroke-dashoffset: 503;
  }
}
.ring-seg {
  animation: ring-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.font-mono {
  font-family: 'DM Mono', 'JetBrains Mono', monospace;
}

.text-cu-text {
  color: #1e1e2d;
}

.text-cu-muted {
  color: #7878a0;
}

.text-cu-purple {
  color: #6152cc;
}

.text-cu-blue {
  color: #1a73e8;
}

.text-cu-green {
  color: #0f9d58;
}

.text-cu-red {
  color: #d93025;
}

.text-cu-orange {
  color: #e37400;
}

.text-cu-yellow {
  color: #f9ab00;
}

.bg-cu-bg {
  background: #f5f5fa;
}

.bg-cu-purple {
  background: #6152cc;
}

.bg-cu-purple-light {
  background: #eef0ff;
}

.bg-cu-blue {
  background: #1a73e8;
}

.bg-cu-blue-light {
  background: #e8f0fe;
}

.bg-cu-green {
  background: #0f9d58;
}

.bg-cu-green-light {
  background: #e6f4ea;
}

.bg-cu-red {
  background: #d93025;
}

.bg-cu-red-light {
  background: #fce8e6;
}

.bg-cu-orange {
  background: #e37400;
}

.bg-cu-orange-light {
  background: #fef3e2;
}

.bg-cu-yellow {
  background: #f9ab00;
}

.bg-cu-yellow-light {
  background: #fef9e5;
}

.bg-cu-border-dark {
  background: #cacada;
}

.border-cu-border {
  border-color: #e4e4ee;
}

.border-cu-border-dark {
  border-color: #cacada;
}

.border-cu-purple-mid {
  border-color: #c7caff;
}

.border-cu-blue {
  border-color: #1a73e8;
}

.border-cu-green {
  border-color: #0f9d58;
}

.border-cu-red {
  border-color: #d93025;
}

.border-cu-orange {
  border-color: #e37400;
}

.border-cu-yellow {
  border-color: #f9ab00;
}

.hover\:border-cu-purple-mid:hover {
  border-color: #c7caff;
}

.hover\:border-cu-border:hover {
  border-color: #e4e4ee;
}

.hover\:text-cu-purple:hover {
  color: #6152cc;
}

.hover\:text-cu-text:hover {
  color: #1e1e2d;
}

.divide-cu-border > :not([hidden]) ~ :not([hidden]) {
  border-color: #e4e4ee;
}

@media (max-width: 1279px) {
  .desktop-sidebar {
    display: none;
  }
}
</style>
