import mongoose from 'mongoose';
import { mongooseToObject } from '../utils/mongooseToObject.js';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model('Role', roleSchema);

const createRole = async (name, description) => {
  const newRole = new Role({ name, description });
  await newRole.save();
  return mongooseToObject(newRole);
};

const getRoleByName = async (name) => {
  return mongooseToObject(await Role.findOne({ name }).lean());
};

export { createRole, getRoleByName };
