const express = require("express");
const req = require("express/lib/request");
const SignUpData = require("../models/Signup");

// This is importmant for Router Important
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Hello");
});

router.post("/signup", async (req, res) => {
  var Data = new SignUpData({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
  });

  console.log(Data);
  // try {
  //   let data = await Data.save();
  //   res.send(data);
  // } catch (err) {
  //   console.log("This is the error" + err);
  // }
});
module.exports = router;
