<template>
  <header class="bg-white border-b border-slate-100 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between shadow-sm select-none shrink-0 z-10">
    <!-- Left: Hamburger & Page Title & Breadcrumbs -->
    <div class="flex items-center gap-3">
      <!-- Hamburger Menu Button -->
      <button
        type="button"
        class="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition duration-150 shrink-0"
        @click="toggleSidebar"
      >
        <Menu class="h-6 w-6" />
      </button>

      <div>
        <h2 class="text-base md:text-xl font-bold text-slate-800 tracking-wide leading-none">
          {{ route.meta.title || 'Quản lý học viên' }}
        </h2>
        <!-- Breadcrumb -->
        <nav class="hidden sm:flex text-xs font-semibold text-slate-400 mt-2 tracking-wider">
          <span class="hover:text-slate-600 transition duration-150 cursor-pointer">Trang chủ</span>
          <span class="mx-2 text-slate-300">/</span>
          <span class="text-primary-600">Học viên</span>
        </nav>
      </div>
    </div>

    <!-- Right: Search, Utilities, Avatar -->
    <div class="flex items-center gap-3 md:gap-6">
      <!-- Search Input -->
      <div class="relative w-40 sm:w-60 md:w-72">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search class="h-4 w-4" />
        </span>
        <input
          v-model="studentStore.searchQuery"
          type="text"
          placeholder="Tìm kiếm..."
          class="block w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs md:text-sm transition-all focus:border-primary-500 focus:ring-primary-500 bg-slate-50/50 hover:bg-slate-50 placeholder-slate-400"
        />
      </div>

      <!-- Utilities -->
      <div class="hidden md:flex items-center gap-2">
        <!-- Notification Button -->
        <button
          type="button"
          class="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition duration-150"
        >
          <Bell class="h-5 w-5" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <!-- Theme Toggle -->
        <button
          type="button"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition duration-150"
        >
          <Moon class="h-5 w-5" />
        </button>
      </div>

      <!-- Vertical Divider -->
      <div class="hidden md:block w-px h-8 bg-slate-100"></div>

      <!-- User Profile Initials Avatar "NT" -->
      <div class="flex items-center gap-2 md:gap-3 cursor-pointer group">
        <BaseAvatar name="Nguyễn Tuyên" size="sm" class="md:hidden" />
        <BaseAvatar name="Nguyễn Tuyên" size="md" class="hidden md:block" />
        <div class="hidden xl:block">
          <p class="text-sm font-bold text-slate-700 leading-none group-hover:text-slate-900 transition">Nguyễn Tuyên</p>
          <p class="text-xxs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Admin</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Bell, Moon, Menu } from 'lucide-vue-next'
import { useStudentStore } from '../../stores/student.store'
import BaseAvatar from '../base/BaseAvatar.vue'

const route = useRoute()
const studentStore = useStudentStore()

const toggleSidebar = inject('toggleSidebar')
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
}
</style>
