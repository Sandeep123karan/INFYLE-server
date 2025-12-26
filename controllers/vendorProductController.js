const VendorProduct = require("../models/VendorProduct");

/* =========================
   GET Vendor Products
========================= */
exports.getVendorProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category
    } = req.query;

    const query = {
      vendor: req.vendor._id
    };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (category) query.category = category;

    const total = await VendorProduct.countDocuments(query);

    const products = await VendorProduct.find(query)
      .populate("category")
      .populate("subcategory")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      products,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET BY ID
========================= */
exports.getVendorProductById = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id
    })
      .populate("category")
      .populate("subcategory");

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   CREATE
========================= */
exports.addVendorProduct = async (req, res) => {
  try {
    const {
      name, description, restaurantName,
      oldPrice, newPrice, quality,
      addToCart, stock, category, subcategory
    } = req.body;

    const image = req.files?.image ? req.files.image[0].path : "";
    const logo = req.files?.logo ? req.files.logo[0].path : "";

    const product = new VendorProduct({
      vendor: req.vendor._id,
      name,
      description,
      restaurantName,
      oldPrice,
      newPrice,
      quality,
      addToCart,
      stock,
      category,
      subcategory: subcategory || null,
      image,
      logo
    });

    await product.save();
    res.status(201).json(product);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   UPDATE
========================= */
exports.updateVendorProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files?.image)
      updateData.image = req.files.image[0].path;

    if (req.files?.logo)
      updateData.logo = req.files.logo[0].path;

    const updated = await VendorProduct.findOneAndUpdate(
      { _id: req.params.id, vendor: req.vendor._id },
      updateData,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Product not found" });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   DELETE
========================= */
exports.deleteVendorProduct = async (req, res) => {
  try {
    const deleted = await VendorProduct.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id
    });

    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
