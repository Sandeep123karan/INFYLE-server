const mongoose = require("mongoose");

const VendorProductSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    },

    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    restaurantName: { type: String, required: true },

    oldPrice: { type: Number, default: 0 },
    newPrice: { type: Number, required: true },

    quality: { type: String, default: "" },
    addToCart: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },

    image: { type: String, default: "" },
    logo: { type: String, default: "" },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorCategory",
      required: true
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorSubCategory",
      default: null
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.VendorProduct ||
  mongoose.model("VendorProduct", VendorProductSchema);
