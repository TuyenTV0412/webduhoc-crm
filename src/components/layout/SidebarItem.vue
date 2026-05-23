<template>
  <router-link
    v-slot="{ isActive }"
    :to="to"
    class="group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer select-none font-semibold text-sm mb-1.5"
  >
    <div
      class="flex items-center gap-3 transition-colors"
      :class="[isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200']"
    >
      <component :is="icon" class="h-5 w-5 shrink-0" />
      <span>{{ label }}</span>
    </div>
    
    <!-- Optional Badge -->
    <span
      v-if="badge"
      class="text-xxs font-bold px-2 py-0.5 rounded-full shrink-0"
      :class="[
        isActive ? 'bg-primary-700 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
      ]"
    >
      {{ badge }}
    </span>
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
  badge: {
    type: [String, Number],
    default: '',
  },
})
</script>

<style scoped>
.router-link-active {
  background-color: #ea580c; /* Main active color matching orange-red */
  box-shadow: 0 4px 14px 0 rgba(234, 88, 12, 0.35);
}
.text-xxs {
  font-size: 0.65rem;
}
</style>
