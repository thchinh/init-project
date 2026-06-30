import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

const generateRefreshToken = () => {
  return randomBytes(40).toString('hex');
};

const generateAccessToken = (user) => {
  // Grant jwt token
  const payload = { userId: user.id, role: user.role.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    // Config token expiration time in 5s for testing refresh token
    // expiresIn: process.env.JWT_EXPIRES_IN,
    expiresIn: '5s',
  });
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Error verifying access token:', error);
    return null;
  }
};

export { generateRefreshToken, generateAccessToken, verifyAccessToken };
