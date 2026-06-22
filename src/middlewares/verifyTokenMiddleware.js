import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies.jwt_token;
  if (!token) {
    // return res.status(401).send('Unauthorized: No token provided');
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    // Check if the failure is explicitly due to expiration
    if (err.name === 'TokenExpiredError') {
      // Use refresh token to get new access token

      return res.status(401).json({
        message: 'Token expired, please refresh your token',
        errorCode: 'TOKEN_EXPIRED',
      });
    }

    return res.redirect('/auth/login');
  }
};

export default verifyTokenMiddleware;
