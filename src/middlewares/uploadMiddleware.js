import multer from 'multer';
const storage = multer.memoryStorage();

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // Giới hạn kích thước file là 5MB

export default uploadMiddleware;
