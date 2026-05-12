import path from 'node:path';
import fs from 'node:fs';
import { COURSE_IMAGE_PATH } from '../constants/pathConstant.js';

const saveImage = (file) => {
  if (!file) {
    throw new Error('Please provide an image file');
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const extension = path.extname(file.originalname);
  const uploadDir = path.join(path.resolve(), COURSE_IMAGE_PATH);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `img-${uniqueSuffix}${extension}`;
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, file.buffer);

  return fileName;
};

const deleteImage = (imageName) => {
  if (!imageName) {
    throw new Error('Please provide an image file');
  }

  const filePath = path.join(path.resolve(), COURSE_IMAGE_PATH, imageName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const isExistImage = (imageName) => {
  if (!imageName) {
    throw new Error('Please provide an image file');
  }
  const filePath = path.join(path.resolve(), COURSE_IMAGE_PATH, imageName);
  return fs.existsSync(filePath);
};

const imageService = {
  saveImage,
  deleteImage,
  isExistImage,
};

export default imageService;
