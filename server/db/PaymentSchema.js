const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
  },
  email: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  status: {
    type: String,
  },
  itemName: Array,
  cartItems: Array,
  menuItems: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
