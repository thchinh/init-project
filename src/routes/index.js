import { Router } from 'express';
import courseRoute from './courseRoute.js';
import authRoute from './authRoute.js';
import roleRoute from './roleRoute.js';
import userRoute from './userRouter.js';

const router = Router();

router.use('/courses', courseRoute);
router.use('/auth', authRoute);
router.use('/roles', roleRoute);
router.use('/users', userRoute);

export default router;
