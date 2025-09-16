// controllers/orderController.js

const Order = require("./models/order");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const { items, paymentMethod, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order" });
    }

    const newOrder = new Order({
      user: userId,
      items,
      paymentMethod,
      shippingAddress: shippingAddress || {}
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: newOrder._id,
      status: newOrder.status
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({
      message: "Order creation failed",
      error: error.message
    });
  }
};

module.exports = {
  placeOrder
};
