const express = require("express");
const router = express.Router();
const { addCustomer } = require("../controllers/customerController");

router.post("/add-customer", addCustomer);

module.exports = router;
