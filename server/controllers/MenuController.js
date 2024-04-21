const MenuItem = require("../db/MenuSchema");

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllMenuItems,
};
