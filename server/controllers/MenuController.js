const MenuItem = require("../db/MenuSchema");

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postMenuItems = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await MenuItem.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMenuItems = async (req, res) => {
  const menuId = req.params.id;
  try {
    const result = await MenuItem.findByIdAndDelete(menuId);
    if (!menuId) {
      res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json({ message: "MenuItem deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const singleMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await MenuItem.findById(menuId);
    if (!menuId) {
      res.status(404).json(menu);
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  const { _id, title, description, image, category, price, createAt } =
    req.body;
  try {
    const upadtedmenu = await MenuItem.findByIdAndUpdate(
      menuId,
      {
        _id,
        title,
        description,
        image,
        category,
        price,
        createAt,
      },
      { new: true, runValidators: true }
    );
    if (!upadtedmenu) {
      res.status(404).json(upadtedmenu);
    }
    res.status(200).json(upadtedmenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  postMenuItems,
  deleteMenuItems,
  singleMenuItem,
  updateMenuItem,
};
