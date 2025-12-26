const express = require("express");
const router = express.Router();

const cloudUpload = require("../middleware/cloudUpload");
const vendorAuth = require("../middleware/vendorAuth");

const {
  getVendorProducts,
  getVendorProductById,
  addVendorProduct,
  updateVendorProduct,
  deleteVendorProduct
} = require("../controllers/vendorProductController");

/* PROTECTED */
router.use(vendorAuth);

// GET ALL
router.get("/", getVendorProducts);

// GET ONE
router.get("/:id", getVendorProductById);

// CREATE
router.post(
  "/",
  cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
  addVendorProduct
);

// UPDATE
router.put(
  "/:id",
  cloudUpload.fields([{ name: "image" }, { name: "logo" }]),
  updateVendorProduct
);

// DELETE
router.delete("/:id", deleteVendorProduct);

module.exports = router;
