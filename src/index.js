// Nạp module express vào dự án
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';
import appRouters from './routes/index.js';
import methodOverride from 'method-override';
import connectDB from './config/databaseConfig.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import 'dotenv/config';
import helperHandlebars from './helpers/helperHandlebars.js';

const app = express();

const dirName = path.join(path.resolve(), 'public');
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Không lưu session lại nếu không có sự thay đổi
    saveUninitialized: true, // Lưu session ngay cả khi chưa được khởi tạo
  })
);
app.use(cookieParser());
app.use(morgan('combined'));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Cấu hình Custom cho Handlebars
app.engine(
  'hbs',
  engine({
    defaultLayout: 'main', // Đặt file main.handlebars làm bộ khung mặc định (có thể đổi tên file mặc định)
    layoutsDir: './src/views/layouts', // Đặt thư mục chứa file layout là ./views/layouts
    helpers: helperHandlebars,
    extname: '.hbs', // Đặt phần mở rộng của file giao diện là .hbs (mặc định là .handlebars)
  })
);

// 2. Báo cho Express biết hãy dùng Handlebars làm công cụ render giao diện
app.set('view engine', 'hbs');

// Báo cho Express biết thư mục chứa file giao diện tên là gì
app.set('views', './src/views');

app.use(appRouters);

connectDB();
// Khởi động server và lắng nghe kết nối
app.listen(3000, () => {
  console.log(`Server đang chạy tại http://localhost:${3000}`);
});
