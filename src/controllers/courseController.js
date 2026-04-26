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
