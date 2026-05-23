<template>
  <div
    :class="[
      overlay ? 'absolute inset-0 bg-white/70 backdrop-blur-xxs z-30 flex items-center justify-center' : 'py-8 flex flex-col items-center justify-center'
    ]"
  >
    <div class="flex flex-col items-center">
      <!-- Premium CSS Spinner -->
      <div class="relative w-10 h-10">
        <div class="absolute w-full h-full rounded-full border-4 border-slate-100"></div>
        <div class="absolute w-full h-full rounded-full border-4 border-t-primary-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      <p v-if="message" class="mt-3 text-xs font-semibold text-slate-500 uppercase tracking-widest">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: 'Đang tải dữ liệu...',
  },
})
</script>

<style scoped>
.backdrop-blur-xxs {
  backdrop-filter: blur(1px);
}
</style>
