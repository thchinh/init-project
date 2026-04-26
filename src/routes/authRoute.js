import { Router } from 'express';
import {
  login,
  logout,
  register,
  showFormLogin,
} from '../controllers/authController.js';

const router = Router();

router.get('/login', showFormLogin);

router.post('/login', login);

// router.get('/logout', logout);

router.post('/register', register);

export default router;
