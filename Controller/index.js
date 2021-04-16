var express = require("express");
var router = express.Router();
var site = require("./site");
var database = require("./database");
var materials = require("./materials");
// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log("Time: ", Date.now());
//     next();
// });

router.use("/site", site);
router.use("/database", database);
router.use("/materials", materials);

module.exports = router;
