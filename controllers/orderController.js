const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE ORDER
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name price");

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
  try {
    const { status, totalAmount } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status, totalAmount },
      { new: true }
    )
      .populate("user", "name email")
      .populate("products.product", "name price image");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET FULL ORDER HISTORY
exports.getFullHistory = async (req, res) => {
  try {
    const history = await Order.find()
      .populate("user", "name email")
      .populate("cancelledBy", "name email")
      .populate("products.product", "name price image")
      .sort({ orderedAt: -1 }); // latest first

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

