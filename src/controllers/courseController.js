import path from 'node:path';
import * as courseModel from '../models/courseModel.js';
import imageService from '../services/imageService.js';

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
  const { sortBy, sortOrder, searchText, pageSize, pageIndex } = req.query;
  const validSortByFields = ['name'];
  const validSortOrder = ['asc', 'desc'];

  let sortField = 'name'; // Mặc định sắp xếp theo id
  let sortDirection = 'asc'; // Mặc định sắp xếp tăng dần
  let currentPage = 1; // Mặc định trang hiện tại là 1
  let currentPageSize = 5; // Mặc định số lượng bản ghi trên mỗi trang là 5

  if (validSortByFields.includes(sortBy)) {
    sortField = sortBy;
  }

  if (validSortOrder.includes(sortOrder)) {
    sortDirection = sortOrder;
  }

  if (pageIndex && parseInt(pageIndex) > 0) {
    currentPage = parseInt(pageIndex);
  }

  if (pageSize && parseInt(pageSize) > 0) {
    currentPageSize = parseInt(pageSize);
  }

  const totalCourses = await courseModel.countCourses(searchText);
  const courses = await courseModel.getAllCourses(
    sortField,
    sortDirection,
    searchText,
    currentPageSize,
    currentPage
  );

  res.render('course/admin/manage', {
    courses,
    sortBy: sortField,
    sortOrder: sortDirection,
    searchText,
    pageSize: currentPageSize,
    pageIndex: currentPage,
    totalPages: Math.ceil(totalCourses / currentPageSize),
  });
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
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send('Thiếu thông tin khóa học');
  }

  if (!req.file) {
    return res.status(400).send('Thiếu ảnh khóa học');
  }
  const imgName = imageService.saveImage(req.file);

  const newCourse = await courseModel.createCourse(name, description, imgName);
  res.redirect('/courses/manage');
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
  const { name, description } = req.body;

  if (!id) return res.status(400).send('Thiếu id khóa học');

  const getCourse = await courseModel.getCourseById(id);
  if (!getCourse) return res.status(404).send('Khóa học không tồn tại');

  if (!name || !description) {
    return res.status(400).send('Thiếu thông tin khóa học');
  }

  if (!req.file) {
    return res.status(400).send('Thiếu ảnh khóa học');
  }

  const fileName = req.file.originalname;
  if (fileName !== getCourse.img) {
    imageService.deleteImage(getCourse.img);
  }

  const imgName = imageService.saveImage(req.file);

  const isSuccess = await courseModel.updateCourse(
    id,
    name,
    description,
    imgName
  );
  if (!isSuccess) return res.status(404).send('Khóa học không tồn tại');

  res.redirect('/courses/manage');
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
