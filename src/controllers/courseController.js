import * as courseModel from '../models/courseModel.js';

const showFormAddCourse = (req, res) => {
  res.render('course/add');
};

const showFormUpdateCourse = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Thiếu id khóa học');
  }
  const course = await courseModel.getCourseById(id);
  if (!course) {
    return res.status(404).send('Khóa học không tồn tại');
  }
  res.render('course/admin/update', { course });
};

const getAllCourses = async (req, res) => {
  const courses = await courseModel.getAllCourses();
  res.render('course/list', { courses });
};

const manageCourses = async (req, res) => {
  const courses = await courseModel.getAllCourses();
  res.render('course/admin/manage', { courses });
};

const getCourse = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Thiếu id khóa học');
  }

  const course = await courseModel.getCourseById(id);
  if (!course) {
    return res.status(404).send('Khóa học không tồn tại');
  }

  res.render('course/detail', { course });
};

const createCourse = async (req, res) => {
  const { name, description, img } = req.body;

  if (!name || !description || !img) {
    return res.status(400).send('Thiếu thông tin khóa học');
  }

  const newCourse = await courseModel.createCourse(name, description, img);
  res.redirect('/courses');
};

const removeCourse = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send('Thiếu id khóa học');

  const isSuccess = await courseModel.removeCourse(id);
  if (!isSuccess) return res.status(404).send('Khóa học không tồn tại');

  res.redirect('/courses');
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description, img } = req.body;

  if (!id) return res.status(400).send('Thiếu id khóa học');

  if (!name || !description || !img) {
    return res.status(400).send('Thiếu thông tin khóa học');
  }

  const isSuccess = await courseModel.updateCourse(id, name, description, img);
  if (!isSuccess) return res.status(404).send('Khóa học không tồn tại');

  res.redirect('/courses');
};

export {
  getAllCourses,
  getCourse,
  createCourse,
  showFormAddCourse,
  manageCourses,
  removeCourse,
  updateCourse,
  showFormUpdateCourse,
};
