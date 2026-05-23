<template>
  <div class="space-y-3.5 flex-1 flex flex-col min-h-0">
    <!-- Top Filter Status Pills -->
    <StudentStatusTabs class="shrink-0" />

    <!-- Error Alert banner if any -->
    <div
      v-if="studentStore.error"
      class="bg-red-50 border border-red-100 text-red-700 text-sm font-semibold px-6 py-4.5 rounded-2xl flex items-center justify-between shrink-0"
    >
      <div class="flex items-center gap-2.5">
        <AlertCircle class="h-5 w-5 shrink-0" />
        <span>{{ studentStore.error }}</span>
      </div>
      <button
        type="button"
        class="text-red-400 hover:text-red-600 transition"
        @click="studentStore.error = null"
      >
        <X class="h-5 w-5" />
      </button>
    </div>

    <!-- Main Table Card Container -->
    <BaseCard noPadding class="flex-1 flex flex-col min-h-0" bodyClass="flex-1 flex flex-col min-h-0">
      <!-- Toolbar containing card headers, inputs, buttons -->
      <div class="px-6 pt-5 shrink-0">
        <StudentToolbar @add="openCreateModal" />
      </div>

      <!-- Data Table or Loading or Empty panel -->
      <div class="relative flex-1 flex flex-col min-h-0 mt-1.5">
        <!-- Loading spinner overlay -->
        <BaseLoading v-if="studentStore.loading && studentStore.students.length === 0" />

        <!-- Table displaying actual data -->
        <div v-else-if="studentStore.filteredStudents.length > 0" class="flex-1 flex flex-col min-h-0">
          <!-- Scrollable table container -->
          <div class="flex-1 overflow-y-auto overflow-x-auto relative">
            <StudentTable
              :items="studentStore.paginatedStudents"
              :loading="studentStore.loading"
              @view="openViewModal"
              @edit="openEditModal"
              @delete="openDeleteModal"
            />
          </div>

          <!-- Custom Pagination Footer -->
          <BasePagination
            v-model:currentPage="studentStore.currentPage"
            v-model:pageSize="studentStore.pageSize"
            :totalItems="studentStore.totalFiltered"
            class="shrink-0"
          />
        </div>

        <!-- Empty state placeholder -->
        <BaseEmptyState
          v-else
          title="Không tìm thấy học viên nào"
          description="Không tìm thấy dữ liệu học viên khớp với tìm kiếm hoặc bộ lọc hiện tại. Thử đổi bộ lọc hoặc thêm học viên mới."
          class="flex-1 flex flex-col justify-center items-center"
        >
          <BaseButton variant="primary" size="sm" class="font-bold" @click="openCreateModal">
            <template #iconLeft>
              <Plus class="h-4.5 w-4.5 stroke-[2.5]" />
            </template>
            Thêm học viên ngay
          </BaseButton>
        </BaseEmptyState>
      </div>
    </BaseCard>

    <!-- Student Detail View Modal (Read-only Detail view) -->
    <BaseModal
      :show="showViewModal"
      title="Thông tin chi tiết học viên"
      size="md"
      @close="showViewModal = false"
    >
      <div v-if="activeStudent" class="space-y-6">
        <!-- Top profile header -->
        <div class="flex items-center gap-4 border-b border-slate-100 pb-5">
          <BaseAvatar :name="activeStudent.full_name" :image="activeStudent.avatar_url" size="lg" />
          <div>
            <h4 class="text-base font-bold text-slate-800 leading-snug">{{ activeStudent.full_name }}</h4>
            <span class="text-xs font-semibold text-slate-400 mt-1 block">{{ activeStudent.student_code }}</span>
          </div>
        </div>

        <!-- Meta fields list -->
        <div class="grid grid-cols-2 gap-y-4.5 gap-x-4 text-xs font-semibold">
          <div>
            <span class="block text-slate-400 uppercase tracking-wider mb-1">Giới tính</span>
            <span class="text-slate-700 text-sm font-bold">{{ activeStudent.gender === 'male' ? 'Nam' : 'Nữ' }}</span>
          </div>
          
          <div>
            <span class="block text-slate-400 uppercase tracking-wider mb-1">Số điện thoại</span>
            <span class="text-slate-700 text-sm font-bold">{{ activeStudent.phone || '—' }}</span>
          </div>

          <div>
            <span class="block text-slate-400 uppercase tracking-wider mb-1">Đơn hàng ứng tuyển</span>
            <span class="text-slate-700 text-sm font-bold">{{ activeStudent.orders?.name || '—' }}</span>
          </div>

          <div>
            <span class="block text-slate-400 uppercase tracking-wider mb-1">Trạng thái hồ sơ</span>
            <div class="mt-0.5">
              <BaseBadge :variant="getStatusVariant(activeStudent.student_statuses?.code)" dot>
                {{ activeStudent.student_statuses?.name || '—' }}
              </BaseBadge>
            </div>
          </div>

          <div>
            <span class="block text-slate-400 uppercase tracking-wider mb-1">Trình độ Tiếng Nhật</span>
            <span class="text-slate-700 text-sm font-extrabold">{{ activeStudent.japanese_levels?.level || '—' }}</span>
          </div>

          <div>
            <span class="block text-slate-400 uppercase tracking-wider mb-1">Ngày xuất cảnh</span>
            <span class="text-slate-700 text-sm font-bold">{{ formatDate(activeStudent.departure_date) }}</span>
          </div>

          <div class="col-span-2 border-t border-slate-100 pt-4.5 flex gap-5 text-slate-400 font-medium">
            <span>Ngày đăng ký: {{ formatDate(activeStudent.created_at) }}</span>
            <span>Cập nhật: {{ formatDate(activeStudent.updated_at || activeStudent.created_at) }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="showViewModal = false">
          Đóng lại
        </BaseButton>
        <BaseButton variant="primary" class="font-bold" @click="promoteEditFromView">
          <template #iconLeft>
            <Pencil class="h-4 w-4" />
          </template>
          Chỉnh sửa
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Student Form Modal (Create / Edit form) -->
    <StudentFormModal
      :show="showFormModal"
      :student="activeStudent"
      @close="closeFormModal"
      @saved="handleSaved"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteStudentModal
      :show="showDeleteModal"
      :student="activeStudent"
      @close="closeDeleteModal"
      @deleted="handleDeleted"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { AlertCircle, X, Plus, Pencil } from 'lucide-vue-next'
import { useStudentStore } from '../stores/student.store'
import { useToastStore } from '../stores/toast.store'
import StudentStatusTabs from '../components/students/StudentStatusTabs.vue'
import StudentToolbar from '../components/students/StudentToolbar.vue'
import StudentTable from '../components/students/StudentTable.vue'
import StudentFormModal from '../components/students/StudentFormModal.vue'
import DeleteStudentModal from '../components/students/DeleteStudentModal.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseModal from '../components/base/BaseModal.vue'
import BaseBadge from '../components/base/BaseBadge.vue'
import BaseAvatar from '../components/base/BaseAvatar.vue'
import BaseLoading from '../components/base/BaseLoading.vue'
import BaseEmptyState from '../components/base/BaseEmptyState.vue'
import BasePagination from '../components/base/BasePagination.vue'

const studentStore = useStudentStore()
const toastStore = useToastStore()

const showViewModal = ref(false)
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const activeStudent = ref(null)

onMounted(async () => {
  // Fetch initial dropdown metadata and students lists on startup
  await Promise.all([
    studentStore.fetchMetadata(),
    studentStore.fetchStudents()
  ])
})

// Reset pagination to first page when search queries or filters change
watch(() => studentStore.searchQuery, () => {
  studentStore.currentPage = 1
})
watch(() => studentStore.selectedStatusTab, () => {
  studentStore.currentPage = 1
})

const openCreateModal = () => {
  activeStudent.value = null
  showFormModal.value = true
}

const openViewModal = (student) => {
  activeStudent.value = student
  showViewModal.value = true
}

const openEditModal = (student) => {
  activeStudent.value = student
  showFormModal.value = true
}

const openDeleteModal = (student) => {
  activeStudent.value = student
  showDeleteModal.value = true
}

const promoteEditFromView = () => {
  showViewModal.value = false
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  activeStudent.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  activeStudent.value = null
}

const handleSaved = () => {
  if (activeStudent.value) {
    toastStore.add('Cập nhật thông tin học viên thành công!')
  } else {
    toastStore.add('Thêm học viên mới thành công!')
  }
}

const handleDeleted = () => {
  toastStore.add('Xóa học viên thành công!')
}

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
