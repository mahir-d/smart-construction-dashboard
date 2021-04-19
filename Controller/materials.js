var express = require("express");
var router = express.Router();
const dbMaterialFunctions = require("../Model/materials");
const uuidv4 = require("uuid");
const { json } = require("express");

/**
 * @swagger
 * /materials/:siteid:
 *  get:
 *     summary: Returns a list of all materials for the given siteId
 *     tags:
 *      - materials API
 *     parameters:
 *      - in: query
 *        name: siteId
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      '200':
 *          description: A successful response with list of material objects
 */
router.get("/:siteid", async (req, res) => {
    try {
        const siteId = req.params.siteid;
        if (!siteId || !uuidv4.validate(siteId)) {
            throw Error("Please provide a valid siteId");
        }
        const response = await dbMaterialFunctions.getMaterials(siteId);
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

/**
 * @swagger
 * /materials/cost/:siteid:
 *  get:
 *     summary: Returns the total cost of all materials for the given siteId
 *     tags:
 *      - materials API
 *     parameters:
 *      - in: query
 *        name: siteId
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      '200':
 *          description: A successful response with list of material objects
 */
router.get("/cost/:siteid", async (req, res) => {
    try {
        const siteId = req.params.siteid;
        if (!siteId || !uuidv4.validate(siteId)) {
            throw Error("Please provide a valid siteId");
        }
        const response = await dbMaterialFunctions.getCost(siteId);
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

/**
 * @swagger
 * /materials/:
 *  post:
 *     summary: creates a new material for the given siteId
 *     tags:
 *      - materials API
 *     parameters:
 *      - in: body
 *        name: siteId
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 *      - in: body
 *        name: volume
 *        required: true
 *        schema:
 *          type: number
 *      - in: body
 *        name: cost
 *        required: true
 *        schema:
 *          type: number
 *      - in: body
 *        name: color
 *        required: true
 *        schema:
 *          type: number
 *      - in: body
 *        name: deliveryDate
 *        required: false
 *        schema:
 *          type: string
 *     responses:
 *         '200':
 *             description: returns unique uuid for the newly created material
 */
router.post("/", async (req, res) => {
    try {
        const { siteId, name, volume, cost, color, deliveryDate } = req.body;
        if (!siteId || !uuidv4.validate(siteId)) {
            throw Error("Please provide a valid siteId");
        }
        if (!volume || isNaN(volume) || volume < 0) {
            throw Error("Please provide a volume for the material");
        }
        if (!cost || isNaN(cost) || cost < 0) {
            throw Error("Please provide a cost for the material");
        }
        if (!color) {
            throw Error("Please provide a color for the material");
        }

        const materialObj = {
            siteId: siteId,
            name: name ? name : null,
            volume: volume,
            cost: cost,
            color: color,
            deliveryDate: deliveryDate ? deliveryDate : null,
        };

        const response = await dbMaterialFunctions.createMaterial(
            materialObj.siteId,
            materialObj.name,
            materialObj.volume,
            materialObj.cost,
            materialObj.color,
            materialObj.deliveryDate
        );

        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

/**
 * @swagger
 * /materials/:
 *  put:
 *     summary: updates the given material for the given siteId
 *     tags:
 *      - materials API
 *     parameters:
 *      - in: body
 *        name: siteId
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: materialId
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 *      - in: body
 *        name: volume
 *        required: true
 *        schema:
 *          type: number
 *      - in: body
 *        name: cost
 *        required: true
 *        schema:
 *          type: number
 *      - in: body
 *        name: color
 *        required: true
 *        schema:
 *          type: number
 *      - in: body
 *        name: deliveryDate
 *        required: false
 *        schema:
 *          type: string
 *     responses:
 *         '200':
 *             description: Successfully updated the site with the given id
 */
router.put("/", async (req, res) => {
    try {
        const {
            siteId,
            materialId,
            name,
            volume,
            cost,
            color,
            deliveryDate,
        } = req.body;
        if (!siteId || !uuidv4.validate(siteId)) {
            throw Error("Please provide a valid siteId to update");
        }
        if (!materialId || !uuidv4.validate(materialId)) {
            throw Error("Please provide a valid materialId to update");
        }
        if (!volume || isNaN(volume) || volume < 0) {
            throw Error("Please provide a valid volume for the material");
        }

        if (!cost || isNaN(cost) || cost < 0) {
            throw Error("Please provide a valid cost for the material");
        }
        if (!color) {
            throw Error("Please provide a color for the material");
        }

        const materialObj = {
            siteId: siteId,
            materialId: materialId,
            name: name ? name : null,
            volume: parseFloat(volume),
            cost: parseFloat(String(cost).replace(/\,/g, "")),
            color: color,
            deliveryDate: deliveryDate ? deliveryDate : null,
        };

        const response = await dbMaterialFunctions.updateMaterial(
            materialObj.siteId,
            materialObj.materialId,
            materialObj.name,
            materialObj.volume,
            materialObj.cost,
            materialObj.color,
            materialObj.deliveryDate
        );

        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

/**
 * @swagger
 * /materials/:
 *  put:
 *     summary: creates a new material for the given siteId
 *     tags:
 *      - materials API
 *     parameters:
 *      - in: body
 *        name: siteId
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: materialId
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *         '200':
 *             description: Successfully deleted the given material for the given site
 */
router.delete("/", async (req, res) => {
    try {
        const { siteId, materialId } = req.body;
        if (!siteId || !uuidv4.validate(siteId)) {
            throw Error("Please provide a valid siteId to delete");
        }
        if (!materialId || !uuidv4.validate(materialId)) {
            throw Error("Please provide a valid materialId to delete");
        }

        const response = await dbMaterialFunctions.deleteMaterial(
            siteId,
            materialId
        );
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
});

module.exports = router;
