<template>
  <div
    class="flex items-center justify-center rounded-full text-white font-bold tracking-wider select-none shrink-0 overflow-hidden"
    :class="[sizeClasses[size], !image || imageError ? bgClass : '']"
  >
    <img
      v-if="image && !imageError"
      :src="image"
      :alt="name"
      class="w-full h-full object-cover"
      @error="imageError = true"
    />
    <span v-else>{{ initials }}</span>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v),
  },
})

const imageError = ref(false)

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
}

const initials = computed(() => {
  if (!props.name) return '?'
  const parts = props.name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  
  const last = parts[parts.length - 1]
  const secondLast = parts[parts.length - 2]
  return (secondLast.substring(0, 1) + last.substring(0, 1)).toUpperCase()
})

// Generate deterministic background color based on name
const bgClass = computed(() => {
  if (!props.name) return 'bg-slate-400'
  const charSum = props.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const colors = [
    'bg-blue-600',
    'bg-emerald-600',
    'bg-purple-600',
    'bg-amber-600',
    'bg-indigo-600',
    'bg-rose-600',
    'bg-sky-600',
    'bg-teal-600'
  ]
  return colors[charSum % colors.length]
})
</script>
