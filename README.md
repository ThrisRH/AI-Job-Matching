# AI Job Matching

## Cấu trúc thư mục

```
.gitignore
README.md
client/
server/
  .env
  app.js
  package.json
  server.js
  controllers/
    ai.controller.js
    auth.controller.js
    job.controller.js
    recruiter.controller.js
    user.controller.js
  middleware/
    auth.js
    errorHandler.js
    role.js
  models/
    Job.js
    User.js
  routes/
    ai.routes.js
    auth.routes.js
    job.routes.js
    recruiter.routes.js
    user.routes.js
  utils/
```

## Mô tả

- **client/**: Thư mục chứa mã nguồn phía client (frontend).
- **server/**: Thư mục chứa mã nguồn phía server (backend) sử dụng Node.js, Express và MongoDB.
  - **.env**: Thông tin cấu hình môi trường (PORT, MONGO_URI, JWT_SECRET).
  - **app.js**: Khởi tạo ứng dụng Express, cấu hình middleware và route.
  - **server.js**: Kết nối MongoDB và khởi động server.
  - **controllers/**: Chứa các controller xử lý logic cho từng chức năng (AI, Auth, Job, Recruiter, User).
  - **middleware/**: Chứa các middleware xác thực, phân quyền, xử lý lỗi.
  - **models/**: Định nghĩa các schema Mongoose cho User, Job.
  - **routes/**: Định nghĩa các route cho API (AI, Auth, Job, Recruiter, User).
  - **utils/**: Chứa các hàm tiện ích (chưa có nội dung cụ thể).

## Cài đặt & chạy server

```sh
cd server
npm install
npm run dev
```

## Biến môi trường

Tạo file `.env` trong thư mục `server/` với nội dung mẫu như sau:

```
PORT=3000
MONGO_URI=mongodb+srv://testaccount:test123@jobmatching.ls31ftf.mongodb.net/JobMatching?retryWrites=true&w=majority&appName=JobMatching
JWT_SECRET=ygxPqXAhx2ka5nfIZ0iiclwl2I58BFUb
```

- `PORT`: Cổng server (mặc định 3000)
- `MONGO_URI`: Đường dẫn kết nối MongoDB
- `JWT_SECRET`: Chuỗi bí mật cho JWT

---

---
