<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5.5 select-none">
    <!-- Card title -->
    <h3 class="text-base font-bold text-slate-800 tracking-wide uppercase">
      Danh sách học viên
    </h3>

    <!-- Toolbar actions -->
    <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
      <!-- Search Input inside Card -->
      <div class="relative flex-1 sm:flex-none sm:w-64">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search class="h-4 w-4" />
        </span>
        <input
          v-model="studentStore.searchQuery"
          type="text"
          placeholder="Tìm theo tên, mã HV..."
          class="block w-full pl-9 pr-3.5 py-1.5 border border-slate-200 rounded-lg text-xs transition-all focus:border-primary-500 focus:ring-primary-500 bg-white placeholder-slate-400 font-semibold"
        />
      </div>

      <!-- Filter Button (UI only) -->
      <BaseButton variant="secondary" size="sm" class="h-9 px-3.5 font-bold">
        <template #iconLeft>
          <SlidersHorizontal class="h-4 w-4" />
        </template>
        Lọc
      </BaseButton>

      <!-- Export Excel (UI only) -->
      <BaseButton variant="secondary" size="sm" class="h-9 px-3.5 font-bold text-blue-600 border-blue-100 bg-blue-50/20 hover:bg-blue-50/50">
        <template #iconLeft>
          <Download class="h-4 w-4" />
        </template>
        Xuất Excel
      </BaseButton>

      <!-- Add Student -->
      <BaseButton variant="primary" size="sm" class="h-9 px-4 font-bold text-white shadow-md shadow-primary-600/10" @click="$emit('add')">
        <template #iconLeft>
          <Plus class="h-4.5 w-4.5 stroke-[2.5]" />
        </template>
        Thêm học viên
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { Search, SlidersHorizontal, Download, Plus } from 'lucide-vue-next'
import { useStudentStore } from '../../stores/student.store'
import BaseButton from '../base/BaseButton.vue'

const studentStore = useStudentStore()

defineEmits(['add'])
</script>
