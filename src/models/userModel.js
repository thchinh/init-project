import mongoose from 'mongoose';
import { mongooseToObject } from '../utils/mongooseToObject.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
    },
    refreshTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const User = mongoose.model('User', userSchema);

const createUser = async (username, password, role, email) => {
  const newUser = new User({
    username,
    password,
    role: new mongoose.Types.ObjectId(role),
    email,
  });
  await newUser.save();
  return mongooseToObject(newUser.toObject());
};

const getUserByUsername = async (username) => {
  return mongooseToObject(
    await User.findOne({ username }).populate('role').lean()
  );
};

const getUserById = async (id) => {
  return mongooseToObject(
    await User.findById(new mongoose.Types.ObjectId(id)).populate('role').lean()
  );
};

const updateUser = async (id, username, role, email) => {
  const user = await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
    username,
    role: new mongoose.Types.ObjectId(role),
    email,
  }).lean();
  return mongooseToObject(user) !== null;
};

const updateRefreshToken = async (id, refreshToken) => {
  const refreshTokenExpiry = new Date();
  refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7); // Set expiry to 7 days from now
  await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
    refreshToken,
    refreshTokenExpiry,
  });
};

export {
  createUser,
  getUserByUsername,
  getUserById,
  updateUser,
  updateRefreshToken,
};
