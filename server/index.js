const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const MenuItem = require("./db/MenuSchema");
const CartItem = require("./db/CartSchema");

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, DELETE, PUT",
  })
);
app.use(express.json());

// mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/befoodie");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/carts", async (req, res) => {
  const cartItemData = req.body;
  try {
    const newCartItem = await CartItem.create(cartItemData);
    res.json(newCartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/carts", async (req, res) => {
  const email = req.query.email;
  const query = { email: email };

  try {
    const result = await CartItem.find(query);
    res.send(result);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).send({ message: "Error fetching cart items" });
  }
});

// get specific carts
// GET route to fetch a single cart item by its ID
app.get("/carts/:id", async (req, res) => {
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
});

// delete from cart
app.delete("/carts/:id", async (req, res) => {
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
});

// Define your PUT route
app.put("/carts/:id", async (req, res) => {
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
});

// .env
// require("dotenv").config();
// console.log(process.env);

app.get("/", (req, res) => {
  res.send("Hello Deepa!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// mongodb://localhost:27017
