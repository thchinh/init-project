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
import cors from 'cors';
import { generateRefreshToken } from './services/tokenService.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {
    // The session will be invalidated if the client does not reconnect within 2 minutes
    maxDisconnectionDuration: 2 * 60 * 1000,
  },
});

app.use(express.static(path.join(path.resolve(), 'public')));

// Config cors
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

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

// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   if (!token) {
//     return next(new Error('Authentication error: Token not provided'));
//   }
//   next();
// });

io.on('connection', (socket) => {
  console.log('a user connected with connection id: ' + socket.id);

  // socket.use((packet, next) => {
  //   const token = socket.handshake.auth.token;
  //   if (!token) {
  //     return next(new Error('Authentication error: Token not provided'));
  //   }
  //   next();
  // });

  socket.on('send_message', (msg) => {
    io.to(msg.room).emit('receive_message', msg.message);
  });

  // group 1
  // group 2

  socket.on('start_join_room', (room) => {
    socket.join(room);
    socket.emit('completed_join_room', room); // Notify the client that they have joined the room
    console.log(`User with connection id: ${socket.id} joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected with connection id: ' + socket.id);
  });
});

io.on('connection_error', (err) => {
  console.log(`Connection error: ${err.message}`);
});

// Khởi động server và lắng nghe kết nối
server.listen(3000, () => {
  console.log(`Server đang chạy tại http://localhost:3000`);
});
