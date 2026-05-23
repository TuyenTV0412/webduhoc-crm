<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4.5 border-t border-slate-100 bg-white select-none text-slate-500 font-semibold text-xs leading-none">
    <!-- Left: Total Records Count -->
    <div>
      Tổng: <span class="font-bold text-slate-800">{{ totalItems }}</span> bản ghi
    </div>

    <!-- Right: Page size control, current range and chevronic buttons -->
    <div class="flex items-center gap-5 sm:gap-6 flex-wrap sm:flex-nowrap">
      <!-- Page size select dropdown -->
      <div class="flex items-center gap-2">
        <span class="text-slate-400">Số bản ghi/trang</span>
        <div class="relative">
          <select
            :value="pageSize"
            class="bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer appearance-none text-xs"
            @change="$emit('update:pageSize', parseInt($event.target.value))"
          >
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
          <!-- Custom down arrow indicator -->
          <span class="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
            <ChevronDown class="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <!-- Current items range display text -->
      <div class="text-slate-700 font-bold">
        {{ startCount }} - {{ endCount }} bản ghi
      </div>

      <!-- Navigational Arrow buttons (matches photo < > ) -->
      <div class="flex items-center gap-2.5">
        <!-- Prev button -->
        <button
          type="button"
          class="p-1 rounded-lg hover:bg-slate-50 transition duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent text-slate-600"
          :disabled="currentPage === 1"
          @click="$emit('update:currentPage', currentPage - 1)"
        >
          <ChevronLeft class="h-4 w-4 stroke-[2.5]" />
        </button>

        <!-- Next button -->
        <button
          type="button"
          class="p-1 rounded-lg hover:bg-slate-50 transition duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent text-slate-600"
          :disabled="currentPage === totalPages"
          @click="$emit('update:currentPage', currentPage + 1)"
        >
          <ChevronRight class="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
})

defineEmits(['update:currentPage', 'update:pageSize'])

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.pageSize) || 1
})

const startCount = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.pageSize + 1
})

const endCount = computed(() => {
  const max = props.currentPage * props.pageSize
  return max > props.totalItems ? props.totalItems : max
})
</script>
