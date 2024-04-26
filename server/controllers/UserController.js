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
  const { name, email } = req.body;

  // Ensure `name` and `email` are present
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const query = { email };
    const existingUser = await UserSchema.findOne(query);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); // Return 409 for existing users
    }

    const newUser = { name, email };
    const result = await UserSchema.create(newUser);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in createUser:", error); // Log the error
    return res.status(500).json({ message: "Internal Server Error" });
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

const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await UserSchema.findOne(query);
    // console.log(user);
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const { name, email, photoURL, role } = req.body;
  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUser, createUser, deleteUser, getAdmin, makeAdmin };
