import { extname } from 'path';
import fs from 'fs';
import { IMAGE_PATH } from '../constants/pathConstant.js';

const handleSaveImage = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }
  const ext = extname(file.originalname);
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const fullName = file.fieldname + '-' + uniqueSuffix + ext;
  const filePath = `${IMAGE_PATH}/${fullName}`;
  await fs.writeFileSync(filePath, file.buffer);
  return fullName;
};

const handleRemoveImage = async (imageName) => {
  if (!imageName) {
    throw new Error('No image name provided');
  }

  const imagePath = `${IMAGE_PATH}/${imageName}`;

  if (fs.existsSync(imagePath)) {
    await fs.unlinkSync(imagePath);
  } else {
    throw new Error('Image not found');
  }
};

const isExistImage = (imageName) => {
  if (!imageName) {
    throw new Error('No image name provided');
  }

  const imagePath = `${IMAGE_PATH}/${imageName}`;
  return fs.existsSync(imagePath);
};

const imaService = {
  handleSaveImage,
  handleRemoveImage,
  isExistImage,
};

export default imaService;
