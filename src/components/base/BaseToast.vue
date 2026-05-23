<template>
  <div class="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 px-4.5 py-3.5 rounded-xl shadow-xl border bg-white text-xs font-bold select-none transform transition-all duration-300 border-slate-100"
        :class="[
          toast.type === 'danger'
            ? 'text-red-600 shadow-red-500/5'
            : toast.type === 'warning'
            ? 'text-amber-600 shadow-amber-500/5'
            : 'text-emerald-600 shadow-emerald-500/5'
        ]"
      >
        <!-- Icon -->
        <component
          :is="toast.type === 'danger' ? AlertTriangle : toast.type === 'warning' ? AlertCircle : CheckCircle"
          class="h-5 w-5 shrink-0"
          :class="[
            toast.type === 'danger' ? 'text-red-500' : toast.type === 'warning' ? 'text-amber-500' : 'text-emerald-500'
          ]"
        />

        <!-- Message -->
        <span class="flex-1 leading-snug tracking-wide">{{ toast.message }}</span>

        <!-- Dismiss button -->
        <button
          type="button"
          class="text-slate-400 hover:text-slate-600 transition p-0.5 rounded-lg hover:bg-slate-50"
          @click="toastStore.remove(toast.id)"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast.store'

const toastStore = useToastStore()
</script>

<style scoped>
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}
.toast-leave-active {
  position: absolute;
}
</style>
