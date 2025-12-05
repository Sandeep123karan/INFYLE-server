

const express = require("express");
const router = express.Router();
const cloudUpload = require("../middleware/cloudUpload"); // Make sure this exists
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  exportProductsCSV,
} = require("../controllers/productController");

// ------------------- Routes -------------------

// Export products as CSV (must be before :id route)
router.get("/export/csv", exportProductsCSV);

// Get all products with pagination, search, filter, sort
router.get("/", getProducts);

// Get single product by ID
router.get("/:id", getProductById);

// Add new product with image/logo upload
router.post(
  "/",
  cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
  addProduct
);

// Update existing product with image/logo upload
router.put(
  "/:id",
  cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
  updateProduct
);

// Delete product
router.delete("/:id", deleteProduct);

module.exports = router;
