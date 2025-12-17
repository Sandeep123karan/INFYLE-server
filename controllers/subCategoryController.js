








const SubCategory = require("../models/SubCategory");

// GET ALL SUB-CATEGORIES
exports.getAllSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.find().populate("parent", "_id name");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE SUBCATEGORY
exports.createSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newSub = await SubCategory.create({ name, parent, image });
    res.json(newSub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE SUBCATEGORY
exports.updateSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const updateData = { name, parent };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedSub = await SubCategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedSub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE SUBCATEGORY
exports.deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
