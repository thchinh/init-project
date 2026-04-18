// Nạp module express vào dự án
import express from "express";

// Khởi tạo một đối tượng app (đại diện cho ứng dụng web của bạn)
const app = express();

const port = 3000;

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send(
    '<h1 style="color: blue;">Hello, World xin chào các bạn học viên Kmin!</h1> <p style="color: red;">Đây là một API đơn giản được xây dựng bằng Express.js.</p>',
  );
});

app.post("/api/users", (req, res) => {
  const customer = req.body.customer;

  const nameuser = customer.name;
  const ageuser = customer.age;

  // Trả về kết quả dưới dạng JSON
  res.json({ information: `${nameuser}`, age: `${ageuser}` });
});

// Khởi động server và lắng nghe kết nối
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
