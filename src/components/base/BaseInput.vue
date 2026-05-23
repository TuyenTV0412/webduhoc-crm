<template>
  <div class="w-full">
    <label v-if="label" class="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
      {{ label }}
    </label>
    <div class="relative rounded-lg shadow-sm">
      <!-- Icon Left -->
      <div v-if="$slots.iconLeft" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <slot name="iconLeft"></slot>
      </div>

      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="block w-full rounded-lg border text-sm transition-all focus:border-primary-500 focus:ring-primary-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-100"
        :class="[
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300' : 'border-slate-200 text-slate-800 placeholder-slate-400',
          $slots.iconLeft ? 'pl-10' : 'pl-3.5',
          $slots.iconRight ? 'pr-10' : 'pr-3.5',
          'py-2'
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <!-- Icon Right -->
      <div v-if="$slots.iconRight" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
        <slot name="iconRight"></slot>
      </div>
    </div>
    
    <!-- Error Text -->
    <p v-if="error" class="mt-1.5 text-xs text-red-600 font-medium">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

defineEmits(['update:modelValue'])
</script>
