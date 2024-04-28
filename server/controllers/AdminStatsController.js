const User = require("../db/UserSchema");
const Menu = require("../db/MenuSchema");
const Payment = require("../db/PaymentSchema");

const statistics = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const menuItems = await Menu.countDocuments();
    const orders = await Payment.countDocuments();

    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
        },
      },
    ]);
    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    res.status(200).json({ users, menuItems, orders, revenue });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

module.exports = { statistics };
