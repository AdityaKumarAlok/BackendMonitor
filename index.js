require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); //This is important for Require Path.
const SignUp = require("./Routes/SignUp"); // Requiring SignUp.js

// DATABASE CONNECTION CODE -------STARTED
const url = process.env.MONGODB;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// DATABASE CONNECTION CODE -------ENDED

app.use(express.json());
app.use("/", SignUp);

app.listen(process.env.PORT);
