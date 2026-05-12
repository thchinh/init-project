import { Router } from 'express';
import {
  getAllCourses,
  getCourse,
  createCourse,
  showFormAddCourse,
  showFormUpdateCourse,
  manageCourses,
  removeCourse,
  updateCourse,
} from '../controllers/courseController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';
import authorizeMiddleware from '../middlewares/authorizeMiddleware.js';

const router = Router();

/// =============== Render view =============== ///
// /course (GET) => lấy tất cả khóa học
router.get('/', verifyTokenMiddleware, getAllCourses);

router.get(
  '/manage',
  verifyTokenMiddleware,
  authorizeMiddleware('admin'),
  manageCourses
);
router.get(
  '/add',
  verifyTokenMiddleware,
  authorizeMiddleware('admin'),
  showFormAddCourse
);

// /course/:id (GET) => lấy chi tiết khóa học theo id
router.get(
  '/:id/update',
  verifyTokenMiddleware,
  authorizeMiddleware('admin'),
  showFormUpdateCourse
);
router.get('/:id', verifyTokenMiddleware, getCourse);

// =============== Xử lý logic =============== ///
// /course (POST) => thêm mới khóa học
router.post(
  '/',
  verifyTokenMiddleware,
  authorizeMiddleware('admin'),
  uploadMiddleware.single('img'),
  createCourse
);
router.delete(
  '/:id',
  verifyTokenMiddleware,
  authorizeMiddleware('admin'),
  removeCourse
);
router.put(
  '/:id',
  verifyTokenMiddleware,
  authorizeMiddleware('admin'),
  uploadMiddleware.single('img'),
  updateCourse
);

export default router;
