const express = require("express");
const { Flight, conn } = require("../db");
const app = express.Router();

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Flight.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).send(flight);
  } catch (ex) {
    next(ex);
  }
});
