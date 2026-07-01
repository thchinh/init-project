import mongoose from 'mongoose';
import 'dotenv/config';

var test = 'abc';

const connectDB = async () => {
  try {
    // Cấu hình kết nối chuẩn mực của Mongoose
    await mongoose.connect(process.env.MONGO_URI);
    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    // Ngắt tiến trình Node.js nếu Database sập (Fail-fast mechanism)
    process.exit(1);
  }
};

export default connectDB;
