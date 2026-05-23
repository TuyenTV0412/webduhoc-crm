import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import StudentsView from '../views/StudentsView.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/students',
    children: [
      {
        path: 'students',
        name: 'students',
        component: StudentsView,
        meta: { title: 'Quản lý học viên' }
      },
      // Placeholders for future modules
      {
        path: 'dashboard',
        name: 'dashboard',
        component: StudentsView, // Reuse StudentsView as dynamic placeholder
        meta: { title: 'Dashboard' }
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: StudentsView,
        meta: { title: 'Lịch & Sự kiện' }
      },
      {
        path: 'orders',
        name: 'orders',
        component: StudentsView,
        meta: { title: 'Đơn hàng Nhật Bản' }
      },
      {
        path: 'progress',
        name: 'progress',
        component: StudentsView,
        meta: { title: 'Tiến trình hồ sơ' }
      },
      {
        path: 'tuition',
        name: 'tuition',
        component: StudentsView,
        meta: { title: 'Học phí & Chi phí' }
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: StudentsView,
        meta: { title: 'Thông báo' }
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: StudentsView,
        meta: { title: 'Tài khoản & Quyền' }
      },
      {
        path: 'reports',
        name: 'reports',
        component: StudentsView,
        meta: { title: 'Báo cáo' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
