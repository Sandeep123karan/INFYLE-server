

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// const vendorAuthRoutes = require("./routes/vendorAuth");
// const authRoutes = require("./routes/auth");
// const vendorRoutes = require("./routes/vendorRoutes");
// app.use("/api/vendor", vendorRoutes);



// const app = express();

// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/api/vendor", vendorAuthRoutes); // vendor login/signup
// app.use("/api/auth", authRoutes);          // user/admin login/signup

// const PORT = process.env.PORT || 7000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch(err => console.log("❌ MongoDB Error:", err.message));






// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// const vendorRoutes = require("./routes/vendorRoutes");

// const app = express();

// // Middleware
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/vendor", vendorRoutes);

// const PORT = process.env.PORT || 7000;

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch(err => console.log("❌ MongoDB Error:", err.message));







// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");



// dotenv.config();

// const app = express();

// // Middleware
// // app.use(cors({ origin: "http://localhost:3000" }));
// // app.use(express.json());
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // Routes
// // app.use("/api/vendor", vendorRoutes);
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/customer", require("./routes/customerRoutes"));

// // Import All Routes
// const vendorRoutes = require("./routes/vendorRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/auth"); // ⭐ IMPORTANT
// const categoryRoutes = require("./routes/categoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");

// // Use Routes
// app.use("/vendor", vendorRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);     // ⭐ ADMIN LOGIN + REGISTER ROUTE (correct place)
// app.use("/api/categories", categoryRoutes);
// app.use("/api/subcategories", subCategoryRoutes);
// app.use("/api/payment", paymentRoutes);

// // Database + Server
// const PORT = process.env.PORT || 7002;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on port ${PORT}`)
//     );
//   })
//   .catch((err) => console.log("❌ MongoDB Error:", err.message));




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors());

// Parse JSON
app.use(express.json());

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const vendorRoutes = require("./routes/vendorRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const customerRoutes = require("./routes/customerRoutes");

// Use routes
app.use("/api/vendor", vendorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);       // login & register
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/customer", customerRoutes);

// Connect to MongoDB & start server
const PORT = process.env.PORT || 7002;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log("❌ MongoDB Error:", err.message));
