const { table } = require('node:console');

db.courses.insertMany([
  {
    name: 'NodeJS',
    description: 'Khóa học NodeJS từ cơ bản đến nâng cao',
    img: 'https://cdn.sanity.io/images/uu46dekc/production/8399d1ec2a8250899e5ff0052b99cfb1e2c01ab1-900x900.png?auto=format&fit=max&q=75&w=900',
  },
  {
    name: 'SB - Lập trình Scratch cơ bản dành cho thiếu nhi',
    description: 'Khóa học Scratch từ cơ bản đến nâng cao',
    img: 'https://cdn.sanity.io/images/uu46dekc/production/66b13ea9119e9fadeafd73c398b191edbabdd8c7-900x900.png?auto=format&fit=max&q=75&w=900',
  },
]);

db.courses.insertOne({
  name: 'Net core',
  description: 'Khóa học Net core từ cơ bản đến nâng cao',
  img: 'https://cdn.sanity.io/images/uu46dekc/production/66b13ea9119e9fadeafd73c398b191edbabdd8c7-900x900.png?auto=format&fit=max&q=75&w=900',
  price: 1000000,
  isDelete: false,
});

db.courses.insertMany([
  {
    name: 'Data analytics',
    description: 'Khóa học Data analytics từ cơ bản đến nâng cao',
    img: 'https://cdn.sanity.io/images/uu46dekc/production/66b13ea9119e9fadeafd73c398b191edbabdd8c7-900x900.png?auto=format&fit=max&q=75&w=900',
    price: 5000000,
    isDelete: false,
    tags: ['data', 'analytics', 'python'],
  },
  {
    name: 'Frontend',
    description: 'Khóa học Frontend từ cơ bản đến nâng cao',
    img: 'https://cdn.sanity.io/images/uu46dekc/production/66b13ea9119e9fadeafd73c398b191edbabdd8c7-900x900.png?auto=format&fit=max&q=75&w=900',
    price: 5000000,
    isDelete: false,
    tags: ['frontend', 'javascript', 'react'],
  },
]);

db.courses.find({
  tags: {
    $in: ['data'],
  },
});

db.courses.updateOne(
  {
    name: 'Net core',
  },
  {
    $set: {
      price: 2000000,
    },
  }
);

db.courses.find({
  price: {
    $gt: 2000000,
  },
});
