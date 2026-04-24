import { Router } from 'express';
import courseRoute from './courseRoute.js';

const router = Router();

router.use('/courses', courseRoute);

export default router;
