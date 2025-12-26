const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER */
exports.addVendor = async (req, res) => {
  const { name, shop, email, phone, password } = req.body;
  if (!name || !shop || !email || !phone || !password)
    return res.status(400).json({ message: "All fields required" });

  const exists = await Vendor.findOne({ email });
  if (exists) return res.status(400).json({ message: "Vendor already exists" });

  const hash = await bcrypt.hash(password, 10);
  const vendor = await Vendor.create({ name, shop, email, phone, password: hash });

  res.status(201).json({ message: "Vendor registered", vendor });
};

/* LOGIN */
exports.vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email });
  if (!vendor) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, vendor.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: vendor._id }, "secret", { expiresIn: "7d" });
  res.json({ token, vendor });
};

/* KYC UPDATE */
exports.updateKYC = async (req, res) => {
  const { vendorId } = req.body;
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) return res.status(404).json({ message: "Vendor not found" });

  Object.assign(vendor, req.body);

  if (req.files) {
    if (req.files.shopPhoto) vendor.shopPhoto = req.files.shopPhoto[0].path;
    if (req.files.aadhaarPhoto) vendor.aadhaarPhoto = req.files.aadhaarPhoto[0].path;
    if (req.files.panPhoto) vendor.panPhoto = req.files.panPhoto[0].path;
    if (req.files.gstCertificate) vendor.gstCertificate = req.files.gstCertificate[0].path;
  }

  vendor.isKYCCompleted = true;
  await vendor.save();

  res.json({ message: "KYC updated", vendor });
};

/* ADMIN */
exports.getVendors = async (_, res) => {
  const vendors = await Vendor.find().sort({ createdAt: -1 });
  res.json(vendors);
};

exports.approveVendor = async (req, res) => {
  await Vendor.findByIdAndUpdate(req.params.id, { isApproved: true });
  res.json({ message: "Vendor approved" });
};

exports.rejectVendor = async (req, res) => {
  await Vendor.findByIdAndUpdate(req.params.id, { isApproved: false });
  res.json({ message: "Vendor rejected" });
};

exports.deleteVendor = async (req, res) => {
  await Vendor.findByIdAndDelete(req.params.id);
  res.json({ message: "Vendor deleted" });
};
