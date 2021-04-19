/**
 * This file contains Routes to create, read, delete sites from the database
 */
var express = require("express");
var router = express.Router();
const dbSiteFunctions = require("../Model/site");
const uuidv4 = require("uuid");

router.get("/", async (req, res) => {
    try {
        const response = await dbSiteFunctions.getAllSites();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

router.get("/createsite", async (req, res) => {
    try {
        const response = await dbSiteFunctions.createSite();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

router.delete("/deletesite", async (req, res) => {
    try {
        const { siteId } = req.body;
        if (!siteId || !uuidv4.validate(siteId)) {
            throw Error("Please provide a valid siteId to delete");
        }
        const response = await dbSiteFunctions.deleteSite(siteId);
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

module.exports = router;
