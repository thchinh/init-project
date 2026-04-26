import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized: Invalid token');
  }
};

export default verifyTokenMiddleware;
