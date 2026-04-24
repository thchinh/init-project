// src/config/database.js
import mysql from 'mysql2/promise'; // Lưu ý: Bắt buộc có chữ /promise
import 'dotenv/config'; // Tự động đọc file .env

// Tạo một Pool kết nối thay vì kết nối đơn lẻ
const connection = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Tối đa 10 kết nối hoạt động cùng lúc
  queueLimit: 0,
});

console.log('🚀 Đã khởi tạo Pool Connection tới MySQL thành công!');

export default connection;
