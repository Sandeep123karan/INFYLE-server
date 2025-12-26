const VendorCategory = require("../models/VendorCategory");

/* =========================
   GET Vendor Categories
========================= */
exports.getVendorCategories = async (req, res) => {
  try {
    const categories = await VendorCategory.find({
      vendor: req.vendor._id
    }).sort({ createdAt: -1 });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   CREATE Vendor Category
========================= */
exports.createVendorCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = new VendorCategory({
      vendor: req.vendor._id,
      name,
      description,
      image: req.file ? req.file.path : null
    });

    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   GET Single Category
========================= */
exports.getVendorCategoryById = async (req, res) => {
  try {
    const category = await VendorCategory.findOne({
      _id: req.params.id,
      vendor: req.vendor._id
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE Vendor Category
========================= */
exports.updateVendorCategory = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await VendorCategory.findOneAndUpdate(
      { _id: req.params.id, vendor: req.vendor._id },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   DELETE Vendor Category
========================= */
exports.deleteVendorCategory = async (req, res) => {
  try {
    const deleted = await VendorCategory.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
