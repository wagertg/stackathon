const express = require("express");
const app = express();
const path = require("path");
app.use(express.json({ limit: "50mb" }));

// Sets up an Express application server with various middleware and routes

// This middleware serves static files.

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

// This route serves the index.html located in the `static` directory when the root of the application is accessed.

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

// This sets up the routes for authentication, flights, and reservations.

app.use("/api/auth", require("./api/auth"));
app.use("/api/flights", require("./api/flights"));
app.use("/api/reservations", require("./api/reservations"));

module.exports = app;
