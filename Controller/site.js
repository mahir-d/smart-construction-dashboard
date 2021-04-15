var express = require("express");
var router = express.Router();
const dbSiteFunctions = require("../Model/site");
const uuidv4 = require("uuid");

// define the home page route
router.get("/createsite", async (req, res) => {
    try {
        const status = await dbSiteFunctions.createSite();
        res.status(200).json({ success: status });
    } catch (error) {
        res.status(400).json({ Error: e.message });
    }
});

router.delete("/deletesite/:siteid", async (req, res) => {
    try {
        const siteId = req.params.siteid;
        if (siteId === undefined || !uuidv4.validate(siteId)) {
            throw Error("Please provide a valid siteId to delete");
        }
        const status = await dbSiteFunctions.deleteSite(siteId);
        res.status(200).json({ Success: status });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

module.exports = router;
