








const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shop: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },

    // KYC fields
    shopName: { type: String },
    address: { type: String },
    gmail: { type: String },
    fssai: { type: String },

    shopPhoto: { type: String },
    aadhaarPhoto: { type: String },
    panPhoto: { type: String },
    fssaiPhoto: { type: String },

    isKYCCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);
