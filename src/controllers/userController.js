import * as userModel from '../models/userModel.js';

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  const updated = await userModel.updateUser(id, username, role);
  if (updated) {
    res.send('User updated successfully');
  } else {
    res.status(404).send('User not found');
  }
};

export { updateUser };
