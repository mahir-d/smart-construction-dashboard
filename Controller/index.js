/**
 * This file contains all routes
 */

var express = require("express");
var router = express.Router();
var site = require("./site");
var database = require("./database");
var materials = require("./materials");

router.use("/site", site);
router.use("/database", database);
router.use("/materials", materials);

module.exports = router;
