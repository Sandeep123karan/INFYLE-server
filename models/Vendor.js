const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shop: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  // KYC
  shopName: String,
  address: String,
  fssai: String,
  gstin: String,

  shopPhoto: String,
  aadhaarPhoto: String,
  panPhoto: String,
  gstCertificate: String,

  isKYCCompleted: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);
