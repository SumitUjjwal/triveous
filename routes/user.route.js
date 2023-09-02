const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { userModel } = require("../models/user.model");

let userRouter = express.Router();

// register a new user
userRouter.post("/register", async (req, res) => {
  let { name, email, password } = req.body;

  let userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(409);
    res.send({ msg: "user already registered!" });
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(500);
        res.send({ msg: "Getting trouble in registering user" });
      } else {
        let user = userModel({ name, email, password: hash });
        await user.save();
        res.status(201);
        res.send({ msg: "registered successfully" });
      }
    });
  }
});

// login an user
userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let userExists = await userModel.findOne({ email });

  if (userExists) {
    bcrypt.compare(password, userExists.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ userID: userExists._id }, process.env.secret_key);
        res.status(200);
        res.send({ msg: `loggedin successfully`, token: token });
      } else {
        res.status(401);
        res.send({ msg: "invalid credentials" });
      }
    });
  } else {
    res.status(401);
    res.send({ msg: "invalid credentials" });
  }
});

module.exports = { userRouter };
