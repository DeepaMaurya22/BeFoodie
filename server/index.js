const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/verifyToken");
const verifyAdmin = require("./middleware/verifyAdmin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, DELETE, PUT, PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
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
const userController = require("./controllers/UserController");
const paymentController = require("./controllers/PaymentController");
const adminStatsController = require("./controllers/AdminStatsController");
const orderStatsController = require("./controllers/OrderStatsController");

app.get("/menu", menuController.getAllMenuItems);
app.post("/menu", menuController.postMenuItems);
app.delete("/menu/:id", menuController.deleteMenuItems);
app.get("/menu/:id", menuController.singleMenuItem);
app.patch("/menu/:id", menuController.updateMenuItem);

app.post("/carts", cartController.addToCart);

app.get("/carts", verifyToken, cartController.emailQuery);

// get specific carts
// GET route to fetch a single cart item by its ID
app.get("/carts/:id", cartController.getSingleCart);

// delete from cart
app.delete("/carts/:id", cartController.deleteCart);

// Define your PUT route
app.put("/carts/:id", cartController.updateCart);

// user route
app.get("/users", verifyToken, verifyAdmin, userController.getAllUser);
app.post("/users", userController.createUser);

app.delete("/users/:id", verifyToken, verifyAdmin, userController.deleteUser);

app.get("/users/admin/:email", verifyToken, userController.getAdmin);
// app.get("/users/admin/:id", userController.makeAdmin);
app.patch(
  "/users/admin/:id",
  verifyToken,
  verifyAdmin,
  userController.makeAdmin
);

app.post("/payments", verifyToken, paymentController.postPayment);
app.get("/payments", verifyToken, paymentController.getAllOrders);
app.get("/payments/all", paymentController.getAllPayments);
app.patch("/payments/:id", paymentController.updateOrderStatus);

// .env
// require("dotenv").config();
// console.log(process.env);

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// verify jwt token
// middleware

// console.log(verifyToken);

// stripe payment

// Express.js code to create a payment intent with a description
app.post("/create-payment-intent", async (req, res) => {
  const { price, description } = req.body;

  if (!description) {
    throw new Error("Transaction description is required");
  }

  const amount = Math.round(price * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr", // Adjust as needed
      description,
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Error creating payment intent" });
  }
});

// admin dashboard stats
app.get("/adminStats", adminStatsController.statistics);
app.get("/order-stats", orderStatsController.orderStats);
app.get("/revenue-over-time", orderStatsController.revenueOverTime);

app.get("/", (req, res) => {
  res.send("Hello Deepa!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
