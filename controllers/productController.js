




const fs = require("fs");
const csv = require("csv-parser");
const { Parser } = require("json2csv");
const Product = require("../models/Product");

// ====================================
// GET products
// ====================================
exports.getProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", sort = "", category, subcategory } = req.query;
    page = Number(page);
    limit = Number(limit);

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { restaurantName: { $regex: search, $options: "i" } }
      ];
    }

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    let sortOption = { createdAt: -1 };
    if (sort === "low") sortOption.newPrice = 1;
    if (sort === "high") sortOption.newPrice = -1;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category")
      .populate("subcategory")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// GET by ID
// ====================================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subcategory");

    if (!product) return res.status(404).json({ message: "Not found" });

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// ADD product
// ====================================
exports.addProduct = async (req, res) => {
  try {
    const {
      name, category, description, restaurantName,
      oldPrice, newPrice, quality, addToCart, stock, subcategory
    } = req.body;

    const imageUrl = req.files?.image ? req.files.image[0].path : "";
    const logoUrl = req.files?.logo ? req.files.logo[0].path : "";

    const newProduct = new Product({
      name, category, description, restaurantName,
      oldPrice, newPrice, quality, addToCart, stock,
      subcategory: subcategory || null,
      image: imageUrl,
      logo: logoUrl
    });

    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// UPDATE product
// ====================================
exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files?.image) updateData.image = req.files.image[0].path;
    if (req.files?.logo) updateData.logo = req.files.logo[0].path;

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// DELETE
// ====================================
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// EXPORT CSV
// ====================================
exports.exportProductsCSV = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory");

    const fields = [
      "name",
      "description",
      "restaurantName",
      "oldPrice",
      "newPrice",
      "quality",
      "addToCart",
      "stock",
      "category.name",
      "subcategory.name",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(products);

    res.header("Content-Type", "text/csv");
    res.attachment("products.csv");
    res.send(csv);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// IMPORT CSV
// ====================================
exports.importCSV = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No CSV file uploaded" });

    let products = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => products.push(row))
      .on("end", async () => {
        await Product.insertMany(products);
        res.json({ message: "Products imported successfully" });
      });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
