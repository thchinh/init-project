// const courses = [
//   {
//     id: 1,
//     name: "NodeJS",
//     description: "Khóa học NodeJS từ cơ bản đến nâng cao",
//     img: "https://cdn.sanity.io/images/uu46dekc/production/8399d1ec2a8250899e5ff0052b99cfb1e2c01ab1-900x900.png?auto=format&fit=max&q=75&w=900",
//   },
//   {
//     id: 2,
//     name: "ReactJS",
//     description: "Khóa học ReactJS từ cơ bản đến nâng cao",
//     img: "https://cdn.sanity.io/images/uu46dekc/production/565b6e0feb90a008264979c9cec6c7b24747d24e-900x900.png?auto=format&fit=max&q=75&w=900",
//   },
//   {
//     id: 3,
//     name: "SB - Lập trình Scratch cơ bản dành cho thiếu nhi",
//     description: "Khóa học Scratch từ cơ bản đến nâng cao",
//     img: "https://cdn.sanity.io/images/uu46dekc/production/66b13ea9119e9fadeafd73c398b191edbabdd8c7-900x900.png?auto=format&fit=max&q=75&w=900",
//   },
// ];

import connection from '../config/databaseConfig.js';

const getAllCourses = async () => {
  const sql = 'SELECT * FROM courses';
  const [rows] = await connection.execute(sql);
  return rows;
};

const getCourseById = async (id) => {
  const sql = 'SELECT * FROM courses WHERE id = ?';
  const [rows] = await connection.execute(sql, [id]);

  if (rows.length === 0) return null;

  return rows[0];
};

const createCourse = async (name, description, img) => {
  const sql = 'INSERT INTO courses (name, description, img) VALUES (?, ?, ?)';
  const [result] = await connection.execute(sql, [name, description, img]);
  return { id: result.insertId, name, description, img };
};

const removeCourse = async (id) => {
  const sql = 'DELETE FROM courses WHERE id = ?';
  const [result] = await connection.execute(sql, [id]);
  return result.affectedRows > 0;
};

const updateCourse = async (id, name, description, img) => {
  const sql =
    'UPDATE courses SET name = ?, description = ?, img = ? WHERE id = ?';
  const [result] = await connection.execute(sql, [name, description, img, id]);
  return result.affectedRows > 0;
};

export {
  getAllCourses,
  getCourseById,
  createCourse,
  removeCourse,
  updateCourse,
};
