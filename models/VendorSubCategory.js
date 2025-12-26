const mongoose = require("mongoose");

const VendorSubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorSubCategory", VendorSubCategorySchema);
