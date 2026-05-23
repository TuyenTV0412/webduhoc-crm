<template>
  <span
    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold leading-none tracking-wide transition-all"
    :class="[variantClasses[variant] || variantClasses.gray]"
  >
    <!-- Dot marker -->
    <span
      v-if="dot"
      class="w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0 animate-pulse-subtle"
      :class="[dotClasses[variant] || dotClasses.gray]"
    ></span>
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'gray',
    validator: (v) => ['gray', 'blue', 'yellow', 'green', 'purple', 'red'].includes(v),
  },
  dot: {
    type: Boolean,
    default: false,
  },
})

const variantClasses = {
  gray: 'bg-slate-100 text-slate-600 border border-slate-200/50',
  blue: 'bg-blue-50 text-blue-700 border border-blue-100/50',
  yellow: 'bg-amber-50 text-amber-700 border border-amber-100/50',
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-100/50',
  purple: 'bg-purple-50 text-purple-700 border border-purple-100/50',
  red: 'bg-red-50 text-red-700 border border-red-100/50',
}

const dotClasses = {
  gray: 'bg-slate-400',
  blue: 'bg-blue-500',
  yellow: 'bg-amber-500',
  green: 'bg-emerald-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
}
</script>

<style scoped>
.animate-pulse-subtle {
  animation: pulse-opacity 2s infinite ease-in-out;
}

@keyframes pulse-opacity {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
