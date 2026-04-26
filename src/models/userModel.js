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
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const User = mongoose.model('User', userSchema);

const createUser = async (username, password, role) => {
  const newUser = new User({
    username,
    password,
    role: new mongoose.Types.ObjectId(role),
  });
  await newUser.save();
  return mongooseToObject(newUser);
};

const getUserByUsername = async (username) => {
  return mongooseToObject(
    await User.findOne({ username }).populate('role').lean()
  );
};

const updateUser = async (id, username, role) => {
  const user = await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
    username,
    role: new mongoose.Types.ObjectId(role),
  }).lean();
  return mongooseToObject(user) !== null;
};

export { createUser, getUserByUsername, updateUser };
