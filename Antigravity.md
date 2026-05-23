You are a senior frontend engineer, software architect, and UI engineer.

Build a production-quality CRM dashboard web app for managing study abroad students (du học sinh).

Reference UI:
Use the uploaded screenshot as visual inspiration.
Closely follow the layout, spacing, visual hierarchy, sidebar style, table style, badge style, and overall CRM feeling.

IMPORTANT:
The UI should feel close to the provided screenshot, but cleaner and more reusable.

==================================================
TECH STACK
==================================================

Use:

- Vue 3
- Vite
- Composition API
- Pinia
- Vue Router
- Supabase
- TailwindCSS
- lucide-vue-next icons

Use JavaScript (not TypeScript unless necessary).

No traditional backend.

Use Supabase as database and API layer.

==================================================
PROJECT GOAL
==================================================

For now implement ONLY:

Student Management Page

However architecture MUST support future expansion.

Future modules:

- Dashboard
- Calendar & Events
- Japan Orders
- Application Progress
- Tuition & Expenses
- Notifications
- Accounts & Permissions
- Reports

Do not over-engineer but structure project professionally.

==================================================
ARCHITECTURE
==================================================

Use clean scalable folder structure.

Expected structure:

src/
├── assets/
│
├── layouts/
│   └── DashboardLayout.vue
│
├── views/
│   └── StudentsView.vue
│
├── router/
│   └── index.js
│
├── stores/
│   └── student.store.js
│
├── services/
│   └── student.service.js
│
├── lib/
│   └── supabase.js
│
├── components/
│   ├── base/
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseSelect.vue
│   │   ├── BaseCheckbox.vue
│   │   ├── BaseModal.vue
│   │   ├── BaseCard.vue
│   │   ├── BaseBadge.vue
│   │   ├── BaseTable.vue
│   │   ├── BaseAvatar.vue
│   │   ├── BaseIconButton.vue
│   │   ├── BaseLoading.vue
│   │   └── BaseEmptyState.vue
│   │
│   ├── layout/
│   │   ├── AppSidebar.vue
│   │   ├── AppHeader.vue
│   │   ├── SidebarItem.vue
│   │   └── AppBreadcrumb.vue
│   │
│   └── students/
│       ├── StudentToolbar.vue
│       ├── StudentStatusTabs.vue
│       ├── StudentTable.vue
│       ├── StudentFormModal.vue
│       └── DeleteStudentModal.vue

==================================================
APP LAYOUT
==================================================

Create DashboardLayout with:

1. Persistent left sidebar
2. Top header
3. Main content area

Structure:

DashboardLayout
 ├── Sidebar
 ├── Header
 └── Router View

Desktop-first responsive.

Modern CRM dashboard look.

==================================================
SIDEBAR
==================================================

Dark navy CRM sidebar.

Visually inspired by screenshot.

Menu groups:

OVERVIEW
- Dashboard
- Calendar & Events

MANAGEMENT
- Students (ACTIVE)
- Japan Orders
- Application Progress
- Tuition & Expenses

SUPPORT
- Notifications
- Accounts & Permissions
- Reports

Bottom section:
- Dark mode toggle placeholder
- Help
- Logout

Requirements:
- Active item highlight
- Hover effects
- Reusable sidebar item component
- Easy future extension
- Icons with lucide-vue-next
- Ready for collapse later

Students route:

/students

==================================================
HEADER
==================================================

Top header should contain:

Left:
- page title
- breadcrumb

Right:
- search input
- notification icon
- theme icon
- avatar circle with initials

Clean spacing.

Modern dashboard UI.

==================================================
PAGE: STUDENT MANAGEMENT
==================================================

Route:

/students

Page title:

Quản lý học viên

Subtitle breadcrumb:

Trang chủ / Học viên

Page sections:

1. Status Tabs
2. Student Table Card

==================================================
STATUS FILTER TABS
==================================================

Horizontal pill tabs:

- Tất cả
- Đang học
- Chờ PV
- Trúng tuyển
- Xuất cảnh

Example:

Tất cả (248)

Requirements:

- active state
- rounded pill style
- dark active background
- count displayed
- clicking filters table

==================================================
TABLE CARD
==================================================

Card title:

Danh sách học viên

Toolbar:

- Search input
- Filter button (UI only)
- Export Excel button (UI only)
- Add Student button

==================================================
STUDENT TABLE
==================================================

Columns:

Checkbox
Học viên
Giới tính
SĐT
Đơn hàng
Trạng thái
Tiếng Nhật
Ngày xuất cảnh
Thao tác

==================================================
STUDENT ROW DESIGN
==================================================

Student column contains:

