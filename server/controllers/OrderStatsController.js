const Menu = require("../db/MenuSchema");
const Payment = require("../db/PaymentSchema");

const orderStats = async (req, res) => {
  try {
    // Fetch all payments
    const payments = await Payment.find();

    // Collect all distinct menu item IDs from the payments
    const menuItemIds = payments.map((payment) => payment.menuItems).flat();

    // Fetch all menu items corresponding to these IDs
    const menuItems = await Menu.find({ _id: { $in: menuItemIds } });

    // Create a map to store category-based stats
    const categoryStats = {};

    // Iterate over each payment to calculate stats
    payments.forEach((payment) => {
      // Determine the average quantity and revenue per menu item in this payment
      const numItems = payment.menuItems.length;
      const averageQuantity = payment.quantity / numItems;
      const averageRevenue = payment.price / numItems;

      payment.menuItems.forEach((menuItemId) => {
        const menuItem = menuItems.find(
          (item) => item._id.toString() === menuItemId.toString()
        );

        if (menuItem) {
          const category = menuItem.category;

          if (!categoryStats[category]) {
            categoryStats[category] = {
              category,
              totalQuantity: 0,
              totalRevenue: 0,
            };
          }

          // Add the derived quantity and revenue to the respective category
          categoryStats[category].totalQuantity += averageQuantity;
          categoryStats[category].totalRevenue += averageRevenue;
        }
      });
    });

    // Convert the categoryStats object into an array for easier handling
    const categoryStatsArray = Object.values(categoryStats);

    // Return the computed statistics
    res.status(200).json({ categoryStats: categoryStatsArray });
  } catch (error) {
    console.error("Error calculating category stats:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const revenueOverTime = async (req, res) => {
  try {
    const payments = await Payment.find();

    const revenueOverTimeData = payments.reduce((acc, payment) => {
      const date = new Date(payment.createdAt).toISOString().split("T")[0]; // Get only the date part
      if (!acc[date]) {
        acc[date] = {
          date,
          revenue: 0,
        };
      }
      acc[date].revenue += payment.price;
      return acc;
    }, {});

    const revenueOverTimeArray = Object.values(revenueOverTimeData);

    res.status(200).json({ revenueOverTime: revenueOverTimeArray }); // Changed to a more descriptive key
  } catch (error) {
    console.error("Error calculating revenue over time:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  orderStats,
  revenueOverTime,
};
