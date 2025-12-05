const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getFullHistory
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/history/all", getFullHistory);  // <-- NEW
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
