const express = require("express");
const req = require("express/lib/request");
const SignUpData = require("../models/Signup");
const bcrypt = require("bcryptjs");

// This is importmant for Router Important
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Hello");
});

router.post("/signup", async (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(req.body.Password, salt);
  var confirmPassword = bcrypt.hashSync(req.body.ConfirmPassword, salt);

  if (req.body.Password != req.body.ConfirmPassword) {
    res.send("Your Password Does Not Match");
  }

  var Data = new SignUpData({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    PhoneNumber: req.body.PhoneNumber,
    Password: hashPassword,
    ConfirmPassword: confirmPassword,
  });
  try {
    let data = await Data.save();
    res.send(data);
  } catch (err) {
    console.log("This is the error" + err);
  }
});

router.post("/login", async (req, res) => {
  try {
    var Email = req.body.Email;
    var Password = req.body.Password;
    const UserData = await SignUpData.findOne({ Email: Email });
    const match = bcrypt.compareSync(Password, UserData.Password);

    if (match == true) {
      res.send("You Are Login");
    } else {
      res.send("Invailid Username Or Password");
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
