<template>
  <div class="flex flex-col items-center justify-center py-14 px-4 text-center">
    <div class="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 mb-4 animate-bounce-gentle">
      <svg class="h-8 w-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h3 class="text-sm font-bold text-slate-700 mb-1.5 uppercase tracking-wider">{{ title }}</h3>
    <p class="text-xs text-slate-400 max-w-sm font-medium">{{ description }}</p>
    <div v-if="$slots.default" class="mt-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Không tìm thấy kết quả',
  },
  description: {
    type: String,
    default: 'Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc thử bộ lọc khác.',
  },
})
</script>

<style scoped>
.animate-bounce-gentle {
  animation: bounce-gentle 3s infinite ease-in-out;
}

@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
