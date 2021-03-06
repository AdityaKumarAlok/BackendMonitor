const express = require("express");
const req = require("express/lib/request");
const SignUpData = require("../models/Signup");
const CarInfo = require("../models/CarInfo");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const Tesseract = require("tesseract.js");
var bodyParser = require("body-parser");
// This is importmant for Router Important
const router = express.Router();
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/login", urlencodedParser, async (req, res) => {
  console.log(req.body);
  try {
    var Email = req.body.Email;
    var Password = req.body.Password;
    const UserData = await SignUpData.findOne({ Email: Email });
    const match = bcrypt.compareSync(Password, UserData.Password);
    if (match == true) {
      res.render("dashboard");
    } else {
      res.send("Invailid Username Or Password");
    }
  } catch (error) {
    res.send(error);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/detect", upload.single("uploadImage"), async (req, res) => {
  try {
    Tesseract.recognize("uploads/" + req.file.filename, "eng", {
      logger: (m) => console.log(m),
    }).then(async ({ data: { text } }) => {
      var txt = text;
      var string = txt
        .replace(/[&\/\\#,+()$~%.'"[':*?<>@^{} ]/g, "")
        .toString();
      var string2 = string.replace(/[\r\n]+/gm, "");
      const UserData = await CarInfo.findOne({ Car: string2 });
      if (UserData == null) {
        return res.render("dashboard", {
          result: "Failed",
        });
      } else if (string2 === UserData.Car) {
        return res.render("dashboard", {
          result: "Authenticated",
        });
      } else {
        return res.render("dashboard", {
          result: "Failed",
        });
      }
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.post("/carinfo", async (req, res) => {
  var Data = new CarInfo({
    Name: req.body.Name,
    Flat: req.body.Flat,
    Apartment: req.body.Apartment,
    Car: req.body.Car,
  });
  try {
    let data = await Data.save();
    res.send(data);
  } catch (err) {
    console.log("This is the error" + err);
  }
});

router.post("/signup", urlencodedParser, async (req, res) => {
  console.log(req.body.FirstName);
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

module.exports = router;
