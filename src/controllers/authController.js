import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const showFormLogin = (req, res) => {
  res.render('auth/login');
};

const login = async (req, res) => {
  const { username, password } = req.body;
  // Kiểm tra xem username và password có tồn tại hay không

  const user = await userModel.getUserByUsername(username);
  if (!user) {
    return res.status(400).send('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send('Invalid username or password');
  }

  // Grant jwt token
  const token = jwt.sign(
    { userId: user.id, role: user.role.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.cookie('jwt_token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
  res.redirect('/courses');
};

const register = async (req, res) => {
  const { username, password, role } = req.body;
  // Kiểm tra xem username và password có tồn tại hay không

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await userModel.createUser(username, hashPassword, role);
    res.send(`Register successful! User ID: ${newUser._id}`);
  } catch (error) {
    res.status(500).send('Register failed');
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.clearCookie('jwt_token');
    res.send('Logout successful');
  });
};

export { login, register, logout, showFormLogin };
