/**
 * This file contains Routes to create, read, delete sites from the database
 */
var express = require("express");
var router = express.Router();
const dbSiteFunctions = require("../Model/site");
const uuidv4 = require("uuid");

/**
 * @swagger
 * /site:
 *  get:
 *     summary: Returns a list of all available sites
 *     tags:
 *      - site API
 *     responses:
 *      '200':
 *          description: A successful response with list of sites
 */
router.get("/", async (req, res) => {
    try {
        const response = await dbSiteFunctions.getAllSites();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

/**
 * @swagger
 * /site/createsite:
 *  get:
 *     summary: Creates a new site with a unique uuid
 *     tags:
 *      - site API
 *     responses:
 *      '200':
 *          description: Returns the newly created uuid for the site
 */
router.get("/createsite", async (req, res) => {
    try {
        const response = await dbSiteFunctions.createSite();
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

/**
 * @swagger
 * /site/deletesite:
 *  delete:
 *     summary: deletes the site with the given uuid
 *     tags:
 *      - site API
 *     parameters:
 *      - in: body
 *        name: siteId
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *         '200':
 *             description: Successfully deleted the site eith the given id
 */
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
