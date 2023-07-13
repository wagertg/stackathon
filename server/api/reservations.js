const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

// Creates a new order for the user identified by the token provided in the request headers. It sends the newly created order as a response.

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

// Retrieves the current shopping cart for the user identified by the token provided in the request headers. It sends the cart as a response.

app.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

// Adds an item (as provided in the request body) to the cart of the user identified by the token provided in the request headers. It sends the updated cart as a response.

app.post("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

// Removes an item (as provided in the request body) from the cart of the user identified by the token provided in the request headers. It sends the updated cart as a response.

app.put("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

// Performs a checkout operation for the user identified by the token provided in the request headers, creating a new reservation. It sends the created reservation as a response.

app.post("/checkout", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const reservation = await user.checkout();
    res.send(reservation);
  } catch (ex) {
    next(ex);
  }
});

// Retrieves past orders for the user identified by the token provided in the request headers. It sends the past orders as a response.

app.get("/past", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const pastOrders = await user.getPastOrders();
    res.send(pastOrders);
  } catch (ex) {
    next(ex);
  }
});
