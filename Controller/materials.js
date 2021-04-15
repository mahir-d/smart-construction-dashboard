var express = require("express");
var router = express.Router();
const dbSiteFunctions = require("../Model/materials");
const uuidv4 = require("uuid");

router.post("/materials/:siteId", async (req, res) => {
    try {
        const siteId = req.params.siteid;
        if (siteId === undefined || !uuidv4.validate(siteId)) {
            throw Error("Please provide a valid siteId to delete");
        }
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

module.exports = router;
