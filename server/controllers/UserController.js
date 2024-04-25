const UserSchema = require("../db/UserSchema");

const getAllUser = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existingUser = await UserSchema.findOne(query);
    if (existingUser) {
      return res.status(302).json({ message: "User already exists" });
    }
    const result = await UserSchema.create(user);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await UserSchema.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUser, createUser, deleteUser };
