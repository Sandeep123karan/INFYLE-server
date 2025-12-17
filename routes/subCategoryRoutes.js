// const express = require("express");
// const router = express.Router();
// const SubCategory = require("../models/SubCategory");

// // GET ALL SUB-CATEGORIES
// router.get("/", async (req, res) => {
//   const data = await SubCategory.find().populate("parent");
//   res.json(data);
// });

// // CREATE
// router.post("/", async (req, res) => {
//   const data = await SubCategory.create(req.body);
//   res.json(data);
// });

// // UPDATE
// router.put("/:id", async (req, res) => {
//   const data = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
//     new: true
//   });
//   res.json(data);
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   await SubCategory.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

// module.exports = router;















// const express = require("express");
// const router = express.Router();
// const SubCategory = require("../models/SubCategory");
// const upload = require("../middleware/upload"); // multer
// const cloudinary = require("../config/cloudinary");

// // GET ALL SUB-CATEGORIES
// router.get("/", async (req, res) => {
//   try {
//     const data = await SubCategory.find().populate("parent");
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // CREATE
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     let imageUrl = "";

//     if (req.file) {
//       const result = await cloudinary.uploader.upload_stream(
//         { folder: "subcategories" },
//         (error, result) => {
//           if (error) throw error;
//           imageUrl = result.secure_url;
//         }
//       );
//       // Upload using buffer
//       result.end(req.file.buffer);
//     }

//     const data = await SubCategory.create({
//       name: req.body.name,
//       parent: req.body.parent,
//       image: imageUrl,
//     });

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UPDATE
// router.put("/:id", upload.single("image"), async (req, res) => {
//   try {
//     let imageUrl = req.body.image || "";

//     if (req.file) {
//       const result = await cloudinary.uploader.upload_stream(
//         { folder: "subcategories" },
//         (error, result) => {
//           if (error) throw error;
//           imageUrl = result.secure_url;
//         }
//       );
//       result.end(req.file.buffer);
//     }

//     const data = await SubCategory.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         parent: req.body.parent,
//         image: imageUrl,
//       },
//       { new: true }
//     );

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     await SubCategory.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;










// const express = require("express");
// const router = express.Router();
// const SubCategory = require("../models/SubCategory");
// const upload = require("../middleware/upload");
// const cloudinary = require("../config/cloudinary");

// // GET ALL SUB-CATEGORIES
// router.get("/", async (req, res) => {
//   const data = await SubCategory.find().populate("parent");
//   res.json(data);
// });

// // CREATE
// router.post("/", upload.single("image"), async (req, res) => {
//   let imageUrl = "";
//   if (req.file) {
//     const result = await cloudinary.uploader.upload_stream(
//       { resource_type: "image" },
//       (error, result) => {
//         if (error) console.error(error);
//         else imageUrl = result.secure_url;
//       }
//     ).end(req.file.buffer);
//   }

//   const data = await SubCategory.create({
//     name: req.body.name,
//     parent: req.body.parent,
//     image: imageUrl
//   });
//   res.json(data);
// });

// // UPDATE
// router.put("/:id", upload.single("image"), async (req, res) => {
//   let imageUrl = req.body.image || "";
//   if (req.file) {
//     const result = await cloudinary.uploader.upload_stream(
//       { resource_type: "image" },
//       (error, result) => {
//         if (error) console.error(error);
//         else imageUrl = result.secure_url;
//       }
//     ).end(req.file.buffer);
//   }

//   const data = await SubCategory.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//       parent: req.body.parent,
//       image: imageUrl
//     },
//     { new: true }
//   );
//   res.json(data);
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   await SubCategory.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

// module.exports = router;











const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const subCategoryController = require("../controllers/subCategoryController");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Serve uploads folder
router.use("/uploads", express.static("uploads"));

// CRUD routes
router.get("/", subCategoryController.getAllSubCategories);
router.post("/", upload.single("image"), subCategoryController.createSubCategory);
router.put("/:id", upload.single("image"), subCategoryController.updateSubCategory);
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
