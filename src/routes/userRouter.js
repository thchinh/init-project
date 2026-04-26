import { Router } from 'express';
import { updateUser } from '../controllers/userController.js';
const router = Router();

router.put('/:id', updateUser);

export default router;
