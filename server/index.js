const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
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

const cartController = require("./controllers/CartController");
const menuController = require("./controllers/MenuController");

app.get("/menu", menuController.getAllMenuItems);

app.post("/carts", cartController.addToCart);

app.get("/carts", cartController.emailQuery);

// get specific carts
// GET route to fetch a single cart item by its ID
app.get("/carts/:id", cartController.getSingleCart);

// delete from cart
app.delete("/carts/:id", cartController.deleteCart);

// Define your PUT route
app.put("/carts/:id", cartController.updateCart);

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
