const jwt = require("jsonwebtoken");
const Vendor = require("../models/VendorModel");

const vendorAuth = async (req, res, next) => {
  try {
    /* =========================
       Get Token
    ========================= */
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    /* =========================
       Verify Token
    ========================= */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* =========================
       Find Vendor
    ========================= */
    const vendor = await Vendor.findById(decoded.id).select("-password");

    if (!vendor) {
      return res.status(401).json({
        message: "Vendor not found"
      });
    }

    /* =========================
       Attach Vendor to Request
    ========================= */
    req.vendor = vendor;
    next();

  } catch (err) {
    console.error("VendorAuth Error:", err.message);
    res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = vendorAuth;
