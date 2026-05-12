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
  searchText,
  pageSize,
  pageIndex
) => {
  const query = Course.find().lean();

  if (searchText) {
    query.find({ name: { $regex: searchText, $options: 'i' } });
  }

  if (sortField && sortDirection) {
    query.sort({ [sortField]: sortDirection === 'asc' ? 1 : -1 });
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
    { name, description, img }
  ).lean();
  return mongooseToObject(course) !== null;
};

const countCourses = async (searchText) => {
  const query = Course.countDocuments().lean();

  if (searchText) {
    query.countDocuments({ name: { $regex: searchText, $options: 'i' } });
  }

  return await query.countDocuments();
};

export {
  getAllCourses,
  getCourseById,
  createCourse,
  removeCourse,
  updateCourse,
  countCourses,
};
