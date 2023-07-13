const express = require("express");
const app = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

// Authenticate the user using the data sent in the request body

app.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

// Create a new user and send back a token

app.post("/register", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  } catch (ex) {
    next(ex);
  }
});

// If user is logged in, send back user data

app.get("/", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

// If user is logged in, update the user data and send back updated data

app.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    await user.update(req.body);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
