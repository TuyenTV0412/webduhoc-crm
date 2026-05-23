# Hướng dẫn Kết nối Supabase Database cho Aladdin CRM

Hệ thống Aladdin CRM đã được tích hợp sẵn lớp giao tiếp API với Supabase (trong file `src/services/student.service.js` và `src/lib/supabase.js`). Khi phát hiện thông tin cấu hình hợp lệ, ứng dụng sẽ tự động chuyển từ chế độ **LOCAL DEMO (Dữ liệu giả lập)** sang kết nối **LIVE DATABASE (Dữ liệu thực từ Supabase)**.

Dưới đây là các bước chi tiết để bạn cấu hình kết nối:

---

## Bước 1: Lấy thông tin API từ Supabase Dashboard
1. Truy cập vào trang quản trị Supabase: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Đăng nhập và chọn dự án (project) chứa cơ sở dữ liệu của bạn.
3. Ở thanh menu bên trái, nhấp vào biểu tượng **Settings** (hình bánh răng ở góc dưới) -> Chọn mục **API**.
4. Sao chép 2 khóa thông tin sau:
   - **Project URL** (nằm trong khung *Project URL*). Có định dạng: `https://xxxxxxxxxxxxxxxxxxxx.supabase.co`
   - **anon / public key** (nằm trong khung *Project API keys*). Đây là khóa công khai an toàn cho Client.

---

## Bước 2: Cấu hình file môi trường `.env`
1. Mở file `.env` nằm tại thư mục gốc của dự án (`e:\WEBDUHOC\.env`).
2. Thay thế các giá trị giả lập bằng thông tin thật bạn vừa copy:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJuYW1lIjoi... (Chuỗi key dài anon của bạn)
   ```
3. Lưu lại file `.env`.

---

## Bước 3: Khởi động lại Server để áp dụng cấu hình
Vì các biến môi trường bắt đầu bằng `VITE_` được nạp vào lúc khởi tạo ứng dụng, bạn cần restart lại dev server để Vite tải lại các cấu hình này:
1. Quay lại cửa sổ Terminal đang chạy máy chủ phát triển.
2. Nhấn tổ hợp phím `Ctrl + C` (và gõ `Y` nếu Windows hỏi) để dừng server.
3. Khởi chạy lại server bằng lệnh:
   ```bash
   npm run dev
   ```
4. F5 tải lại trang web `http://localhost:5173/`. 
5. Lúc này, dòng thông báo cảnh báo "demo mode" trong Console Log của trình duyệt sẽ biến mất, hệ thống sẽ thực hiện truy vấn SELECT / INSERT / UPDATE / DELETE trực tiếp đến database Supabase của bạn!

---

> [!IMPORTANT]
> **Đảm bảo Schema Database khớp 100%:**
> Hệ thống Aladdin CRM yêu cầu các bảng sau hoạt động trong Supabase (đã được import từ file `database.db`):
> - `student_statuses` (Trạng thái)
> - `japanese_levels` (Trình độ tiếng Nhật)
> - `orders` (Đơn hàng)
> - `students` (Thông tin học viên có khóa ngoại liên kết tới 3 bảng trên)
