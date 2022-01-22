const express = require("express");
const req = require("express/lib/request");

// This is importmant for Router Important
const router = express.Router();

router.get("/admin", (req, res) => {
  res.render("Home");
});

module.exports = router;
