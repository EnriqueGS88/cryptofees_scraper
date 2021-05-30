"use strict";

// Router
const router = require("express").Router();
const admin = require("./index");

// Tasks
router.get("/", admin.findAll);

// Export the router
module.exports = router;
