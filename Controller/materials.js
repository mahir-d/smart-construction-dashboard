var express = require("express");
var router = express.Router();
const dbMaterialFunctions = require("../Model/materials");
const uuidv4 = require("uuid");
const { json } = require("express");

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
