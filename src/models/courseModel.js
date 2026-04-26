import mongoose from 'mongoose';
import {
  mongooseToObject,
  mongooseToObjects,
} from '../utils/mongooseToObject.js';

const courseModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseModel);

const getAllCourses = async (
  sortField,
  sortDirection,
  searchText = '',
  pageIndex,
  pageSize
) => {
  const query = Course.find({
    name: { $regex: searchText, $options: 'i' },
  }).lean();

  if (sortField && sortDirection) {
    const sortOption = {};
    sortOption[sortField] = sortDirection === 'asc' ? 1 : -1;
    query.sort(sortOption);
  }

  if (pageIndex && pageSize) {
    const skip = (pageIndex - 1) * pageSize;
    query.skip(skip).limit(pageSize);
  }

  const courses = await query.exec();

  return mongooseToObjects(courses);
};

const getCourseById = async (id) => {
  const course = await Course.findById(new mongoose.Types.ObjectId(id)).lean();
  return mongooseToObject(course);
};

const createCourse = async (name, description, img) => {
  const course = new Course({ name, description, img });
  await course.save();
  return mongooseToObject(course);
};

const removeCourse = async (id) => {
  const course = await Course.findByIdAndDelete(
    new mongoose.Types.ObjectId(id)
  ).lean();
  return mongooseToObject(course) !== null;
};

const updateCourse = async (id, name, description, img) => {
  const course = await Course.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    { name, description, img },
    { new: true }
  ).lean();
  return mongooseToObject(course) !== null;
};

export {
  getAllCourses,
  getCourseById,
  createCourse,
  removeCourse,
  updateCourse,
};
