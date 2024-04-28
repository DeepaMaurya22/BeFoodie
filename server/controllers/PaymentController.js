const Payment = require("../db/PaymentSchema");
const Cart = require("../db/CartSchema");
const mongoose = require("mongoose");
const PaymentSchema = require("../db/PaymentSchema");

const ObjectId = mongoose.Types.ObjectId;
const postPayment = async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);

    // after payment delete cart
    const cardIds = payment.cartItems.map((id) => new ObjectId(id));
    const deleteCartRequest = await Cart.deleteMany({ _id: { $in: cardIds } });
    res.status(200).json({ deleteCartRequest, paymentRequest });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentSchema.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(payments);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const payId = req.params.id;
  const { status } = req.body;
  try {
    const updateStatus = await PaymentSchema.findByIdAndUpdate(
      payId,
      { status: "confirmed" },
      { new: true, runValidators: true }
    );
    if (!updateStatus) {
      res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(updateStatus);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

module.exports = {
  postPayment,
  getAllOrders,
  getAllPayments,
  updateOrderStatus,
};
