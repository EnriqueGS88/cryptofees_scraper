"use strict";

const router = require("express").Router();
const adminRouter = require("./src/admin/router");
const scrapeRouter = require("./src/scrape/router");

// Wire up routers
router.use("/test", adminRouter);
router.use("/scrape", scrapeRouter);

module.exports = router;