1. Avatar circle with initials

Example:

Nguyễn Văn An
=> VA

2. Full name

3. Student code below

Example:

Nguyễn Văn An
HV-2025-001

==================================================
STATUS BADGES
==================================================

Use reusable BaseBadge.

Mapping:

Mới đăng ký -> gray
Đang học -> blue
Chờ phỏng vấn -> yellow
Đã trúng tuyển -> green
Đã xuất cảnh -> purple

Rounded badge pill style.

Soft background.

==================================================
ACTION BUTTONS
==================================================

Reusable icon buttons:

- View
- Edit
- Delete

Hover states required.

Use BaseIconButton.

==================================================
CRUD REQUIREMENTS
==================================================

Implement FULL CRUD with Supabase.

Get students
Create student
Update student
Delete student

Use modal-based UX.

Required modals:

- StudentFormModal
- DeleteStudentModal

==================================================
FORM FIELDS
==================================================

Student form:

- full name
- gender
- phone
- order
- status
- japanese level
- departure date

Validation:
required fields

Loading states:
required

Error states:
required

==================================================
SEARCH & FILTER
==================================================

Search by:

- student name
- student code

Tab filter by status.

Client-side filtering acceptable.

==================================================
SUPABASE
==================================================

Create:

src/lib/supabase.js

Use environment variables:

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

==================================================
DATABASE TABLES
==================================================

Tables:

students
student_statuses
orders
japanese_levels

Relationships:

students.order_id
→ orders.id

students.status_id
→ student_statuses.id

students.japanese_level_id
→ japanese_levels.id

==================================================
SUPABASE QUERY
==================================================

Use relational select.

Example:

.select(`
  *,
  orders(name),
  student_statuses(name, code, color),
  japanese_levels(level)
`)

==================================================
SERVICE LAYER
==================================================

Create student.service.js

Methods:

getStudents()
createStudent()
updateStudent()
deleteStudent()

Do not place Supabase calls directly inside components.

==================================================
PINIA STORE
==================================================

Create student.store.js

Responsibilities:

- fetch students
- loading state
- search state
- selected tab state
- CRUD actions

==================================================
DESIGN SYSTEM
==================================================

Create reusable base UI system.

Avoid duplicated Tailwind classes.

Shared components required:

==================================================
BaseButton.vue
==================================================

Props:

variant:
- primary
- secondary
- danger
- success
- ghost

size:
- sm
- md
- lg

loading
disabled
fullWidth
iconLeft
iconRight

Support slot.

==================================================
BaseInput.vue
==================================================

Props:

modelValue
label
placeholder
disabled
error
type
iconLeft
iconRight

Must support:

- v-model
- validation state
- reusable styling

==================================================
BaseSelect.vue
==================================================

Reusable dropdown.

Used for:

- gender
- order
- status
- japanese level

==================================================
BaseCheckbox.vue
==================================================

Reusable checkbox.

Support:
- select all
- row select

==================================================
BaseModal.vue
==================================================

Features:

- title
- close button
- footer slot
- ESC close
- backdrop click close

==================================================
BaseCard.vue
==================================================

Reusable card.

Rounded corners
soft shadow
header slot
body slot

==================================================
BaseBadge.vue
==================================================

Reusable status badge.

Variants:

gray
blue
yellow
green
purple
red

==================================================
BaseTable.vue
==================================================

Reusable configurable table.

Support:

- columns config
- loading state
- empty state
- custom slots
- action slot

Avoid hardcoded table markup.

Example:

[
 {
   key: "full_name",
   label: "Học viên"
 }
]

==================================================
BaseAvatar.vue
==================================================

Generate initials automatically.

Example:

Nguyễn Văn An
=> VA

Props:

name
image
size

Fallback to initials.

==================================================
BaseIconButton.vue
==================================================

Reusable icon button.

Variants:

info
warning
danger

Used for:
view
edit
delete

==================================================
BaseLoading.vue
==================================================

Reusable loading state.

==================================================
BaseEmptyState.vue
==================================================

Reusable empty UI.

Example:

"No students found"

==================================================
CODE QUALITY
==================================================

Requirements:

- Composition API
- reusable components
- no duplicated UI
- maintainable architecture
- no giant files
- avoid inline styles
- clean naming
- production-quality code
- no messy code

Do not create giant 800-line files.

Split logic properly.

Think like a senior frontend engineer.

==================================================
DELIVERABLES
==================================================

After implementation provide:

1. full project structure
2. installation commands
3. package install commands
4. .env example
5. run commands
6. Supabase setup instructions
7. explanation of architecture
8. reusable component explanation

Generate complete runnable code.