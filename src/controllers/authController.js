import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import * as tokenService from '../services/tokenService.js';
import { getTemplate } from '../services/tenplateService.js';
import * as emailService from '../services/emailService.js';

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

const loginClient = async (req, res) => {
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
  const token = tokenService.generateAccessToken(user);
  const refreshToken = tokenService.generateRefreshToken();

  // Store refresh token in the database
  await userModel.updateRefreshToken(user.id, refreshToken);

  res.cookie('jwt_token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
  res.json({
    message: 'Login successful',
    access_token: token,
    refresh_token: refreshToken,
  });
};

const register = async (req, res) => {
  const { username, password, role, email } = req.body;
  // Kiểm tra xem username và password có tồn tại hay không

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await userModel.createUser(
      username,
      hashPassword,
      role,
      email
    );

    // Get email welcome template
    const emailTemplate = await getTemplate('welcome-email', { username });

    // Send welcome email
    emailService.sendEmail({
      to: email,
      subject: 'Welcome to Nodemailer application',
      html: emailTemplate,
    });

    res.send(`Register successful! User ID: ${newUser.id}`);
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

const refreshToken = async (req, res) => {
  const { refreshToken, userId } = req.body;
  if (!refreshToken) {
    return res.status(400).send('Refresh token is required');
  }

  const user = await userModel.getUserById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    return res.status(403).send('Invalid refresh token');
  }

  if (new Date() > user.refreshTokenExpiry) {
    return res.status(403).send('Refresh token expired');
  }

  const newToken = tokenService.generateAccessToken(user);
  const newRefreshToken = tokenService.generateRefreshToken();
  await userModel.updateRefreshToken(user.id, newRefreshToken);

  res.json({ access_token: newToken, refresh_token: newRefreshToken });
};

export { login, register, logout, showFormLogin, loginClient, refreshToken };
