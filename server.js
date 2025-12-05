const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const path = require("path");

dotenv.config();



const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


require("dotenv").config();
const app = express();
app.use(cors({ origin: "http://localhost:3000", })); // Allow React frontend
app.use(express.json());

// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/orders", orderRoutes);
// ✅ Add this
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");



//const userRoutes = require("./routes/userRoutes");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);

                  // ✅ Use orders routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/payment", paymentRoutes);

//app.use("/api/users", userRoutes);



// Server & MongoDB
const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.log("❌ MongoDB Connection Error", err.message);
});


















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// // Import routes
// const orderRoutes = require("./routes/orderRoutes");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/auth");
// const categoryRoutes = require("./routes/categoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");

// // ⭐ Razorpay Payment Routes (add this)
// const paymentRoutes = require("./routes/paymentRoutes");

// const app = express();

// app.use(cors({ origin: "http://localhost:3000" })); // Allow React frontend
// app.use(express.json());

// // Use routes
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/subcategories", subCategoryRoutes);

// // ⭐ Add Razorpay payment API
// app.use("/api/payment", paymentRoutes);

// // Server & MongoDB
// const PORT = process.env.PORT || 7000;

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on port ${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB Connection Error", err.message);
//   });
