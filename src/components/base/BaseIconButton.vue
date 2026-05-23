<template>
  <button
    type="button"
    class="p-1.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
    :class="[
      variantClasses[variant] || variantClasses.info,
    ]"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'warning', 'danger'].includes(v),
  },
})

defineEmits(['click'])

const variantClasses = {
  info: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100/70 focus:ring-blue-500',
  warning: 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100/70 focus:ring-amber-500',
  danger: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100/70 focus:ring-red-500',
}
</script>
