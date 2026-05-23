<template>
  <div class="w-full">
    <label v-if="label" class="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
      {{ label }}
    </label>
    <div class="relative rounded-lg shadow-sm">
      <select
        :value="modelValue"
        :disabled="disabled"
        class="block w-full rounded-lg border text-sm transition-all focus:border-primary-500 focus:ring-primary-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-100 py-2 pl-3.5 pr-10 appearance-none bg-no-repeat bg-right"
        :class="[
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900' : 'border-slate-200 text-slate-800',
        ]"
        style="background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236B7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E'); background-position: right 0.5rem center; background-size: 1.25rem 1.25rem;"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
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
  options: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
