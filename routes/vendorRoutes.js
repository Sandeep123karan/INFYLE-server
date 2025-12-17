



// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// const { updateProfile } = require("../controllers/vendorController");

// // Multer upload folder
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, "uploads/");
//         },
//         filename: function (req, file, cb) {
//             cb(null, Date.now() + path.extname(file.originalname));
//         }
//     })
// });

// // KYC UPLOAD API
// router.post(
//     "/update-profile",
//     upload.fields([
//         { name: "shopPhoto", maxCount: 1 },
//         { name: "aadhaarPhoto", maxCount: 1 },
//         { name: "panPhoto", maxCount: 1 },
//         { name: "fssaiPhoto", maxCount: 1 }
//     ]),
//     updateProfile
// );

// module.exports = router;







const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addVendor, vendorLogin, updateProfile, getVendors, deleteVendor } = require("../controllers/vendorController");

// Multer config
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "uploads/"); },
    filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
  })
});

// CRUD Routes
router.post("/add-vendor", addVendor);
router.post("/login", vendorLogin);
router.get("/all", getVendors);
router.post("/update-profile", upload.fields([
  { name: "shopPhoto" }, { name: "aadhaarPhoto" }, { name: "panPhoto" }, { name: "fssaiPhoto" }
]), updateProfile);
router.delete("/delete/:id", deleteVendor);

module.exports = router;
