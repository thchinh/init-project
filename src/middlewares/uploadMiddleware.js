import multer from 'multer';
import { extname } from 'path';

// 1. Configure the Storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/courses'); // Thư mục lưu trữ file tải lên of course images
//   },
//   filename: function (req, file, cb) {
//     const ext = extname(file.originalname);
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//   },
// });

const storage = multer.memoryStorage(); // Sử dụng bộ nhớ để lưu trữ file tạm thời

// 2. Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// 3. EXPORT the initialized variable
export default upload;
