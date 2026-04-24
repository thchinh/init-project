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

const router = Router();

/// =============== Render view =============== ///
// /course (GET) => lấy tất cả khóa học
router.get('/', getAllCourses);

router.get('/manage', manageCourses);
router.get('/add', showFormAddCourse);

// /course/:id (GET) => lấy chi tiết khóa học theo id
router.get('/:id/update', showFormUpdateCourse);
router.get('/:id', getCourse);

// =============== Xử lý logic =============== ///
// /course (POST) => thêm mới khóa học
router.post('/', createCourse);
router.delete('/:id', removeCourse);
router.put('/:id', updateCourse);

export default router;
