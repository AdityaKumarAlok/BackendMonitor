const express = require("express");
const req = require("express/lib/request");
const SignUpData = require("../models/Signup");
const bcrypt = require("bcryptjs");

// This is importmant for Router Important
const router = express.Router();

router.get("/add-data", (req, res) => {
  res.send("Hello");
});

module.exports = router;
