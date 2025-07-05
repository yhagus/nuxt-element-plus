<script setup lang="ts">
interface Stat {
  name: string;
  value: string;
  change: number;
  icon: string;
  bgColor: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
}

interface Order {
  id: string;
  customer: string;
  status: string;
  amount: string;
  date: string;
}

const stats: Stat[] = [
  { name: 'Total Revenue', value: '$45,231', change: 12, icon: 'CurrencyDollarIcon', bgColor: 'bg-blue-500' },
  { name: 'New Users', value: '1,234', change: 8, icon: 'UsersIcon', bgColor: 'bg-green-500' },
  { name: 'Orders', value: '856', change: -2, icon: 'ShoppingCartIcon', bgColor: 'bg-purple-500' },
  { name: 'Conversion Rate', value: '3.2%', change: 5, icon: 'TrendingUpIcon', bgColor: 'bg-orange-500' },
];

const activities: Activity[] = [
  { id: 1, user: 'John Doe', action: 'created a new project', time: '2 hours ago' },
  { id: 2, user: 'Jane Smith', action: 'updated user profile', time: '4 hours ago' },
  { id: 3, user: 'Mike Johnson', action: 'completed a task', time: '6 hours ago' },
  { id: 4, user: 'Sarah Wilson', action: 'added a new comment', time: '8 hours ago' },
];

const orders: Order[] = [
  { id: '1001', customer: 'Alice Brown', status: 'Completed', amount: '299.00', date: '2024-01-15' },
  { id: '1002', customer: 'Bob Davis', status: 'Processing', amount: '159.50', date: '2024-01-14' },
  { id: '1003', customer: 'Carol White', status: 'Shipped', amount: '89.99', date: '2024-01-13' },
  { id: '1004', customer: 'David Miller', status: 'Pending', amount: '449.00', date: '2024-01-12' },
];

function getStatusColor(status: string): string {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'Shipped':
      return 'bg-blue-100 text-blue-800';
    case 'Pending':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

definePageMeta({
  layout: 'dashboard',
});
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
      <h1 class="text-2xl font-bold mb-2">
        Welcome back, John!
      </h1>
      <p class="text-blue-100">
        Here's what's happening with your business today.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.name" class="bg-white rounded-lg p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">
              {{ stat.name }}
            </p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stat.value }}
            </p>
          </div>
          <div class="p-3 rounded-full" :class="stat.bgColor">
            <component :is="stat.icon" class="h-6 w-6 text-white" />
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span class="text-sm font-medium" :class="stat.change > 0 ? 'text-green-600' : 'text-red-600'">
            {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
          </span>
          <span class="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart -->
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Revenue Overview
        </h3>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p class="text-gray-500">
              Chart component would go here
            </p>
          </div>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div class="space-y-4">
          <div v-for="activity in activities" :key="activity.id" class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-medium">{{ activity.user.charAt(0) }}</span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900">
                <span class="font-medium">{{ activity.user }}</span> {{ activity.action }}
              </p>
              <p class="text-xs text-gray-500">
                {{ activity.time }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          Recent Orders
        </h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.customer }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getStatusColor(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ order.amount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.date }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
