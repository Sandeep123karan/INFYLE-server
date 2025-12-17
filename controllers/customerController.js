const Customer = require("../models/customerModel");
const bcrypt = require("bcryptjs");

const addCustomer = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Email check
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Password hash
    const hashedPass = await bcrypt.hash(password, 10);

    // Save new customer
    const newCustomer = new Customer({
      name,
      email,
      phone,
      password: hashedPass
    });

    await newCustomer.save();

    res.status(201).json({
      success: true,
      message: "Customer registered successfully!"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addCustomer };
