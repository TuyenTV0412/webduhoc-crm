<template>
  <div class="flex flex-wrap items-center gap-3 mb-6 select-none">
    <button
      v-for="tab in tabs"
      :key="tab.code"
      type="button"
      class="px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 focus:outline-none flex items-center gap-2 tracking-wide cursor-pointer border"
      :class="[
        studentStore.selectedStatusTab === tab.code
          ? 'bg-navy-900 text-white border-navy-900 shadow-md shadow-navy-900/10'
          : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-200/80 hover:text-slate-700'
      ]"
      @click="studentStore.selectedStatusTab = tab.code"
    >
      <span>{{ tab.label }}</span>
      <span
        class="text-xxs px-2 py-0.5 rounded-full font-extrabold tracking-normal animate-fade-in"
        :class="[
          studentStore.selectedStatusTab === tab.code
            ? 'bg-primary-600 text-white'
            : 'bg-slate-100 text-slate-500'
        ]"
      >
        {{ studentStore.statusCounts[tab.code] || 0 }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { useStudentStore } from '../../stores/student.store'

const studentStore = useStudentStore()

const tabs = [
  { label: 'Tất cả', code: 'ALL' },
  { label: 'Đang học', code: 'STUDYING' },
  { label: 'Chờ PV', code: 'WAITING_INTERVIEW' },
  { label: 'Trúng tuyển', code: 'PASSED' },
  { label: 'Xuất cảnh', code: 'DEPARTED' }
]
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
}
</style>
