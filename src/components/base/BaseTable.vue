<template>
  <div class="w-full overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-100 text-left text-sm text-slate-600">
      <thead class="bg-slate-50 uppercase text-xxs font-bold text-slate-400 tracking-widest border-b border-slate-100">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            class="px-6 py-4.5 font-bold sticky top-0 bg-slate-50 z-10 border-b border-slate-100"
            :class="[
              col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
              col.class || ''
            ]"
          >
            <slot :name="`header-${col.key}`" :column="col">
              {{ col.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-dashed divide-slate-200/80 bg-white">
        <template v-if="loading">
          <tr v-for="i in 5" :key="`skeleton-${i}`" class="animate-pulse">
            <td v-for="col in columns" :key="`sk-td-${col.key}`" class="px-6 py-4.5">
              <div class="h-4 bg-slate-100 rounded w-2/3"></div>
            </td>
          </tr>
        </template>
        <template v-else-if="items.length === 0">
          <tr>
            <td :colspan="columns.length" class="px-6 py-12 text-center">
              <slot name="empty">
                <div class="flex flex-col items-center justify-center text-slate-400">
                  <svg class="h-10 w-10 stroke-1 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-3.5 3.5a2 2 0 01-2.828 0L9 15m3 5v-3" />
                  </svg>
                  <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Không có dữ liệu</span>
                </div>
              </slot>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(item, idx) in items"
            :key="item.id || idx"
            class="hover:bg-slate-50/50 transition-colors duration-150"
          >
            <td
              v-for="col in columns"
              :key="`cell-${col.key}`"
              class="px-6 py-4.5 whitespace-nowrap align-middle"
              :class="[
                col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                col.cellClass || ''
              ]"
            >
              <slot :name="`cell-${col.key}`" :item="item" :index="idx">
                {{ item[col.key] }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.text-xxs {
  font-size: 0.7rem;
}
</style>
