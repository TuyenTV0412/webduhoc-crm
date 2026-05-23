<template>
  <aside class="w-72 bg-[#111C44] text-white flex flex-col h-screen overflow-y-auto shrink-0 select-none border-r border-navy-950/20">
    <!-- Brand / Title -->
    <div class="px-7 py-6 flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-primary-600/30">
        A
      </div>
      <div>
        <h1 class="text-base font-extrabold tracking-widest text-white leading-none">ALADDIN</h1>
        <p class="text-xxs text-slate-400 font-semibold tracking-wider uppercase mt-1">CRM SYSTEM - V2.4</p>
      </div>
    </div>

    <!-- User Profile Card -->
    <div class="px-6 py-5 border-b border-navy-800/30 bg-[#0c1432]/30 flex items-center gap-3.5">
      <div class="relative shrink-0">
        <BaseAvatar name="Nguyễn Minh Đăng" size="md" />
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#111C44]"></span>
      </div>
      <div class="overflow-hidden">
        <h4 class="text-sm font-bold text-white leading-snug truncate">Nguyễn Minh Đăng</h4>
        <p class="text-xxs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Quản trị viên</p>
      </div>
    </div>

    <!-- Menu List -->
    <nav class="flex-1 px-4 py-6 scrollbar-thin">
      <!-- OVERVIEW GROUP -->
      <div class="mb-6">
        <p class="text-xxs font-extrabold text-slate-500 tracking-widest uppercase px-4 mb-2.5">Tổng quan</p>
        <SidebarItem to="/dashboard" label="Dashboard" :icon="LayoutDashboard" />
        <SidebarItem to="/calendar" label="Lịch & Sự kiện" :icon="CalendarRange" badge="3" />
      </div>

      <!-- MANAGEMENT GROUP -->
      <div class="mb-6">
        <p class="text-xxs font-extrabold text-slate-500 tracking-widest uppercase px-4 mb-2.5">Quản lý</p>
        <SidebarItem to="/students" label="Học viên" :icon="Users" :badge="studentStore.students.length" />
        <SidebarItem to="/orders" label="Đơn hàng Nhật Bản" :icon="Briefcase" />
        <SidebarItem to="/progress" label="Tiến trình hồ sơ" :icon="FileText" />
        <SidebarItem to="/tuition" label="Học phí & Chi phí" :icon="CreditCard" badge="5" />
      </div>

      <!-- SUPPORT GROUP -->
      <div>
        <p class="text-xxs font-extrabold text-slate-500 tracking-widest uppercase px-4 mb-2.5">Hỗ trợ</p>
        <SidebarItem to="/notifications" label="Thông báo" :icon="Bell" badge="12" />
        <SidebarItem to="/permissions" label="Tài khoản & Quyền" :icon="ShieldCheck" />
        <SidebarItem to="/reports" label="Báo cáo" :icon="PieChart" />
      </div>
    </nav>

    <!-- Bottom Actions -->
    <div class="p-4 border-t border-navy-800/40 bg-[#0c1432]/30 flex flex-col gap-1">
      <!-- Dark mode toggle -->
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-navy-800/50 transition duration-150 font-semibold text-sm"
        @click="isDark = !isDark"
      >
        <div class="flex items-center gap-3">
          <component :is="isDark ? Sun : Moon" class="h-5 w-5 shrink-0" />
          <span>{{ isDark ? 'Giao diện Sáng' : 'Giao diện Tối' }}</span>
        </div>
        <span class="text-xxs font-bold bg-[#1B254B] text-slate-400 px-2 py-0.5 rounded-full shrink-0">Beta</span>
      </button>

      <!-- Help link -->
      <a
        href="#"
        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-navy-800/50 transition duration-150 font-semibold text-sm"
      >
        <HelpCircle class="h-5 w-5 shrink-0" />
        <span>Hỗ trợ</span>
      </a>

      <!-- Logout -->
      <a
        href="#"
        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition duration-150 font-semibold text-sm"
      >
        <LogOut class="h-5 w-5 shrink-0" />
        <span>Đăng xuất</span>
      </a>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import {
  LayoutDashboard,
  CalendarRange,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  Bell,
  ShieldCheck,
  PieChart,
  Moon,
  Sun,
  HelpCircle,
  LogOut
} from 'lucide-vue-next'
import SidebarItem from './SidebarItem.vue'
import BaseAvatar from '../base/BaseAvatar.vue'
import { useStudentStore } from '../../stores/student.store'

const studentStore = useStudentStore()
const isDark = ref(false)
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #1b254b;
  border-radius: 2px;
}
</style>
