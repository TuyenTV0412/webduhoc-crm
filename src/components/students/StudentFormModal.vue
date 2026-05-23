<template>
  <BaseModal
    :show="show"
    :title="isEdit ? 'Cập nhật thông tin học viên' : 'Thêm học viên mới'"
    size="lg"
    @close="close"
  >
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Full Name -->
        <div class="md:col-span-2">
          <BaseInput
            v-model="form.full_name"
            label="Họ và tên *"
            placeholder="Nhập họ và tên học viên (ví dụ: Nguyễn Văn An)"
            :error="errors.full_name"
            :disabled="saving"
          />
        </div>

        <!-- Gender -->
        <BaseSelect
          v-model="form.gender"
          label="Giới tính *"
          placeholder="Chọn giới tính"
          :options="genderOptions"
          :error="errors.gender"
          :disabled="saving"
        />

        <!-- Phone -->
        <BaseInput
          v-model="form.phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại (ví dụ: 0912.345.678)"
          :error="errors.phone"
          :disabled="saving"
        />

        <!-- Order (Đơn hàng) -->
        <BaseSelect
          v-model="form.order_id"
          label="Đơn hàng Nhật Bản"
          placeholder="Chọn đơn hàng ứng tuyển"
          :options="orderOptions"
          :disabled="saving"
        />

        <!-- Status -->
        <BaseSelect
          v-model="form.status_id"
          label="Trạng thái hồ sơ *"
          placeholder="Chọn trạng thái hiện tại"
          :options="statusOptions"
          :error="errors.status_id"
          :disabled="saving"
        />

        <!-- Japanese Level -->
        <BaseSelect
          v-model="form.japanese_level_id"
          label="Trình độ Tiếng Nhật"
          placeholder="Chọn trình độ hiện tại"
          :options="levelOptions"
          :disabled="saving"
        />

        <!-- Departure Date -->
        <BaseInput
          v-model="form.departure_date"
          type="date"
          label="Ngày xuất cảnh"
          :disabled="saving"
        />
      </div>
    </form>

    <!-- Footer actions -->
    <template #footer>
      <BaseButton
        variant="secondary"
        :disabled="saving"
        @click="close"
      >
        Hủy bỏ
      </BaseButton>
      <BaseButton
        variant="primary"
        :loading="saving"
        @click="handleSubmit"
      >
        {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '../base/BaseModal.vue'
import BaseInput from '../base/BaseInput.vue'
import BaseSelect from '../base/BaseSelect.vue'
import BaseButton from '../base/BaseButton.vue'
import { useStudentStore } from '../../stores/student.store'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  student: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'saved'])

const studentStore = useStudentStore()

const isEdit = computed(() => !!props.student)
const saving = ref(false)

const form = ref({
  full_name: '',
  gender: '',
  phone: '',
  order_id: '',
  status_id: '',
  japanese_level_id: '',
  departure_date: ''
})

const errors = ref({
  full_name: '',
  gender: '',
  phone: '',
  status_id: ''
})

// Gender select options
const genderOptions = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' }
]

// Metadata options mapped for BaseSelect
const orderOptions = computed(() => {
  return studentStore.metaOrders.map(o => ({ value: o.id, label: `${o.name} (${o.country})` }))
})

const statusOptions = computed(() => {
  return studentStore.metaStatuses.map(s => ({ value: s.id, label: s.name }))
})

const levelOptions = computed(() => {
  return studentStore.metaJapaneseLevels.map(l => ({ value: l.id, label: l.level }))
})

// Synchronize form when modal opens or editing student changes
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    resetErrors()
    if (props.student) {
      // Populating for Edit mode
      form.value = {
        full_name: props.student.full_name || '',
        gender: props.student.gender || '',
        phone: props.student.phone || '',
        order_id: props.student.order_id || '',
        status_id: props.student.status_id || '',
        japanese_level_id: props.student.japanese_level_id || '',
        departure_date: props.student.departure_date || ''
      }
    } else {
      // Populating defaults for Create mode
      form.value = {
        full_name: '',
        gender: 'male',
        phone: '',
        order_id: '',
        status_id: '',
        japanese_level_id: '',
        departure_date: ''
      }
      
      // Auto select first status option if available
      if (studentStore.metaStatuses.length > 0) {
        form.value.status_id = studentStore.metaStatuses[0].id
      }
      // Auto select first level option if available
      if (studentStore.metaJapaneseLevels.length > 0) {
        form.value.japanese_level_id = studentStore.metaJapaneseLevels[0].id
      }
    }
  }
}, { immediate: true })

const resetErrors = () => {
  errors.value = {
    full_name: '',
    gender: '',
    phone: '',
    status_id: ''
  }
}

const validate = () => {
  resetErrors()
  let isValid = true

  if (!form.value.full_name.trim()) {
    errors.value.full_name = 'Họ và tên không được để trống.'
    isValid = false
  }
  if (!form.value.gender) {
    errors.value.gender = 'Vui lòng chọn giới tính.'
    isValid = false
  }
  if (!form.value.status_id) {
    errors.value.status_id = 'Vui lòng chọn trạng thái hồ sơ.'
    isValid = false
  }
  
  if (form.value.phone.trim()) {
    const cleanedPhone = form.value.phone.replace(/[\.\-\s]/g, '')
    if (cleanedPhone && isNaN(cleanedPhone)) {
      errors.value.phone = 'Số điện thoại không hợp lệ.'
      isValid = false
    }
  }

  return isValid
}

const close = () => {
  if (saving.value) return
  emit('close')
}

const handleSubmit = async () => {
  if (!validate()) return

  saving.value = true
  try {
    const payload = { ...form.value }
    // Clean optional empty strings to nulls
    if (!payload.order_id) payload.order_id = null
    if (!payload.japanese_level_id) payload.japanese_level_id = null
    if (!payload.departure_date) payload.departure_date = null

    if (isEdit.value) {
      await studentStore.editStudent(props.student.id, payload)
    } else {
      await studentStore.addStudent(payload)
    }
    emit('saved')
    emit('close')
  } catch (err) {
    console.error('Error saving form data:', err)
  } finally {
    saving.value = false
  }
}
</script>
