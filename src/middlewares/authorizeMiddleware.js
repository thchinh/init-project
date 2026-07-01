import 'dotenv/config';

const authorizeMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.userRole;

    try {
      if (userRole.toLowerCase() !== requiredRole.toLowerCase()) {
        return res.status(403).send('Forbidden: Insufficient role');
      }

      next();
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return res.status(401).send('Unauthorized: Invalid token');
    }
  };
};

export default authorizeMiddleware;
