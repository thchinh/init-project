import * as roleModel from '../models/roleModel.js';

const createRole = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }

  const newRole = await roleModel.createRole(name, description);
  res.status(201).send(`Role created successfully! Role ID: ${newRole._id}`);
};

export { createRole };
