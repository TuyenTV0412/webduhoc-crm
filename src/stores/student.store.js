import { defineStore } from 'pinia'
import { studentService } from '../services/student.service'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [],
    loading: false,
    error: null,
    
    // Metadata for forms & views
    metaStatuses: [],
    metaOrders: [],
    metaJapaneseLevels: [],
    
    // Active UI states
    selectedStatusTab: 'ALL', // 'ALL' or status code ('NEW', 'STUDYING', etc.)
    searchQuery: '',
    currentPage: 1,
    pageSize: 10,
  }),

  getters: {
    /**
     * Filters student list reactively based on active filters and search query
     */
    filteredStudents(state) {
      return state.students.filter(student => {
        // Tab status filtering
        if (state.selectedStatusTab !== 'ALL') {
          const statusCode = student.student_statuses?.code
          if (statusCode !== state.selectedStatusTab) {
            return false
          }
        }

        // Search text filtering (matches name, student code or phone)
        if (state.searchQuery.trim()) {
          const query = state.searchQuery.toLowerCase().trim()
          const nameMatch = student.full_name?.toLowerCase().includes(query)
          const codeMatch = student.student_code?.toLowerCase().includes(query)
          const phoneMatch = student.phone?.toLowerCase().includes(query)
          return nameMatch || codeMatch || phoneMatch
        }

        return true
      })
    },

    /**
     * Slices the filtered students into the active page segment
     */
    paginatedStudents(state) {
      const start = (state.currentPage - 1) * state.pageSize
      const end = start + state.pageSize
      return this.filteredStudents.slice(start, end)
    },

    /**
     * Returns total filtered records count
     */
    totalFiltered() {
      return this.filteredStudents.length
    },

    /**
     * Calculates total pages
     */
    totalPages(state) {
      return Math.ceil(this.filteredStudents.length / state.pageSize) || 1
    },

    /**
     * Calculates the counts of students in each status dynamically
     */
    statusCounts(state) {
      const counts = {
        ALL: state.students.length,
        NEW: 0,
        STUDYING: 0,
        WAITING_INTERVIEW: 0,
        PASSED: 0,
        DEPARTED: 0
      }

      state.students.forEach(student => {
        const code = student.student_statuses?.code
        if (code && code in counts) {
          counts[code]++
        }
      })

      return counts
    }
  },

  actions: {
    /**
     * Fetch metadata lists for form options
     */
    async fetchMetadata() {
      try {
        const data = await studentService.getMetadata()
        console.log('=== [SUPABASE METADATA] ===', data)
        this.metaStatuses = data.statuses
        this.metaOrders = data.orders
        this.metaJapaneseLevels = data.japaneseLevels
      } catch (err) {
        console.error('Failed to load metadata:', err)
        this.error = 'Không thể tải dữ liệu danh mục.'
      }
    },

    /**
     * Fetch student list
     */
    async fetchStudents() {
      this.loading = true
      this.error = null
      try {
        const data = await studentService.getStudents()
        console.log('=== [SUPABASE STUDENTS DATA] ===', data)
        this.students = data
      } catch (err) {
        console.error('Failed to load students:', err)
        this.error = 'Không thể tải danh sách học viên.'
      } finally {
        this.loading = false
      }
    },

    /**
     * Add student action
     */
    async addStudent(studentData) {
      this.loading = true
      this.error = null
      try {
        const newStudent = await studentService.createStudent(studentData)
        this.students.unshift(newStudent)
        return newStudent
      } catch (err) {
        console.error('Failed to create student:', err)
        this.error = 'Không thể thêm học viên mới.'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Edit student action
     */
    async editStudent(id, studentData) {
      this.loading = true
      this.error = null
      try {
        const updatedStudent = await studentService.updateStudent(id, studentData)
        const index = this.students.findIndex(s => s.id === id)
        if (index !== -1) {
          this.students[index] = updatedStudent
        }
        return updatedStudent
      } catch (err) {
        console.error('Failed to edit student:', err)
        this.error = 'Không thể cập nhật thông tin học viên.'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Delete student action
     */
    async removeStudent(id) {
      this.loading = true
      this.error = null
      try {
        await studentService.deleteStudent(id)
        this.students = this.students.filter(s => s.id !== id)
      } catch (err) {
        console.error('Failed to delete student:', err)
        this.error = 'Không thể xóa học viên.'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
