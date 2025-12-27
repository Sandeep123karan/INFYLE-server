


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// const app = express();

// // Enable CORS for frontend
// // app.use(cors({
// //   origin: ["http://localhost:3000","http://localhost:5173","http://localhost:5174","http://localhost:5175","https://client-main-7ruqzxexf-sandeeps-projects-c6e2eb71.vercel.app"], // React frontend
// //   methods: ["GET","POST","PUT","DELETE","OPTIONS"],
// //   allowedHeaders: ["Content-Type","Authorization"],
// //   credentials: true
// // }));

// // Handle preflight requests
// app.options("*", cors());

// // Parse JSON
// app.use(express.json());

// // Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Import routes

// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/auth");
// const categoryRoutes = require("./routes/categoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");
// const customerRoutes = require("./routes/customerRoutes");
// const vendorAuthRoutes = require("./routes/vendorAuth");
// const adminVendorRoutes = require("./routes/adminVendor");

// // Use routes
// // app.use("/api/vendor", vendorRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);       // login & register
// app.use("/api/categories", categoryRoutes);
// app.use("/api/subcategories", subCategoryRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/customer", customerRoutes);
// app.use("/api/vendor", vendorAuthRoutes);
// app.use("/api/admin", adminVendorRoutes);
// app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
// app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
// app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));

// // Connect to MongoDB & start server
// // const PORT = process.env.PORT || 7002;

// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log("✅ MongoDB Connected");
// //     app.listen(PORT, () =>
// //       console.log(`🚀 Server running on port ${PORT}`)
// //     );
// //   })
// //   .catch((err) => console.log("❌ MongoDB Error:", err.message));



// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Error:", err.message));

// module.exports = app;






const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

/* =====================
   MIDDLEWARES
===================== */

// CORS (Vercel + Local dono ke liye safe)
app.use(
  cors({
     origin: ["http://localhost:3000","http://localhost:5173","http://localhost:5174","http://localhost:5175","https://client-main-two.vercel.app","https://client-main-7ruqzxexf-sandeeps-projects-c6e2eb71.vercel.app"], // React frontend
    
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight
app.options("*", cors());

// JSON parser
app.use(express.json());

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =====================
   ROUTES
===================== */

app.get("/", (req, res) => {
  res.send("INFYLE Server Live on Vercel 🚀");
});

app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/vendor", require("./routes/vendorAuth"));
app.use("/api/admin", require("./routes/adminVendor"));
app.use("/api/vendor/categories", require("./routes/vendorCategoryRoutes"));
app.use("/api/vendor/products", require("./routes/vendorProductRoutes"));
app.use("/api/vendor/subcategories", require("./routes/vendorSubCategoryRoutes"));

/* =====================
   DATABASE
===================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

/* =====================
   EXPORT (Vercel)
===================== */

module.exports = app;
