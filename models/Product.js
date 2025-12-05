const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    restaurantName: {
      type: String,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: 0,
    },

    newPrice: {
      type: Number,
      required: true,
    },

    quality: {
      type: String,
      default: "",
    },

    addToCart: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String, // Cloudinary URL
      default: "",
    },

    logo: {
      type: String, // Cloudinary URL
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
