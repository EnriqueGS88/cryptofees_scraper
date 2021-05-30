"use strict";

// API boilerplate
const express = require("express");
const app = express();
const routes = require("./routes");

// Config
// const config = require("config");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Set up middleware for request parsing, logging, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load up the routes
app.use("/", routes);

// Start the API
var port = process.env.PORT || 3000;
var server = app.listen(port);
server.timeout = 90000;
console.log("info", `api running on port 3000`);

// Export API server for testing
module.exports = app;
