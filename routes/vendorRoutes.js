const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  addVendor,
  vendorLogin,
  updateKYC,
  getVendors,
  approveVendor,
  rejectVendor,
  deleteVendor
} = require("../controllers/vendorController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post("/add", addVendor);
router.post("/login", vendorLogin);
router.get("/all", getVendors);

router.post("/kyc", upload.fields([
  { name: "shopPhoto" },
  { name: "aadhaarPhoto" },
  { name: "panPhoto" },
  { name: "gstCertificate" }
]), updateKYC);

router.put("/approve/:id", approveVendor);
router.put("/reject/:id", rejectVendor);
router.delete("/delete/:id", deleteVendor);

module.exports = router;
