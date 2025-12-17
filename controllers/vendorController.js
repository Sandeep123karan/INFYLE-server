


// const Vendor = require("../models/Vendor");

// exports.updateProfile = async (req, res) => {
//     try {
//         const vendorId = req.body.vendorId;

//         if (!vendorId) {
//             return res.status(400).json({ message: "Vendor ID required" });
//         }

//         const vendor = await Vendor.findById(vendorId);
//         if (!vendor) {
//             return res.status(404).json({ message: "Vendor not found" });
//         }

//         // Text fields
//         vendor.shopName = req.body.shopName;
//         vendor.address = req.body.address;
//         vendor.gmail = req.body.gmail;
//         vendor.fssai = req.body.fssai;

//         // File uploads
//         if (req.files.shopPhoto) vendor.shopPhoto = req.files.shopPhoto[0].path;
//         if (req.files.aadhaarPhoto) vendor.aadhaarPhoto = req.files.aadhaarPhoto[0].path;
//         if (req.files.panPhoto) vendor.panPhoto = req.files.panPhoto[0].path;
//         if (req.files.fssaiPhoto) vendor.fssaiPhoto = req.files.fssaiPhoto[0].path;

//         vendor.isKYCCompleted = true;
//         await vendor.save();

//         res.json({ message: "KYC Updated Successfully", vendor });

//     }
//      catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Server Error", error: err });
//     }
//     exports.getVendors = async (req, res) => {
//     try {
//         const vendors = await Vendor.find();
//         res.json(vendors);
//     } catch (err) {
//         res.status(500).json({ message: "Server Error", error: err });
//     }
// };

// };









const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create / Signup Vendor
exports.addVendor = async (req, res) => {
  try {
    const { name, shop, email, phone, password } = req.body;
    if (!name || !shop || !email || !phone || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = new Vendor({ name, shop, email, phone, password: hashedPassword });
    await vendor.save();

    res.status(201).json({ message: "Vendor registered successfully", vendor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Vendor Login
exports.vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: vendor._id, role: "vendor" }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, vendorId: vendor._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all vendors
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Vendor Profile / KYC
exports.updateProfile = async (req, res) => {
  try {
    const vendorId = req.body.vendorId;
    if (!vendorId) return res.status(400).json({ message: "Vendor ID required" });

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    vendor.shopName = req.body.shopName || vendor.shopName;
    vendor.address = req.body.address || vendor.address;
    vendor.gmail = req.body.gmail || vendor.gmail;
    vendor.fssai = req.body.fssai || vendor.fssai;

    if (req.files) {
      if (req.files.shopPhoto) vendor.shopPhoto = req.files.shopPhoto[0].path;
      if (req.files.aadhaarPhoto) vendor.aadhaarPhoto = req.files.aadhaarPhoto[0].path;
      if (req.files.panPhoto) vendor.panPhoto = req.files.panPhoto[0].path;
      if (req.files.fssaiPhoto) vendor.fssaiPhoto = req.files.fssaiPhoto[0].path;
    }

    vendor.isKYCCompleted = true;
    await vendor.save();

    res.json({ message: "KYC Updated Successfully", vendor });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete Vendor
exports.deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    await Vendor.findByIdAndDelete(id);
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
