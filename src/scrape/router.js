"use strict";

// Router
const router = require("express").Router();
const scr = require("./index");

// Tasks
router.get("/nft", scr.nft);

// Export the router
module.exports = router;
