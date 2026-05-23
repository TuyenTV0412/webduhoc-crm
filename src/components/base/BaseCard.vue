<template>
  <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <!-- Header -->
    <div
      v-if="$slots.header || title"
      class="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white"
    >
      <slot name="header">
        <h3 class="text-base font-bold text-slate-800 tracking-wide">{{ title }}</h3>
      </slot>
    </div>

    <!-- Body -->
    <div :class="[noPadding ? 'p-0' : 'p-6', bodyClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
  bodyClass: {
    type: String,
    default: '',
  },
})
</script>
