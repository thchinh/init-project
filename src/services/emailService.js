import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// const transporter = createTransport({
//   service: 'gmail', // Nodemailer tự động biết các thông số port/host của Gmail
//   auth: {
//     user: process.env.EMAIL_USER, // Email thật của bạn
//     pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng 16 ký tự vừa tạo
//   },
// });

const transporter = createTransport({
  host: 'smtp.tino.vn', // Host SMTP của Tino
  port: 587, // Cổng SMTP của Tino
  secure: false, // Sử dụng TLS
  auth: {
    user: process.env.TINO_EMAIL_USER, // Email thật của bạn
    pass: process.env.TINO_EMAIL_PASS, // Mật khẩu ứng dụng 16 ký tự vừa tạo
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const canConnectEmailService = async () => {
  try {
    return await transporter.verify();
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // console.log('Lỗi khi kiểm tra kết nối email: ', error);
    return false;
  }
};

const sendEmail = async ({ to, subject, html, text }) => {
  if (!(await canConnectEmailService())) {
    // console.log('Không thể kết nối đến dịch vụ email');
    return;
  }

  const mailOptions = {
    from: process.env.TINO_EMAIL_USER,
    to,
    subject,
    html,
    text,
  };

  try {
    transporter.sendMail(mailOptions);
    // console.log('Gửi thành công: ' + info.response);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // console.log('Lỗi gửi mail: ', error);
  }
};

export { sendEmail, canConnectEmailService };
