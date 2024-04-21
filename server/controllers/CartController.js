const CartItem = require("../db/CartSchema");

const addToCart = async (req, res) => {
  const { menuItemId, email } = req.body;

  if (!menuItemId || !email) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    const existingItem = await CartItem.findOne({ menuItemId, email });
    if (existingItem) {
      return res
        .status(400)
        .json({ message: "Product already exists in the cart!" });
    }
    const newCartItem = await CartItem.create(req.body);
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteCart = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await CartItem.findByIdAndDelete(id);
    console.log(id);
    if (result) {
      res.status(200).json({ message: "Cart item deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (!Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ message: "Invalid quantity provided" });
  }

  try {
    const updatedCartItem = await CartItem.findByIdAndUpdate(
      id,
      { $set: { quantity: quantity } },
      { new: true, upsert: false }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getSingleCart = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await CartItem.findById(id);
    console.log(id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const emailQuery = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };

  try {
    const result = await CartItem.find(query);
    res.send(result);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).send({ message: "Error fetching cart items" });
  }
};
module.exports = {
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
  emailQuery,
};
