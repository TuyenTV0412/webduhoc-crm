<template>
  <BaseModal
    :show="show"
    title="Xác nhận xóa học viên"
    size="sm"
    @close="close"
  >
    <div class="space-y-4">
      <div class="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-100 mx-auto">
        <AlertTriangle class="h-6 w-6" />
      </div>
      <div class="text-center">
        <h4 class="text-sm font-bold text-slate-800">
          Bạn có chắc chắn muốn xóa học viên này?
        </h4>
        <p class="text-xs text-slate-400 mt-2 font-medium">
          Học viên <span class="text-slate-600 font-bold">{{ student?.full_name }}</span> ({{ student?.student_code }}) sẽ bị xóa vĩnh viễn khỏi hệ thống. Hành động này không thể hoàn tác.
        </p>
      </div>
    </div>

    <!-- Footer actions -->
    <template #footer>
      <BaseButton
        variant="secondary"
        :disabled="deleting"
        @click="close"
      >
        Hủy bỏ
      </BaseButton>
      <BaseButton
        variant="danger"
        :loading="deleting"
        @click="handleDelete"
      >
        Đồng ý xóa
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import { AlertTriangle } from 'lucide-vue-next'
import BaseModal from '../base/BaseModal.vue'
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

const emit = defineEmits(['close', 'deleted'])

const studentStore = useStudentStore()
const deleting = ref(false)

const close = () => {
  if (deleting.value) return
  emit('close')
}

const handleDelete = async () => {
  if (!props.student) return

  deleting.value = true
  try {
    await studentStore.removeStudent(props.student.id)
    emit('deleted')
    emit('close')
  } catch (err) {
    console.error('Error deleting student:', err)
  } finally {
    deleting.value = false
  }
}
</script>
