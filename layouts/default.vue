<template>
  <div class="flex h-screen overflow-x-hidden">
    <aside
      id="sidebar" class="w-64 bg-white text-slate-800 flex flex-col fixed inset-y-0 left-0 z-40 shadow-xl border-r border-slate-200
                           transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"
    >
      <div class="h-16 flex items-center justify-center border-b border-slate-200 flex-shrink-0">
        <svg class="h-8 w-auto text-sky-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM8.29 15.71A3.985 3.985 0 0 0 12 18c2.21 0 4-1.79 4-4s-1.79-4-4-4a3.985 3.985 0 0 0-3.71 2.29L8.29 10V8h7.42v2H10.2A3.986 3.986 0 0 0 12 11c1.1 0 2.1.45 2.83 1.17L12 15l-2.83-2.83A3.981 3.981 0 0 0 8 12c0-.46.08-.9.22-1.31L6.71 9.17A5.967 5.967 0 0 1 6 12c0 2.21 1.79 4 4 4 .71 0 1.37-.19 1.94-.51l-1.65-1.66-2-2.12Z" />
        </svg>
        <span class="ml-3 text-xl font-semibold text-slate-700">Dashboard</span>
      </div>

      <nav class="flex-grow p-4 space-y-1 overflow-y-auto">
        <a href="#" class="nav-link-base nav-link-active">
          <svg class="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
          Dashboard
        </a>
        <a href="#" class="nav-link-base nav-link">
          <svg class="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
          Analytics
        </a>

        <div>
          <button type="button" class="nav-link-base nav-link w-full flex justify-between items-center" onclick="toggleSubmenu(this)">
            <span class="flex items-center">
              <svg class="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              Users
            </span>
            <svg class="h-4 w-4 transform transition-transform duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
          <div class="pl-4 mt-1 space-y-1 hidden">
            <a href="#" class="nav-link-base sub-nav-link">All Users</a>
            <a href="#" class="nav-link-base sub-nav-link">Add New User</a>
            <a href="#" class="nav-link-base sub-nav-link">Roles & Permissions</a>
          </div>
        </div>

        <div>
          <button type="button" class="nav-link-base nav-link w-full flex justify-between items-center" onclick="toggleSubmenu(this)">
            <span class="flex items-center">
              <svg class="h-5 w-5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-1.226M15.002 11.142c.013.019.025.04.038.061a6.408 6.408 0 01-3.428 5.11S10.22 21 12 21c1.78 0 2.684-1.003 2.684-1.003s.64-.406 1.03-1.003zm-6.04-5.112a6.408 6.408 0 013.428-5.11S13.78 3 12 3C10.22 3 9.316 4.003 9.316 4.003s-.64.406-1.03 1.003zm10.132 1.003a6.403 6.403 0 010 8.114M1.868 10.03a6.403 6.403 0 010-8.114" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>
              Settings
            </span>
            <svg class="h-4 w-4 transform transition-transform duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
          <div class="pl-4 mt-1 space-y-1 hidden">
            <a href="#" class="nav-link-base sub-nav-link">Account</a>
            <a href="#" class="nav-link-base sub-nav-link">Appearance</a>
            <a href="#" class="nav-link-base sub-nav-link">Notifications</a>
            <a href="#" class="nav-link-base sub-nav-link">Integrations</a>
          </div>
        </div>
      </nav>

      <div class="p-4 border-t border-slate-200 mt-auto flex-shrink-0">
        <div class="flex items-center">
          <img class="h-10 w-10 rounded-full object-cover" src="https://via.placeholder.com/100/334155/ffffff?text=U" alt="User Avatar">
          <div class="ml-3">
            <p class="text-sm font-medium text-slate-700">
              User Name
            </p>
            <p class="text-xs text-slate-500">
              user@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-y-auto lg:ml-64">
      <header class="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md shadow-sm mb-2 md:mb-4">
        <div class="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button id="sidebarToggle" class="lg:hidden text-slate-600 hover:text-slate-800">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div class="relative w-full max-w-xs ml-4 lg:ml-0">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
              </svg>
            </span>
            <input class="form-input block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-slate-400 text-sm" type="text" placeholder="Search...">
          </div>

          <div class="flex items-center space-x-3 ml-auto">
            <button title="Notifications" class="relative p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span class="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-sky-500 ring-1 ring-white" />
            </button>
            <div class="relative">
              <button class="flex items-center focus:outline-none">
                <img class="h-8 w-8 rounded-full object-cover" src="https://via.placeholder.com/100/334155/ffffff?text=U" alt="User Avatar">
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <section class="mb-8">
          <h2 class="text-xl font-semibold text-slate-700 mb-4">
            Overview
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <div class="card">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-slate-500 text-sm font-medium">
                  Total Sales
                </h3>
                <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.219 12.768 11 12 11c-.768 0-1.536.219-2.121.727L8.707 13.182M12 6a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>
              </div>
              <p class="text-3xl font-bold text-slate-800">
                $12,345
              </p>
              <p class="text-xs text-green-600 mt-1">
                +15% from last month
              </p>
            </div>
            <div class="card">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-slate-500 text-sm font-medium">
                  New Users
                </h3>
                <svg class="h-6 w-6 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              </div>
              <p class="text-3xl font-bold text-slate-800">
                2,401
              </p>
              <p class="text-xs text-sky-600 mt-1">
                +8.2% this week
              </p>
            </div>
            <div class="card">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-slate-500 text-sm font-medium">
                  Orders
                </h3>
                <svg class="h-6 w-6 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
              </div>
              <p class="text-3xl font-bold text-slate-800">
                859
              </p>
              <p class="text-xs text-slate-500 mt-1">
                Pending: 23
              </p>
            </div>
            <div class="card">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-slate-500 text-sm font-medium">
                  Pending Tasks
                </h3>
                <svg class="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
              </div>
              <p class="text-3xl font-bold text-slate-800">
                32
              </p>
              <p class="text-xs text-red-600 mt-1">
                Overdue: 5
              </p>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-slate-700 mb-4">
            Analytics
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div class="card min-h-[250px] md:min-h-[300px] flex items-center justify-center">
              <p class="text-slate-400">
                Line Chart: Sales Over Time (Placeholder)
              </p>
            </div>
            <div class="card min-h-[250px] md:min-h-[300px] flex items-center justify-center">
              <p class="text-slate-400">
                Bar Chart: User Demographics (Placeholder)
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-slate-700 mb-4">
            Recent Activity
          </h2>
          <div class="card overflow-x-auto">
            <table class="w-full table min-w-[640px]">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="flex items-center">
                      <img class="h-8 w-8 rounded-full object-cover mr-3" src="https://via.placeholder.com/80/0ea5e9/ffffff?text=A" alt="Alice">Alice Johnson
                    </div>
                  </td>
                  <td>Updated profile</td><td>2025-06-03 10:15 AM</td>
                  <td><span class="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700 border border-green-300">Completed</span></td>
                </tr>
                <tr>
                  <td>
                    <div class="flex items-center">
                      <img class="h-8 w-8 rounded-full object-cover mr-3" src="https://via.placeholder.com/80/f97316/ffffff?text=B" alt="Bob">Bob Williams
                    </div>
                  </td>
                  <td>Submitted new order #1203</td><td>2025-06-03 09:30 AM</td>
                  <td><span class="px-2 py-0.5 text-xs font-medium rounded-full bg-sky-100 text-sky-700 border border-sky-300">Processing</span></td>
                </tr>
                <tr>
                  <td>
                    <div class="flex items-center">
                      <img class="h-8 w-8 rounded-full object-cover mr-3" src="https://via.placeholder.com/80/ec4899/ffffff?text=C" alt="Carol">Carol Davis
                    </div>
                  </td>
                  <td>Commented on "Project Alpha"</td><td>2025-06-02 05:20 PM</td>
                  <td><span class="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700 border border-green-300">Completed</span></td>
                </tr>
                <tr>
                  <td>
                    <div class="flex items-center">
                      <img class="h-8 w-8 rounded-full object-cover mr-3" src="https://via.placeholder.com/80/ef4444/ffffff?text=D" alt="David">David Miller
                    </div>
                  </td>
                  <td>Failed login attempt</td><td>2025-06-02 03:00 PM</td>
                  <td><span class="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 border border-red-300">Failed</span></td>
                </tr>
                <tr>
                  <td>
                    <div class="flex items-center">
                      <img class="h-8 w-8 rounded-full object-cover mr-3" src="https://via.placeholder.com/80/84cc16/ffffff?text=E" alt="Eve">Eve Brown
                    </div>
                  </td>
                  <td>Uploaded 3 new files</td><td>2025-06-01 11:00 AM</td>
                  <td><span class="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">Pending Review</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer class="mt-8 text-center text-sm text-slate-500 py-4">
          &copy; 2025 Your Company. All rights reserved.
        </footer>
      </main>
    </div>
  </div>
</template>
