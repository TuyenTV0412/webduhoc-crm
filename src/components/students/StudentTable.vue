<template>
  <BaseTable :columns="columns" :items="items" :loading="loading">
    <!-- Cell Student Profile -->
    <template #cell-full_name="{ item }">
      <div class="flex items-center gap-3">
        <BaseAvatar :name="item.full_name" :image="item.avatar_url" size="md" />
        <div>
          <p class="font-bold text-slate-700 leading-snug hover:text-primary-600 transition cursor-pointer">
            {{ item.full_name }}
          </p>
          <span class="text-xxs font-semibold text-slate-400 block mt-0.5">{{ item.student_code }}</span>
        </div>
      </div>
    </template>

    <!-- Cell Gender -->
    <template #cell-gender="{ item }">
      <span class="font-semibold text-slate-600">
        {{ item.gender === 'male' ? 'Nam' : 'Nữ' }}
      </span>
    </template>

    <!-- Cell Phone -->
    <template #cell-phone="{ item }">
      <span class="font-semibold text-slate-600 tracking-wide">
        {{ item.phone || '—' }}
      </span>
    </template>

    <!-- Cell Order -->
    <template #cell-order_id="{ item }">
      <span class="font-semibold text-slate-600">
        {{ item.orders?.name || '—' }}
      </span>
    </template>

    <!-- Cell Status -->
    <template #cell-status_id="{ item }">
      <BaseBadge
        :variant="getStatusVariant(item.student_statuses?.code)"
        dot
      >
        {{ item.student_statuses?.name || 'Chưa cập nhật' }}
      </BaseBadge>
    </template>

    <!-- Cell Japanese Level -->
    <template #cell-japanese_level_id="{ item }">
      <span class="font-bold text-slate-600">
        {{ item.japanese_levels?.level || '—' }}
      </span>
    </template>

    <!-- Cell Departure Date -->
    <template #cell-departure_date="{ item }">
      <span class="font-semibold text-slate-500">
        {{ formatDate(item.departure_date) }}
      </span>
    </template>

    <!-- Cell Actions -->
    <template #cell-actions="{ item }">
      <div class="flex items-center gap-2 justify-center">
        <!-- View details -->
        <BaseIconButton variant="info" title="Xem chi tiết" @click="$emit('view', item)">
          <Eye class="h-4 w-4" />
        </BaseIconButton>
        
        <!-- Edit details -->
        <BaseIconButton variant="warning" title="Sửa" @click="$emit('edit', item)">
          <Pencil class="h-4 w-4" />
        </BaseIconButton>

        <!-- Delete details -->
        <BaseIconButton variant="danger" title="Xóa" @click="$emit('delete', item)">
          <Trash2 class="h-4 w-4" />
        </BaseIconButton>
      </div>
    </template>
  </BaseTable>
</template>

<script setup>
import { Eye, Pencil, Trash2 } from 'lucide-vue-next'
import BaseTable from '../base/BaseTable.vue'
import BaseAvatar from '../base/BaseAvatar.vue'
import BaseBadge from '../base/BaseBadge.vue'
import BaseIconButton from '../base/BaseIconButton.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['view', 'edit', 'delete'])

const columns = [
  { key: 'full_name', label: 'Học viên', align: 'left' },
  { key: 'gender', label: 'Giới tính', align: 'left' },
  { key: 'phone', label: 'SĐT', align: 'left' },
  { key: 'order_id', label: 'Đơn hàng', align: 'left' },
  { key: 'status_id', label: 'Trạng thái', align: 'left' },
  { key: 'japanese_level_id', label: 'Tiếng Nhật', align: 'center' },
  { key: 'departure_date', label: 'Ngày xuất cảnh', align: 'left' },
  { key: 'actions', label: 'Thao tác', align: 'center', class: 'w-24' }
]

const getStatusVariant = (code) => {
  const map = {
    NEW: 'gray',
    STUDYING: 'blue',
    WAITING_INTERVIEW: 'yellow',
    PASSED: 'green',
    DEPARTED: 'purple'
  }
  return map[code] || 'gray'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return '—'
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  } catch {
    return '—'
  }
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem;
}
</style>
