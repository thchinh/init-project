import * as courseModel from '../models/courseModel.js';
import path from 'path';
import fs from 'fs';
import imageService from '../services/imageService.js';
import { IMAGE_PATH } from '../constants/pathConstant.js';

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
  const { sortBy, sortOrder, searchText, pageIndex, pageSize } = req.query;
  const validSortOrders = ['asc', 'desc'];
  const validSortFields = ['name']; // Các trường hợp hợp lệ để sắp xếp

  let sortField = 'name'; // Mặc định sắp xếp theo tên
  let sortDirection = 'asc'; // Mặc định sắp xếp tăng dần

  let currentPage = 1; // Mặc định trang hiện tại
  let currentPageSize = 5; // Mặc định số lượng bản ghi trên mỗi trang

  if (validSortFields.includes(sortBy)) {
    sortField = sortBy;
  }

  if (validSortOrders.includes(sortOrder)) {
    sortDirection = sortOrder;
  }

  if (pageIndex && parseInt(pageIndex) > 0) {
    currentPage = parseInt(pageIndex);
  }

  if (pageSize && parseInt(pageSize) > 0) {
    currentPageSize = parseInt(pageSize);
  }

  const totalCourses = await courseModel.getAllCourses(
    sortField,
    sortDirection,
    searchText
  );
  const totalPage = Math.ceil(totalCourses.length / currentPageSize);

  const courses = await courseModel.getAllCourses(
    sortField,
    sortDirection,
    searchText,
    currentPage,
    currentPageSize
  );

  res.render('course/admin/manage', {
    courses,
    sortBy: sortField,
    sortOrder: sortDirection,
    searchText: searchText || '',
    totalPage,
    pageIndex: currentPage,
    pageSize: currentPageSize,
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
    return res.status(400).send('Please select an image to upload.');
  }

  // Lưu ảnh và lấy tên file đã lưu trên server
  const imgUrl = await imageService.handleSaveImage(req.file);

  const newCourse = await courseModel.createCourse(name, description, imgUrl);
  res.redirect('/courses/manage');
};

const removeCourse = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send('Thiếu id khóa học');

  const course = await courseModel.getCourseById(id);
  if (!course) return res.status(404).send('Khóa học không tồn tại');

  const isSuccess = await courseModel.removeCourse(id);

  // Xóa ảnh liên quan đến khóa học nếu tồn tại
  if (isSuccess) {
    await imageService.handleRemoveImage(course.img);
  }

  if (!isSuccess) return res.status(404).send('Khóa học không tồn tại');

  res.redirect('/courses/manage');
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!id) return res.status(400).send('Thiếu id khóa học');

  if (!name || !description) {
    return res.status(400).send('Thiếu thông tin khóa học');
  }

  if (!req.file) {
    return res.status(400).send('Please select an image to upload.');
  }

  const getCourse = await courseModel.getCourseById(id);
  if (!getCourse) {
    return res.status(404).send('Khóa học không tồn tại');
  }

  const isOldImage = await imageService.isExistImage(req.file.originalname);
  let imgUrl = getCourse.img; // Giữ nguyên ảnh cũ nếu không có ảnh mới

  if (!isOldImage) {
    // Xóa ảnh cũ nếu tồn tại
    if (getCourse.img) {
      await imageService.handleRemoveImage(getCourse.img);
    }
    // Lưu ảnh mới và lấy tên file đã lưu trên server
    imgUrl = await imageService.handleSaveImage(req.file);
  }

  const isSuccess = await courseModel.updateCourse(
    id,
    name,
    description,
    imgUrl
  );

  if (!isSuccess) return res.status(404).send('Failed to update course');

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
