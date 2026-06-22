import { Router } from 'express';
import {
  login,
  logout,
  register,
  showFormLogin,
  loginClient,
  refreshToken,
} from '../controllers/authController.js';

const router = Router();

router.get('/login', showFormLogin);

router.post('/login', login);
router.post('/login/client', loginClient);

// router.get('/logout', logout);

router.post('/register', register);

router.post('/refresh-token', refreshToken);

export default router;
